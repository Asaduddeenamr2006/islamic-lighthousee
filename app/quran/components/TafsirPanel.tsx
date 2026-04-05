'use client';

import { useState, useEffect } from 'react';
import { Surah } from '../lib/types';

interface TafsirPanelProps {
  surah: Surah;
  onClose: () => void;
}

interface TafsirData {
  numberInSurah: number;
  text: string;
  ayahText: string;
}

const TAFSIR_SOURCES = [
  { id: 'ar.muyassar', name: 'التفسير الميسر' },
  { id: 'ar.jalalayn', name: 'تفسير الجلالين' },
  { id: 'ar.qurtubi', name: 'تفسير القرطبي' },
  { id: 'ar.baghawi', name: 'تفسير البغوي' },
  { id: 'ar.waseet', name: 'التفسير الوسيط' },
  { id: 'ar.miqbas', name: 'تنوير المقباس من تفسير ابن عباس' },
  { id: 'en.sahih', name: 'Sahih International' },
  { id: 'en.wahiduddin', name: 'Wahiduddin Khan' },
];

export default function TafsirPanel({ surah, onClose }: TafsirPanelProps) {
  const [selectedSource, setSelectedSource] = useState(TAFSIR_SOURCES[0].id);
  const [tafsirData, setTafsirData] = useState<TafsirData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTafsir();
  }, [selectedSource]);

  const loadTafsir = async () => {
    setLoading(true);
    try {
      const [quranRes, tafsirRes] = await Promise.all([
        fetch(`https://api.quran.com/api/v4/verses/by_chapter/${surah.id}?language=ar&fields=text_uthmani&per_page=${surah.verses_count}`),
        fetch(`https://api.alquran.cloud/v1/surah/${surah.id}/${selectedSource}`),
      ]);

      const quranData = await quranRes.json();
      const quranAyahs = quranData.verses.map((v: any, i: number) => ({
        numberInSurah: v.verse_key ? parseInt(v.verse_key.split(':')[1]) : i + 1,
        text: v.text_uthmani || '',
      }));

      const tafsirDataRes = await tafsirRes.json();
      const tafsirAyahs = tafsirDataRes.data.ayahs.map((a: any) => ({
        numberInSurah: a.numberInSurah,
        text: a.text,
      }));

      const bismillah = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ';
      let cleanQuran = [...quranAyahs];
      let cleanTafsir = [...tafsirAyahs];

      if (surah.id !== 1 && surah.id !== 9) {
        if (cleanQuran[0]?.text.startsWith(bismillah)) {
          cleanQuran[0] = { ...cleanQuran[0], text: cleanQuran[0].text.replace(bismillah, '').trim() };
        }
        if (cleanTafsir[0]?.text?.includes(bismillah)) {
          cleanTafsir[0] = { ...cleanTafsir[0], text: cleanTafsir[0].text.replace(bismillah, '').trim() };
        }
      }

      const result = cleanTafsir.map((t: any, i: number) => ({
        numberInSurah: t.numberInSurah,
        text: t.text,
        ayahText: cleanQuran[i]?.text || '',
      }));

      setTafsirData(result);
    } catch (error) {
      console.error('Error loading tafsir:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 bg-[#0a0a0a] border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
          <h2 className="text-base sm:text-xl font-bold text-white truncate">تفسير {surah.name_arabic}</h2>
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="h-8 sm:h-9 px-2 sm:px-3 bg-white/5 border border-white/10 rounded-lg text-white text-xs sm:text-sm focus:outline-none cursor-pointer flex-shrink-0"
          >
            {TAFSIR_SOURCES.map(source => (
              <option key={source.id} value={source.id} className="bg-[#0a0a0a]">
                {source.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 transition-colors flex-shrink-0"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-10 h-10 border-3 border-green-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {tafsirData.map((item) => (
              <div key={item.numberInSurah} className="px-3 sm:px-6 py-3 sm:py-4 hover:bg-white/[0.02] transition-colors">
                {/* Ayah Header */}
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">
                    {item.numberInSurah}
                  </span>
                  <p className="text-base sm:text-xl text-white/90 leading-relaxed" style={{ fontFamily: 'var(--font-quran)' }}>
                    {item.ayahText}
                  </p>
                </div>
                
                {/* Tafsir */}
                <p className="text-white/70 leading-relaxed sm:mr-11 text-xs sm:text-base">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
