'use client';

import { Surah } from '../lib/types';
import type { FontFamily } from './SettingsPanel';

interface Page {
  text: string;
  startAyah: number;
  endAyah: number;
  pageNumber: number;
}

interface QuranContentProps {
  surah: Surah | null;
  pages: Page[];
  currentPageIndex: number;
  totalPages: number;
  loading: boolean;
  onPrevPage: () => void;
  onNextPage: () => void;
  fontFamily: FontFamily;
  fontSize: number;
}

export default function QuranContent({ 
  surah, 
  pages, 
  currentPageIndex, 
  totalPages, 
  loading, 
  onPrevPage, 
  onNextPage,
  fontFamily,
  fontSize,
}: QuranContentProps) {
  const getFontClass = (font: FontFamily) => {
    switch (font) {
      case 'quran': return 'var(--font-quran)';
      case 'amiri': return 'var(--font-amiri)';
      case 'cairo': return 'var(--font-cairo)';
      case 'indopak': return 'var(--font-quran)';
      default: return 'var(--font-quran)';
    }
  };
  if (loading && pages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-green-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-white/50 text-sm">جاري التحميل...</span>
        </div>
      </div>
    );
  }

  if (!surah) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
          <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2" id="quran-title">القرآن الكريم</h2>
        <p className="text-white/40 text-sm max-w-md" id="quran-desc">
          اختر سورة من القائمة للبدء بالقراءة والاستماع
        </p>
      </div>
    );
  }

  const currentPage = pages[currentPageIndex];
  if (!currentPage) return null;

  return (
    <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Page Card */}
        <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-[#1a1d26] overflow-hidden shadow-xl">
          {/* Page Header */}
          <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-white/5">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold bg-green-600 text-white">
                صفحة {currentPage.pageNumber}
              </span>
              <span className="text-white/40 text-xs sm:text-sm hidden sm:inline">صفحة {currentPageIndex + 1} من {totalPages}</span>
            </div>
            <span className="text-white/40 text-xs sm:text-sm">
              <span className="hidden sm:inline">الآيات </span>{currentPage.startAyah} - {currentPage.endAyah}
            </span>
          </div>

          {/* Quran Text */}
          <div 
            className="p-4 sm:p-6 lg:p-8 text-right text-white/90"
            style={{ 
              fontFamily: getFontClass(fontFamily), 
              fontSize: `${fontSize}rem`,
              lineHeight: `${fontSize * 1.6}rem`,
            }}
            dangerouslySetInnerHTML={{ __html: currentPage.text }}
          />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
            <button
              onClick={onPrevPage}
              disabled={currentPageIndex === 0}
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-white/10 text-white/70 hover:bg-white/5 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base transition-all"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">السابقة</span>
            </button>
            <span className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/10 text-white text-xs sm:text-base font-bold">
              {currentPageIndex + 1} / {totalPages}
            </span>
            <button
              onClick={onNextPage}
              disabled={currentPageIndex === totalPages - 1}
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-white/10 text-white/70 hover:bg-white/5 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base transition-all"
            >
              <span className="hidden sm:inline">التالية</span>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
