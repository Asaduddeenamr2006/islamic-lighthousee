'use client';

import { useState } from 'react';
import { Reciter } from '../lib/types';

type PlayMode = 'none' | 'one' | 'all';

interface AudioPlayerProps {
  surahName: string;
  reciterName: string;
  reciters: Reciter[];
  selectedReciter: string;
  onReciterChange: (id: string) => void;
  currentAyah: number;
  totalAyahs: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playMode: PlayMode;
  onPlayPause: () => void;
  onPrevAyah: () => void;
  onNextAyah: () => void;
  onSeek: (time: number) => void;
  onPlayModeChange: (mode: PlayMode) => void;
}

const playModeIcons = {
  none: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  one: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      <text x="12" y="14" fontSize="8" fill="currentColor" textAnchor="middle">1</text>
    </svg>
  ),
  all: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
};

export default function AudioPlayer({
  surahName,
  reciterName,
  reciters,
  selectedReciter,
  onReciterChange,
  currentAyah,
  totalAyahs,
  isPlaying,
  currentTime,
  duration,
  playMode,
  onPlayPause,
  onPrevAyah,
  onNextAyah,
  onSeek,
  onPlayModeChange,
}: AudioPlayerProps) {
  const [showReciterList, setShowReciterList] = useState(false);

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  const cyclePlayMode = () => {
    const modes: PlayMode[] = ['none', 'one', 'all'];
    const currentIndex = modes.indexOf(playMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    onPlayModeChange(modes[nextIndex]);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    onSeek(percent * duration);
  };

  const getPlayModeLabel = () => {
    switch (playMode) {
      case 'one': return 'تكرار آية';
      case 'all': return 'تكرار الكل';
      default: return 'بدون تكرار';
    }
  };

  return (
    <div className="h-16 sm:h-20 bg-[#1a1d26]/90 backdrop-blur-md border-t border-white/5 flex items-center px-2 sm:px-4 gap-2 sm:gap-3 relative">
      {/* Reciter Dropdown */}
      {showReciterList && (
        <div className="absolute bottom-full right-2 sm:right-4 mb-1 bg-[#1a1d26] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 w-64 max-h-64 overflow-y-auto">
          {reciters.map(reciter => (
            <button
              key={reciter.id}
              onClick={() => {
                onReciterChange(reciter.id);
                setShowReciterList(false);
              }}
              className={`w-full text-right px-4 py-3 text-sm transition-colors ${
                selectedReciter === reciter.id
                  ? 'bg-green-500/20 text-green-400'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              {reciter.name}
            </button>
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
        {/* Reciter Button */}
        <button
          onClick={() => setShowReciterList(!showReciterList)}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 transition-colors"
          title="تغيير القارئ"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </button>

        {/* Repeat Button */}
        <button
          onClick={cyclePlayMode}
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors ${
            playMode !== 'none'
              ? 'bg-green-500/20 text-green-400'
              : 'bg-white/10 text-white/50 hover:bg-white/20'
          }`}
          title={getPlayModeLabel()}
        >
          {playModeIcons[playMode]}
        </button>

        {/* Prev Ayah */}
        <button
          onClick={onPrevAyah}
          disabled={currentAyah <= 1}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 disabled:opacity-30 transition-colors"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z" />
          </svg>
        </button>

        {/* Play/Pause */}
        <button
          onClick={onPlayPause}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center text-white transition-all duration-200 hover:scale-105 flex-shrink-0"
        >
          {isPlaying ? (
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Next Ayah */}
        <button
          onClick={onNextAyah}
          disabled={currentAyah >= totalAyahs}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 disabled:opacity-30 transition-colors"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zm8.5-6V6h2v12h-2v-6z" />
          </svg>
        </button>
      </div>

      {/* Progress & Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5 sm:mb-1">
          <span className="text-white font-medium text-xs sm:text-sm truncate">{surahName}</span>
          <span className="text-white/40 text-[10px] sm:text-xs flex-shrink-0 mr-2 sm:mr-3">آية {currentAyah} / {totalAyahs}</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-white/40 text-[10px] sm:text-xs w-7 sm:w-9">{formatTime(currentTime)}</span>
          <div
            className="flex-1 h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer group"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-100 group-hover:bg-green-400"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-white/40 text-[10px] sm:text-xs w-7 sm:w-9">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
