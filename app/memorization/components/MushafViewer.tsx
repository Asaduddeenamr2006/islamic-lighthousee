'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { getMushafPageUrl } from '../lib/verseMap';

interface MushafViewerProps {
  currentPage: number;
  showDoublePage: boolean;
  onPageChange?: (page: number) => void;
  onDoubleTap?: () => void;
}

export default function MushafViewer({ 
  currentPage, 
  showDoublePage, 
  onPageChange,
  onDoubleTap 
}: MushafViewerProps) {
  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; time: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const pagesToLoad = showDoublePage 
    ? [currentPage, currentPage + 1].filter(p => p <= 604)
    : [currentPage];

  useEffect(() => {
    pagesToLoad.forEach(page => {
      if (!loadedPages.has(page)) {
        setIsLoading(true);
        const img = new Image();
        img.src = getMushafPageUrl(page);
        img.onload = () => {
          setLoadedPages(prev => new Set([...prev, page]));
          setIsLoading(false);
        };
        img.onerror = () => {
          setIsLoading(false);
        };
      }
    });
  }, [pagesToLoad, loadedPages]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, time: Date.now() });
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaTime = Date.now() - touchStart.time;
    
    if (deltaTime < 300 && Math.abs(deltaX) < 10) {
      onDoubleTap?.();
    }
    
    setTouchStart(null);
  }, [touchStart, onDoubleTap]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (e.detail === 2) {
      onDoubleTap?.();
    }
  }, [onDoubleTap]);

  const goToNextPage = useCallback(() => {
    if (currentPage < 604) {
      const nextPage = showDoublePage ? currentPage + 2 : currentPage + 1;
      onPageChange?.(Math.min(nextPage, 604));
    }
  }, [currentPage, showDoublePage, onPageChange]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) {
      const prevPage = showDoublePage ? currentPage - 2 : currentPage - 1;
      onPageChange?.(Math.max(prevPage, 1));
    }
  }, [currentPage, showDoublePage, onPageChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageUp') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageDown') {
        goToPrevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextPage, goToPrevPage]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#1a1d26]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <div className={`relative flex ${showDoublePage ? 'gap-1' : 'justify-center'}`}>
        {pagesToLoad.map((page) => (
          <div 
            key={page}
            className="relative"
            style={{ 
              aspectRatio: '3/4',
              maxHeight: '100%',
            }}
          >
            {loadedPages.has(page) ? (
              <img
                src={getMushafPageUrl(page)}
                alt={`صفحة ${page}`}
                className="h-full w-auto object-contain select-none"
                draggable={false}
              />
            ) : (
              <div className="h-full w-48 bg-[#2a2d36] animate-pulse flex items-center justify-center">
                <span className="text-white/30 text-sm">{page}</span>
              </div>
            )}
            
            {page === currentPage && (
              <div className="absolute inset-0 bg-green-500/20 animate-pulse pointer-events-none" />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); goToPrevPage(); }}
        disabled={currentPage <= 1}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white/70 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all backdrop-blur-sm"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={(e) => { e.stopPropagation(); goToNextPage(); }}
        disabled={currentPage >= 604}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white/70 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all backdrop-blur-sm"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white/70 text-sm">
        صفحة {currentPage}{showDoublePage && currentPage < 604 ? ` - ${currentPage + 1}` : ''}
      </div>
    </div>
  );
}