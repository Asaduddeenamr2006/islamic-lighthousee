'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ColorScheme } from './SettingsPanel';

interface HeaderProps {
  title: string;
  onMenuToggle: () => void;
  onTafsirClick: () => void;
  onSettingsClick: () => void;
  colorScheme: ColorScheme;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  onColorChange: (color: ColorScheme) => void;
}

const COLORS: { id: ColorScheme; dot: string }[] = [
  { id: 'green', dot: '#22c55e' },
  { id: 'blue', dot: '#3b82f6' },
  { id: 'red', dot: '#ef4444' },
  { id: 'brown', dot: '#92400e' },
  { id: 'grey', dot: '#9ca3af' },
  { id: 'purple', dot: '#8b5cf6' },
];

export default function Header({ title, onMenuToggle, onTafsirClick, onSettingsClick, colorScheme, fontSize, onFontSizeChange, onColorChange }: HeaderProps) {
  const [showColors, setShowColors] = useState(false);

  return (
    <header className="h-14 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-2 sm:px-4 sticky top-0 z-30">
      {/* Left: Menu + Back */}
      <div className="flex items-center gap-0.5">
        <Link
          href="/"
          className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          title="العودة للرئيسية"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>
        <button 
          onClick={onMenuToggle}
          className="lg:hidden w-9 h-9 flex items-center justify-center text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Title */}
      <h1 className="text-white font-semibold text-base sm:text-lg truncate flex-1 text-center px-2">
        {title}
      </h1>

      {/* Actions */}
      <div className="flex items-center gap-0.5 sm:gap-1 relative">
        {/* Font Size - */}
        <button
          onClick={() => onFontSizeChange(Math.max(1, fontSize - 0.2))}
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          title="تصغير الخط"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>

        {/* Font Size Label */}
        <button
          onClick={() => onFontSizeChange(2.2)}
          className="h-8 sm:h-9 px-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs hover:text-white hover:bg-white/10 transition-colors"
          title="إعادة ضبط الخط"
        >
          {fontSize.toFixed(1)}
        </button>

        {/* Font Size + */}
        <button
          onClick={() => onFontSizeChange(Math.min(4, fontSize + 0.2))}
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          title="تكبير الخط"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>

        {/* Color Picker Button */}
        <button
          onClick={() => setShowColors(!showColors)}
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors relative"
          title="لون التطبيق"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          <span 
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border border-white/30"
            style={{ background: COLORS.find(c => c.id === colorScheme)?.dot }}
          />
        </button>

        {/* Color Dropdown */}
        {showColors && (
          <div className="absolute top-full left-0 mt-1 p-2 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl z-50 flex gap-1.5">
            {COLORS.map((c) => (
              <button
                key={c.id}
                onClick={() => { onColorChange(c.id); setShowColors(false); }}
                className="w-7 h-7 rounded-full border-2 transition-all hover:scale-110"
                style={{ 
                  background: c.dot, 
                  borderColor: colorScheme === c.id ? 'white' : 'transparent',
                  boxShadow: colorScheme === c.id ? `0 0 8px ${c.dot}` : 'none',
                }}
              />
            ))}
          </div>
        )}

        {/* Tafsir Button */}
        <button
          onClick={onTafsirClick}
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          title="التفسير"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </button>

        {/* Settings Button */}
        <button
          onClick={onSettingsClick}
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          title="الإعدادات"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
