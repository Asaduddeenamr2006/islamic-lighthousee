'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import QuranContent from './components/QuranContent';
import AudioPlayer from './components/AudioPlayer';
import TafsirPanel from './components/TafsirPanel';
import SettingsPanel, { FontFamily, ColorScheme } from './components/SettingsPanel';
import { Surah, Ayah, RECITERS, API_BASE, AUDIO_BASE } from './lib/types';

function getAyahUrl(reciterId: string, surahNum: number, ayahNum: number): string {
  const padNum = (n: number, len = 3) => String(n).padStart(len, '0');
  return `${AUDIO_BASE}/${reciterId}/${padNum(surahNum)}${padNum(ayahNum)}.mp3`;
}

function getMushafPages(versesCount: number): number[] {
  if (versesCount <= 7) return [1];
  if (versesCount <= 10) return [1, 2];
  if (versesCount <= 20) return [1, 2, 3];
  if (versesCount <= 30) return [1, 2, 3, 4];
  const basePages = Math.floor(versesCount / 7);
  const remainder = versesCount % 7;
  const pages = Array(basePages).fill(0).map((_, i) => i + 1);
  if (remainder > 0) pages.push(basePages + 1);
  return pages;
}

type PlayMode = 'none' | 'one' | 'all';

interface Settings {
  fontFamily: FontFamily;
  fontSize: number;
  colorScheme: ColorScheme;
}

