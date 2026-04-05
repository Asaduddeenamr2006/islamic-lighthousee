'use client';

export type FontFamily = 'quran' | 'amiri' | 'cairo' | 'indopak';
export type ColorScheme = 'green' | 'blue' | 'red' | 'brown' | 'grey' | 'purple';

interface Settings {
  fontFamily: FontFamily;
  fontSize: number;
  colorScheme: ColorScheme;
}

interface SettingsPanelProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
  onClose: () => void;
}

const FONT_FAMILIES = [
  { id: 'quran' as FontFamily, name: 'خط القرآن (شهرزاد)' },
  { id: 'amiri' as FontFamily, name: 'خط أميري' },
  { id: 'cairo' as FontFamily, name: 'خط القاهرة' },
  { id: 'indopak' as FontFamily, name: 'خط إنديباك' },
];

const COLOR_SCHEMES: { id: ColorScheme; name: string; dot: string }[] = [
  { id: 'green', name: 'أخضر', dot: '#2c7a4d' },
  { id: 'blue', name: 'أزرق', dot: '#2563eb' },
  { id: 'red', name: 'أحمر', dot: '#dc2626' },
  { id: 'brown', name: 'بني', dot: '#78350f' },
  { id: 'grey', name: 'رمادي', dot: '#6b7280' },
  { id: 'purple', name: 'بنفسجي', dot: '#7c3aed' },
];

export default function SettingsPanel({ settings, onSettingsChange, onClose }: SettingsPanelProps) {
  const getFontClass = (font: FontFamily) => {
    switch (font) {
      case 'quran': return 'var(--font-quran)';
      case 'amiri': return 'var(--font-amiri)';
      case 'cairo': return 'var(--font-cairo)';
      case 'indopak': return 'var(--font-quran)';
      default: return 'var(--font-quran)';
    }
  };

  const getAccentColor = (scheme: ColorScheme) => {
    const colors: Record<ColorScheme, string> = {
      green: '#22c55e',
      blue: '#3b82f6',
      red: '#ef4444',
      brown: '#92400e',
      grey: '#9ca3af',
      purple: '#8b5cf6',
    };
    return colors[scheme];
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center">
      <div 
        className="w-full sm:max-w-md bg-[#0a0a0a] sm:rounded-2xl rounded-t-2xl border border-white/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-white">الإعدادات</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[60vh] overflow-y-auto">
          <div className="space-y-6">
            {/* Color Scheme */}
            <div>
              <label className="text-sm text-white/70 mb-3 block">لون التطبيق</label>
              <div className="grid grid-cols-3 gap-2">
                {COLOR_SCHEMES.map((scheme) => (
                  <button
                    key={scheme.id}
                    onClick={() => onSettingsChange({ ...settings, colorScheme: scheme.id })}
                    className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${
                      settings.colorScheme === scheme.id
                        ? 'border-white/30 bg-white/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <span 
                      className="w-5 h-5 rounded-full flex-shrink-0 border border-white/20"
                      style={{ background: scheme.dot }}
                    />
                    <span className="text-sm text-white/80">{scheme.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Family */}
            <div>
              <label className="text-sm text-white/70 mb-3 block">نوع الخط</label>
              <div className="grid grid-cols-2 gap-2">
                {FONT_FAMILIES.map((font) => (
                  <button
                    key={font.id}
                    onClick={() => onSettingsChange({ ...settings, fontFamily: font.id })}
                    className={`p-3 rounded-xl border text-right transition-all ${
                      settings.fontFamily === font.id
                        ? 'border-white/30 bg-white/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                    style={{ color: getAccentColor(settings.colorScheme) }}
                  >
                    <span className="text-sm">{font.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div>
              <label className="text-sm text-white/70 mb-3 block">
                حجم الخط: <span style={{ color: getAccentColor(settings.colorScheme) }}>{settings.fontSize}rem</span>
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onSettingsChange({ ...settings, fontSize: Math.max(1, settings.fontSize - 0.2) })}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${((settings.fontSize - 1) / 3) * 100}%`, background: getAccentColor(settings.colorScheme) }}
                  />
                </div>
                <button
                  onClick={() => onSettingsChange({ ...settings, fontSize: Math.min(4, settings.fontSize + 0.2) })}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              {/* Preview */}
              <div 
                className="mt-4 p-4 rounded-xl bg-white/5 text-white/80 text-right leading-relaxed"
                style={{ fontFamily: getFontClass(settings.fontFamily), fontSize: `${Math.min(settings.fontSize, 2)}rem` }}
              >
                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
