'use client';

interface HeaderProps {
  title: string;
  onMenuToggle: () => void;
  onTafsirClick: () => void;
  onSettingsClick: () => void;
}

export default function Header({ title, onMenuToggle, onTafsirClick, onSettingsClick }: HeaderProps) {
  return (
    <header className="h-14 bg-[#0f1219]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-3 sm:px-4 sticky top-0 z-30">
      {/* Menu Button */}
      <button 
        onClick={onMenuToggle}
        className="lg:hidden w-10 h-10 flex items-center justify-center text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Title */}
      <h1 className="text-white font-semibold text-base sm:text-lg truncate flex-1 text-center px-2">
        {title}
      </h1>

      {/* Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Settings Button */}
        <button
          onClick={onSettingsClick}
          className="h-9 sm:h-10 w-9 sm:w-10 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
          title="الإعدادات"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* Tafsir Button */}
        <button
          onClick={onTafsirClick}
          className="h-9 sm:h-10 px-3 sm:px-4 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/10 text-xs sm:text-sm transition-colors flex items-center gap-1.5 sm:gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span className="hidden sm:inline">تفسير</span>
        </button>
      </div>
    </header>
  );
}
