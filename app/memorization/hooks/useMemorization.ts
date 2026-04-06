'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  MemorizationSettings,
  PlaybackMode,
  PlaybackProgress,
  DEFAULT_SETTINGS,
  loadSettings,
  saveSettings,
  loadProgress,
  saveProgress,
  generateVerseList,
} from '../lib/storage';
import { audioCache, getAudioUrl } from '../lib/audioCache';
import { getPageNumber, getVerseLocationsInRange } from '../lib/verseMap';

interface VerseItem {
  surah: number;
  verse: number;
  page: number;
}

export function useMemorization() {
  const [settings, setSettingsState] = useState<MemorizationSettings>(DEFAULT_SETTINGS);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [currentVerseRepeat, setCurrentVerseRepeat] = useState(1);
  const [currentGroupRepeat, setCurrentGroupRepeat] = useState(1);
  const [currentReaderIndex, setCurrentReaderIndex] = useState(0);
  
  const [verseList, setVerseList] = useState<VerseItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedSurahs, setLoadedSurahs] = useState<number[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setSettings = useCallback((newSettings: Partial<MemorizationSettings> | MemorizationSettings) => {
    const updated = newSettings as MemorizationSettings;
    setSettingsState(updated);
    saveSettings(updated);
    const verses = generateVerseList(updated);
    setVerseList(verses.map(v => ({ ...v, page: getPageNumber(v.surah, v.verse) })));
  }, []);

  useEffect(() => {
    const loaded = loadSettings();
    setSettingsState(loaded);
    const verses = generateVerseList(loaded);
    setVerseList(verses.map(v => ({ ...v, page: getPageNumber(v.surah, v.verse) })));

    const progress = loadProgress();
    if (progress) {
      const startIdx = verseList.findIndex(
        v => v.surah === progress.currentSurah && v.verse === progress.currentVerse
      );
      if (startIdx !== -1) {
        setCurrentVerseIndex(startIdx);
        setCurrentVerseRepeat(progress.currentVerseRepeat);
        setCurrentGroupRepeat(progress.currentGroupRepeat);
      }
    }
  }, []);

  useEffect(() => {
    if (settings.selectedReaders.length === 0) {
      setSettings({ selectedReaders: [DEFAULT_SETTINGS.selectedReaders[0]] });
    }
  }, [settings.selectedReaders, setSettings]);

  const playCurrentVerse = useCallback(async () => {
    if (!verseList.length) return;
    
    const verse = verseList[currentVerseIndex];
    const reciterId = settings.selectedReaders[currentReaderIndex];
    
    const audio = await audioCache.get(reciterId, verse.surah, verse.verse);
    if (!audio) {
      console.error('Failed to load audio');
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    audioRef.current = audio;

    audio.addEventListener('ended', () => {
      handleVerseEnded();
    });

    audio.addEventListener('error', () => {
      console.error('Audio playback error');
      handleVerseEnded();
    });

    setCurrentPage(verse.page);
    audio.play().catch(console.error);
  }, [verseList, currentVerseIndex, settings.selectedReaders, currentReaderIndex]);

  const handleVerseEnded = useCallback(() => {
    if (!verseList.length) return;

    const maxVerseRepeat = settings.verseRepeatCount;
    const maxGroupRepeat = settings.groupRepeatCount;
    const totalVerses = verseList.length;
    const hasNextVerse = currentVerseIndex < totalVerses - 1;

    if (settings.loopVerseForever && currentVerseRepeat < 999) {
      setCurrentVerseRepeat(prev => prev + 1);
      setTimeout(playCurrentVerse, settings.pauseDuration * 1000);
      return;
    }

    if (currentVerseRepeat < maxVerseRepeat) {
      setCurrentVerseRepeat(prev => prev + 1);
      setTimeout(playCurrentVerse, settings.pauseDuration * 1000);
      return;
    }

    if (hasNextVerse) {
      setCurrentVerseIndex(prev => prev + 1);
      setCurrentVerseRepeat(1);
      setTimeout(playCurrentVerse, settings.pauseDuration * 1000);
      return;
    }

    if (settings.loopGroupForever && currentGroupRepeat < 999) {
      setCurrentGroupRepeat(prev => prev + 1);
      setCurrentVerseIndex(0);
      setCurrentVerseRepeat(1);
      setTimeout(playCurrentVerse, settings.pauseDuration * 1000);
      return;
    }

    if (currentGroupRepeat < maxGroupRepeat) {
      setCurrentGroupRepeat(prev => prev + 1);
      setCurrentVerseIndex(0);
      setCurrentVerseRepeat(1);
      setTimeout(playCurrentVerse, settings.pauseDuration * 1000);
      return;
    }

    setIsPlaying(false);
    setIsPaused(false);
    saveProgress({
      currentSurah: verseList[0].surah,
      currentVerse: verseList[0].verse,
      currentVerseRepeat: 1,
      currentGroupRepeat: 1,
      timestamp: Date.now(),
    });
  }, [verseList, currentVerseIndex, currentVerseRepeat, currentGroupRepeat, settings, playCurrentVerse]);

  const selectNextReader = useCallback(() => {
    const readers = settings.selectedReaders;
    if (readers.length <= 1) return;

    switch (settings.playbackMode) {
      case 'alternating-reader':
        setCurrentReaderIndex((prev) => (prev + 1) % readers.length);
        break;
      case 'alternating-group':
        break;
      case 'random':
        const randomIdx = Math.floor(Math.random() * readers.length);
        setCurrentReaderIndex(randomIdx);
        break;
      case 'normal':
      default:
        setCurrentReaderIndex(0);
        break;
    }
  }, [settings.selectedReaders, settings.playbackMode]);

  const play = useCallback(() => {
    if (isPaused && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsPaused(false);
      });
      return;
    }

    setIsPlaying(true);
    setIsPaused(false);
    playCurrentVerse();
  }, [isPaused, playCurrentVerse]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setIsPaused(true);
    
    if (verseList[currentVerseIndex]) {
      const verse = verseList[currentVerseIndex];
      saveProgress({
        currentSurah: verse.surah,
        currentVerse: verse.verse,
        currentVerseRepeat: currentVerseRepeat,
        currentGroupRepeat: currentGroupRepeat,
        timestamp: Date.now(),
      });
    }
  }, [verseList, currentVerseIndex, currentVerseRepeat, currentGroupRepeat]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentVerseIndex(0);
    setCurrentVerseRepeat(1);
    setCurrentGroupRepeat(1);
    setCurrentReaderIndex(0);
    
    if (verseList.length > 0) {
      const firstVerse = verseList[0];
      setCurrentPage(firstVerse.page);
    }
  }, [verseList]);

  const skipToNext = useCallback(() => {
    if (currentVerseIndex < verseList.length - 1) {
      setCurrentVerseIndex(prev => prev + 1);
      setCurrentVerseRepeat(1);
      if (isPlaying) {
        playCurrentVerse();
      }
    }
  }, [currentVerseIndex, verseList.length, isPlaying, playCurrentVerse]);

  const skipToPrevious = useCallback(() => {
    if (currentVerseIndex > 0) {
      setCurrentVerseIndex(prev => prev - 1);
      setCurrentVerseRepeat(1);
      if (isPlaying) {
        playCurrentVerse();
      }
    }
  }, [currentVerseIndex, isPlaying, playCurrentVerse]);

  const jumpToVerse = useCallback((index: number) => {
    if (index >= 0 && index < verseList.length) {
      setCurrentVerseIndex(index);
      setCurrentVerseRepeat(1);
      if (isPlaying) {
        playCurrentVerse();
      }
    }
  }, [verseList.length, isPlaying, playCurrentVerse]);

  useEffect(() => {
    if (verseList.length > 0 && currentVerseIndex < verseList.length) {
      setCurrentPage(verseList[currentVerseIndex].page);
    }
  }, [currentVerseIndex, verseList]);

  useEffect(() => {
    if (settings.selectedReaders.length > 0) {
      audioCache.prefetch(
        settings.selectedReaders[0],
        verseList.slice(currentVerseIndex, currentVerseIndex + 5)
      );
    }
  }, [settings.selectedReaders, verseList, currentVerseIndex]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  const currentVerse = verseList[currentVerseIndex] || null;
  const totalVerses = verseList.length;
  const currentReciter = settings.selectedReaders[currentReaderIndex] || settings.selectedReaders[0];
  
  const progress = totalVerses > 0 
    ? ((currentGroupRepeat - 1) * totalVerses + currentVerseIndex + 1) / (totalVerses * settings.groupRepeatCount)
    : 0;

  return {
    settings,
    setSettings,
    isPlaying,
    isPaused,
    currentVerseIndex,
    currentVerseRepeat,
    currentGroupRepeat,
    currentReaderIndex,
    currentVerse,
    currentPage,
    totalVerses,
    currentReciter,
    progress,
    play,
    pause,
    stop,
    skipToNext,
    skipToPrevious,
    jumpToVerse,
  };
}