'use client';

import { useState, useEffect } from 'react';
import { useMemorization } from './hooks/useMemorization';
import { loadProgress, saveProgress } from './lib/storage';
import MushafViewer from './components/MushafViewer';
import ControlsPanel from './components/ControlsPanel';
import ReaderSelector from './components/ReaderSelector';
import PlaybackBar from './components/PlaybackBar';
import Link from 'next/link';

const SURAH_NAMES: Record<number, string> = {
  1: 'الفاتحة', 2: 'البقرة', 3: 'آل عمران', 4: 'النساء', 5: 'المائدة',
  6: 'الأنعام', 7: 'الأعراف', 8: 'الأنفال', 9: 'التوبة', 10: 'يونس',
  11: 'هود', 12: 'يوسف', 13: 'الرعد', 14: 'إبراهيم', 15: 'الحجر',
  16: 'النحل', 17: 'الإسراء', 18: 'الكهف', 19: 'مريم', 20: 'طه',
  21: 'الأنبياء', 22: 'الحج', 23: 'المؤمنون', 24: 'النور', 25: 'الفرقان',
  26: 'الشعراء', 27: 'النمل', 28: 'القصص', 29: 'العنكبوت', 30: 'الروم',
  31: 'لقمان', 32: 'السجدة', 33: 'الأحزاب', 34: 'سبأ', 35: 'فاطر',
  36: 'يس', 37: 'الصافات', 38: 'ص', 39: 'الزمر', 40: 'غافر',
  41: 'فصلت', 42: 'الشورى', 43: 'الزخرف', 44: 'الدخان', 45: 'الجاثية',
  46: 'الأحقاف', 47: 'محمد', 48: 'الفتح', 49: 'الحجرات', 50: 'ق',
  51: 'الذاريات', 52: 'الطور', 53: 'النجم', 54: 'القمر', 55: 'الرحمن',
  56: 'الواقعة', 57: 'الحديد', 58: 'المجادلة', 59: 'الحشر', 60: 'الممتحنة',
  61: 'الصف', 62: 'الجمعة', 63: 'المنافقون', 64: 'التغابن', 65: 'الطلاق',
  66: 'التحريم', 67: 'الملك', 68: 'القلم', 69: 'الحاقة', 70: 'المعارج',
  71: 'نوح', 72: 'الجن', 73: 'المزمل', 74: 'المدثر', 75: 'القيامة',
  76: 'الإنسان', 77: 'المرسلات', 78: 'النبأ', 79: 'النازعات', 80: 'عبس',
  81: 'التكوير', 82: 'الانفطار', 83: 'المطففين', 84: 'الانشقاق', 85: 'البروج',
  86: 'الطارق', 87: 'الأعلى', 88: 'الغاشية', 89: 'الفجر', 90: 'البلد',
  91: 'الشمس', 92: 'الليل', 93: 'الضحى', 94: 'الشرح', 95: 'التين',
  96: 'العلق', 97: 'القدر', 98: 'البينة', 99: 'الزلزلة', 100: 'العاديات',
  101: 'القارعة', 102: 'التكاثر', 103: 'العصر', 104: 'همزة', 105: 'الفيل',
  106: 'قريش', 107: 'الماعون', 108: 'الكوثَر', 109: 'الكافرون', 110: 'النصر',
  111: 'المسد', 112: 'الإخلاص', 113: 'الفلق', 114: 'الناس',
};

export default function MemorizationPage() {
  const [showControls, setShowControls] = useState(false);
  const [showReaderSelector, setShowReaderSelector] = useState(false);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const {
    settings,
    setSettings,
    isPlaying,
    currentVerseIndex,
    currentVerseRepeat,
    currentGroupRepeat,
    currentPage,
    totalVerses,
    currentReciter,
    play,
    pause,
    stop,
    skipToNext,
    skipToPrevious,
    jumpToVerse,
  } = useMemorization();

  useEffect(() => {
    setIsClient(true);
    
    const progress = loadProgress();
    if (progress && progress.currentSurah && progress.currentVerse) {
      setShowResumePrompt(true);
    }
  }, []);

  const handleResume = () => {
    setShowResumePrompt(false);
    play();
  };

  const handleStartFresh = () => {
    setShowResumePrompt(false);
    stop();
  };

  const handleDoubleTap = () => {
    setShowControls(true);
  };

  const accentColor = '#22c55e';

  return (
    <div className="h-screen flex flex-col bg-[#080a0f] overflow-hidden">
      <PlaybackBar
        isPlaying={isPlaying}
        isPaused={false}
        currentVerseIndex={currentVerseIndex}
        currentVerseRepeat={currentVerseRepeat}
        currentGroupRepeat={currentGroupRepeat}
        totalVerses={totalVerses}
        groupRepeatCount={settings.groupRepeatCount}
        currentReciter={currentReciter}
        onPlay={play}
        onPause={pause}
        onStop={stop}
        onSkipNext={skipToNext}
        onSkipPrevious={skipToPrevious}
        accentColor={accentColor}
      />

      <div className="flex-1 pt-14 pb-48 relative">
        <MushafViewer
          currentPage={currentPage}
          showDoublePage={settings.showDoublePage}
          onDoubleTap={handleDoubleTap}
        />
      </div>

      <ControlsPanel
        settings={settings}
        onSettingsChange={setSettings}
        isOpen={showControls}
        onToggle={() => setShowControls(!showControls)}
        onOpenReaderSelector={() => setShowReaderSelector(true)}
      />

      <ReaderSelector
        selectedReaders={settings.selectedReaders}
        onChange={(readers) => setSettings({ selectedReaders: readers })}
        isOpen={showReaderSelector}
        onClose={() => setShowReaderSelector(false)}
      />

      {showResumePrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative bg-[#1a1d26] rounded-2xl border border-white/10 p-6 w-full max-w-sm shadow-2xl">
            <h2 className="text-xl font-bold text-white text-center mb-2">استئناف الجلسة</h2>
            <p className="text-white/60 text-center text-sm mb-6">
              هل تريد استئناف من حيث توقفت؟
            </p>
            <div className="space-y-3">
              <button
                onClick={handleResume}
                className="w-full py-3 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
              >
                نعم، متابعة
              </button>
              <button
                onClick={handleStartFresh}
                className="w-full py-3 rounded-xl bg-white/10 text-white/80 font-medium hover:bg-white/20 transition-colors"
              >
                لا، ابدأ من جديد
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}