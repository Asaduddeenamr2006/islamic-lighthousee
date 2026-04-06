'use client';

import { RECITERS } from '../../quran/lib/types';

interface PlaybackBarProps {
  isPlaying: boolean;
  isPaused: boolean;
  currentVerseIndex: number;
  currentVerseRepeat: number;
  currentGroupRepeat: number;
  totalVerses: number;
  groupRepeatCount: number;
  currentReciter: string;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onSkipNext: () => void;
  onSkipPrevious: () => void;
  accentColor?: string;
}

const RECITER_NAMES: Record<string, string> = RECITERS.reduce((acc, r) => {
  acc[r.id] = r.name;
  return acc;
}, {} as Record<string, string>);

export default function PlaybackBar({
  isPlaying,
  isPaused,
  currentVerseIndex,
  currentVerseRepeat,
  currentGroupRepeat,
  totalVerses,
  groupRepeatCount,
  currentReciter,
  onPlay,
  onPause,
  onStop,
  onSkipNext,
  onSkipPrevious,
  accentColor = '#22c55e',
}: PlaybackBarProps) {
  const progress = totalVerses > 0 ? ((currentVerseIndex + 1) / totalVerses) * 100 : 0;

  return (
    <div className="fixed top-0 left-0 right-0 z-30 bg-[#1a1d26]/95 backdrop-blur-lg border-b border-white/10">
      <div className="flex items-center gap-2 px-3 py-2">
        <div className="flex items-center gap-1">
          <button
            onClick={onSkipPrevious}
            className="p-2 rounded-lg hover:bg-white/10 text-white/70 transition-colors"
            disabled={currentVerseIndex === 0}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
            </svg>
          </button>

          <button
            onClick={isPlaying ? onPause : onPlay}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
            style={{ backgroundColor: accentColor }}
          >
            {isPlaying ? (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          <button
            onClick={onSkipNext}
            className="p-2 rounded-lg hover:bg-white/10 text-white/70 transition-colors"
            disabled={currentVerseIndex >= totalVerses - 1}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11.555 5.168A1 1 0 0010 6v2.798l-5.445-3.63A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4z" />
            </svg>
          </button>

          <button
            onClick={onStop}
            className="p-2 rounded-lg hover:bg-white/10 text-white/70 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-white/50 truncate">
              آية {currentVerseIndex + 1} من {totalVerses}
              {currentVerseRepeat > 1 && <span className="text-amber-400"> (تكرار {currentVerseRepeat})</span>}
              {currentGroupRepeat > 1 && <span className="text-purple-400"> - مجموعة {currentGroupRepeat}/{groupRepeatCount}</span>}
            </span>
            <span className="text-xs text-white/40 truncate mr-2">
              {RECITER_NAMES[currentReciter] || currentReciter}
            </span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-300"
              style={{ 
                width: `${progress}%`,
                backgroundColor: accentColor 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}