export default function Home() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [allAyahs, setAllAyahs] = useState<Ayah[]>([]);
  const [pages, setPages] = useState<{ text: string; startAyah: number; endAyah: number; pageNumber: number }[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedReciter, setSelectedReciter] = useState(RECITERS[0].id);
  const [playMode, setPlayMode] = useState<PlayMode>('none');
  const [showTafsir, setShowTafsir] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    fontFamily: 'quran',
    fontSize: 2.2,
    colorScheme: 'green',
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAyahIndex, setCurrentAyahIndex] = useState(-1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const targetPageIndexRef = useRef<number | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/chapters`)
      .then(res => res.json())
      .then(data => {
        setSurahs(data.chapters);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load surahs:', err);
        setLoading(false);
      });
  }, []);

  const playAyah = useCallback((ayahIndex: number) => {
    if (!selectedSurah || !allAyahs.length) return;
    const ayah = allAyahs[ayahIndex];
    if (!ayah) return;

    setCurrentAyahIndex(ayahIndex);
    setIsPlaying(true);
    setCurrentTime(0);
    setDuration(0);

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(getAyahUrl(selectedReciter, selectedSurah.id, ayah.verse_number));
    audioRef.current = audio;

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    });

    audio.addEventListener('ended', () => {
      if (playMode === 'one') {
        playAyah(ayahIndex);
      } else if (playMode === 'all') {
        if (ayahIndex < allAyahs.length - 1) {
          playAyah(ayahIndex + 1);
        } else {
          playAyah(0);
        }
      } else if (ayahIndex < allAyahs.length - 1) {
        playAyah(ayahIndex + 1);
      } else {
        setIsPlaying(false);
        setCurrentAyahIndex(-1);
        setCurrentTime(0);
      }
    });

    audio.addEventListener('error', () => {
      if (playMode === 'one') {
        playAyah(ayahIndex);
      } else if (playMode === 'all') {
        if (ayahIndex < allAyahs.length - 1) {
          playAyah(ayahIndex + 1);
        } else {
          playAyah(0);
        }
      } else if (ayahIndex < allAyahs.length - 1) {
        playAyah(ayahIndex + 1);
      } else {
        setIsPlaying(false);
      }
    });

    audio.play().catch(() => {
      setIsPlaying(false);
    });
  }, [selectedSurah, allAyahs, selectedReciter, playMode]);

  const togglePlayPause = useCallback(() => {
    if (!selectedSurah || !allAyahs.length) return;
    
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (currentAyahIndex >= 0) {
        playAyah(currentAyahIndex);
      } else {
        playAyah(0);
      }
    }
  }, [selectedSurah, allAyahs, isPlaying, currentAyahIndex, playAyah]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
    setCurrentAyahIndex(-1);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  const nextAyah = useCallback(() => {
    if (currentAyahIndex < allAyahs.length - 1) {
      playAyah(currentAyahIndex + 1);
    }
  }, [currentAyahIndex, allAyahs.length, playAyah]);

  const prevAyah = useCallback(() => {
    if (currentAyahIndex > 0) {
      playAyah(currentAyahIndex - 1);
    }
  }, [currentAyahIndex, playAyah]);

  const loadSurah = useCallback(async (surah: Surah) => {
    stopAudio();
    setLoading(true);
    setSelectedSurah(surah);
    setCurrentPageIndex(0);
    setSidebarOpen(false);
    
    try {
      const res = await fetch(`https://api.quran.com/api/v4/verses/by_chapter/${surah.id}?language=ar&fields=text_uthmani&per_page=300`);
      const data = await res.json();
      let ayahs: Ayah[] = data.verses.map((v: any, i: number) => ({
        id: v.id || 0,
        verse_number: v.verse_key ? parseInt(v.verse_key.split(':')[1]) : i + 1,
        verse_key: v.verse_key,
        text_uthmani: v.text_uthmani || '',
        page_number: Math.ceil((i + 1) / (surah.verses_count > 20 ? 10 : 5)),
        juz_number: Math.floor(i / (surah.verses_count / 30)) + 1,
        hizb_number: Math.floor(i / (surah.verses_count / 60)) + 1,
        rub_number: 1,
      }));

      const bismillah = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ';
      if (surah.id !== 1 && surah.id !== 9 && ayahs.length > 0 && ayahs[0].text_uthmani.startsWith(bismillah)) {
        ayahs = [...ayahs];
        ayahs[0] = { ...ayahs[0], text_uthmani: ayahs[0].text_uthmani.replace(bismillah, '').trim() };
      }
      
      setAllAyahs(ayahs);

      const pageNumbers = getMushafPages(surah.verses_count);
      const versesPerPage = Math.ceil(surah.verses_count / pageNumbers.length);
      
      const newPages: { text: string; startAyah: number; endAyah: number; pageNumber: number }[] = [];
      const showBismillah = surah.id !== 1 && surah.id !== 9;
      
      pageNumbers.forEach((pageNum, pageIdx) => {
        const startVerse = pageIdx * versesPerPage + 1;
        const endVerse = Math.min((pageIdx + 1) * versesPerPage, surah.verses_count);
        const chunk = ayahs.slice(startVerse - 1, endVerse);
        
        let bismillahHtml = '';
        if (showBismillah && pageIdx === 0) {
          bismillahHtml = `<div class="text-center my-5 text-3xl text-white" style="font-family: var(--font-cairo)">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</div>`;
        }
        
        const text = bismillahHtml + chunk.map((a, i) => 
          `${a.text_uthmani} <span class="ayah-circle" data-ayah="${startVerse + i}" onclick="window.__playAyah(${startVerse + i})">${a.verse_number}</span>`
        ).join(' ');
        
        newPages.push({
          text,
          startAyah: startVerse,
          endAyah: endVerse,
          pageNumber: surah.id === 1 ? 1 : (surah.id === 2 ? 2 + pageIdx : surah.id === 3 ? 50 + pageIdx : pageNum),
        });
      });
      
      setPages(newPages);
      
      if (targetPageIndexRef.current !== null) {
        if (targetPageIndexRef.current === -1) {
          setCurrentPageIndex(newPages.length - 1);
        } else {
          setCurrentPageIndex(targetPageIndexRef.current);
        }
        targetPageIndexRef.current = null;
      }
    } catch (err) {
      console.error('Failed to load surah:', err);
    } finally {
      setLoading(false);
    }
  }, [stopAudio]);

  const handleReciterChange = useCallback((reciterId: string) => {
    setSelectedReciter(reciterId);
    if (currentAyahIndex >= 0 && allAyahs.length > 0) {
      const ayah = allAyahs[currentAyahIndex];
      if (!ayah) return;

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);

      const audio = new Audio(getAyahUrl(reciterId, selectedSurah!.id, ayah.verse_number));
      audioRef.current = audio;

      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration || 0);
      });

      audio.addEventListener('ended', () => {
        if (playMode === 'one') {
          playAyah(currentAyahIndex);
        } else if (playMode === 'all') {
          if (currentAyahIndex < allAyahs.length - 1) {
            playAyah(currentAyahIndex + 1);
          } else {
            playAyah(0);
          }
        } else if (currentAyahIndex < allAyahs.length - 1) {
          playAyah(currentAyahIndex + 1);
        } else {
          setIsPlaying(false);
          setCurrentAyahIndex(-1);
          setCurrentTime(0);
        }
      });

      audio.addEventListener('error', () => {
        if (playMode === 'one') {
          playAyah(currentAyahIndex);
        } else if (playMode === 'all') {
          if (currentAyahIndex < allAyahs.length - 1) {
            playAyah(currentAyahIndex + 1);
          } else {
            playAyah(0);
          }
        } else if (currentAyahIndex < allAyahs.length - 1) {
          playAyah(currentAyahIndex + 1);
        } else {
          setIsPlaying(false);
        }
      });

      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentAyahIndex, allAyahs, selectedSurah, playMode, playAyah]);

  const handlePlayModeChange = useCallback((mode: PlayMode) => {
    setPlayMode(mode);
    if (currentAyahIndex >= 0) {
      playAyah(currentAyahIndex);
    }
  }, [currentAyahIndex, playAyah]);

  const prevPage = useCallback(() => {
    setCurrentPageIndex(p => Math.max(0, p - 1));
  }, []);

  const nextPage = useCallback(() => {
    setCurrentPageIndex(p => Math.min(pages.length - 1, p + 1));
  }, [pages.length]);

  useEffect(() => {
    (window as any).__playAyah = (ayahNum: number) => {
      const idx = allAyahs.findIndex(a => a.verse_number === ayahNum);
      if (idx !== -1) {
        playAyah(idx);
      }
    };
  }, [allAyahs, playAyah]);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, [stopAudio]);

  const getAccentColor = (scheme: ColorScheme) => {
    const colors: Record<ColorScheme, string> = {
      green: '#22c55e',
      blue: '#3b82f6',
      red: '#ef4444',
      brown: '#92400e',
      grey: '#9ca3af',
      purple: '#8b5cf6',
    };
    return colors[scheme];
  };

  const currentReciter = RECITERS.find(r => r.id === selectedReciter);
  const currentAyah = currentAyahIndex >= 0 ? allAyahs[currentAyahIndex] : null;
  const accentColor = getAccentColor(settings.colorScheme);

  const handleSwipeFirstPage = useCallback(() => {
    if (!selectedSurah || !surahs.length) return;
    const currentIdx = surahs.findIndex(s => s.id === selectedSurah.id);
    if (currentIdx <= 0) return;
    const prevSurah = surahs[currentIdx - 1];
    targetPageIndexRef.current = -1;
    loadSurah(prevSurah);
  }, [selectedSurah, surahs, loadSurah]);

  const handleSwipeLastPage = useCallback(() => {
    if (!selectedSurah || !surahs.length) return;
    const currentIdx = surahs.findIndex(s => s.id === selectedSurah.id);
    if (currentIdx >= surahs.length - 1) return;
    const nextSurah = surahs[currentIdx + 1];
    targetPageIndexRef.current = 0;
    loadSurah(nextSurah);
  }, [selectedSurah, surahs, loadSurah]);

  return (
    <div className="h-screen flex overflow-hidden" style={{ background: '#000000' }}>
      <style jsx global>{`
        :root {
          --accent: ${accentColor};
        }
      `}</style>

      {focusMode ? (
        <div className="flex-1 flex flex-col relative">
          <button
            onClick={() => setFocusMode(false)}
            className="absolute top-3 left-3 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-all"
            title="خروج من وضع التركيز"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <QuranContent
            surah={selectedSurah}
            pages={pages}
            currentPageIndex={currentPageIndex}
            totalPages={pages.length}
            loading={loading}
            onPrevPage={prevPage}
            onNextPage={nextPage}
            onSwipeFirstPage={handleSwipeFirstPage}
            onSwipeLastPage={handleSwipeLastPage}
            fontFamily={settings.fontFamily}
            fontSize={settings.fontSize}
            accentColor={accentColor}
            focusMode={true}
          />
        </div>
      ) : (
        <>
          <Sidebar 
            surahs={surahs}
            loading={loading}
            selectedSurah={selectedSurah}
            onSelectSurah={loadSurah}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            accentColor={accentColor}
          />

          <div className="flex-1 flex flex-col min-w-0">
            <Header
              title={selectedSurah?.name_arabic || 'القرآن الكريم'}
              onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
              onTafsirClick={() => setShowTafsir(true)}
              onSettingsClick={() => setShowSettings(true)}
              onFocusModeToggle={() => setFocusMode(!focusMode)}
              focusMode={focusMode}
              colorScheme={settings.colorScheme}
              fontSize={settings.fontSize}
              onFontSizeChange={(size) => setSettings({ ...settings, fontSize: size })}
              onColorChange={(color) => setSettings({ ...settings, colorScheme: color })}
            />

            <QuranContent
              surah={selectedSurah}
              pages={pages}
              currentPageIndex={currentPageIndex}
              totalPages={pages.length}
              loading={loading}
              onPrevPage={prevPage}
              onNextPage={nextPage}
              onSwipeFirstPage={handleSwipeFirstPage}
              onSwipeLastPage={handleSwipeLastPage}
              fontFamily={settings.fontFamily}
              fontSize={settings.fontSize}
              accentColor={accentColor}
              focusMode={false}
            />

            {selectedSurah && (
              <AudioPlayer
                surahName={selectedSurah.name_arabic}
                reciterName={currentReciter?.name || ''}
                reciters={RECITERS}
                selectedReciter={selectedReciter}
                onReciterChange={handleReciterChange}
                currentAyah={currentAyah?.verse_number || 0}
                totalAyahs={allAyahs.length}
                isPlaying={isPlaying}
                currentTime={currentTime}
                duration={duration}
                onPlayPause={togglePlayPause}
                onPrevAyah={prevAyah}
                onNextAyah={nextAyah}
                onSeek={(time) => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = time;
                  }
                }}
                playMode={playMode}
                onPlayModeChange={handlePlayModeChange}
                accentColor={accentColor}
              />
            )}
          </div>

          {showTafsir && selectedSurah && (
            <TafsirPanel
              surah={selectedSurah}
              onClose={() => setShowTafsir(false)}
            />
          )}

          {showSettings && (
            <SettingsPanel
              settings={settings}
              onSettingsChange={setSettings}
              onClose={() => setShowSettings(false)}
            />
          )}
        </>
      )}
    </div>
  );
}