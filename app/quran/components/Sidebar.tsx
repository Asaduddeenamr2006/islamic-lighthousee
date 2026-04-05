'use client';

import { Surah } from '../lib/types';

interface SidebarProps {
  surahs: Surah[];
  loading: boolean;
  selectedSurah: Surah | null;
  onSelectSurah: (surah: Surah) => void;
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
}

export default function Sidebar({ surahs, loading, selectedSurah, onSelectSurah, isOpen, onClose, accentColor }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 right-0 h-full w-full sm:w-80 md:w-72 lg:w-80 bg-[#0a0a0a] border-l border-white/5 z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0 lg:static lg:z-0`}
      >
        {/* Header */}
        <div className="h-14 sm:h-16 flex items-center justify-between px-4 sm:px-5 border-b border-white/5">
          <h2 className="text-base sm:text-lg font-semibold text-white">السور</h2>
          <button 
            onClick={onClose}
            className="lg:hidden w-8 h-8 flex items-center justify-center text-white/60 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-white/5">
          <div className="relative">
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="بحث في السور..."
              className="w-full h-10 pl-4 pr-10 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/40 focus:outline-none transition-colors"
              style={{ ['--tw-ring-color' as string]: accentColor }}
            />
          </div>
        </div>

        {/* Surah List */}
        <div className="h-[calc(100dvh-110px)] overflow-y-auto scrollbar-thin">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: accentColor, borderTopColor: 'transparent' }} />
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {surahs.map((surah) => (
                <button
                  key={surah.id}
                  onClick={() => onSelectSurah(surah)}
                  className="w-full flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg transition-all duration-200"
                  style={{
                    background: selectedSurah?.id === surah.id ? `${accentColor}15` : undefined,
                    color: selectedSurah?.id === surah.id ? accentColor : undefined,
                  }}
                >
                  <span className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs flex-shrink-0"
                    style={{
                      background: selectedSurah?.id === surah.id ? `${accentColor}20` : 'rgba(255,255,255,0.1)',
                      color: selectedSurah?.id === surah.id ? accentColor : 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {surah.id}
                  </span>
                  <div className="flex-1 text-right min-w-0">
                    <div className="font-medium text-sm truncate">{surah.name_arabic}</div>
                    <div className="text-xs text-white/40 mt-0.5 truncate">
                      {surah.translated_name?.name || surah.name_simple}
                    </div>
                  </div>
                  <span className="text-xs text-white/30 flex-shrink-0">{surah.verses_count}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
