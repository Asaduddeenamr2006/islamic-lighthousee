'use client';

import { useState } from 'react';
import { MemorizationSettings, PlaybackMode } from '../lib/storage';

const SURAH_NAMES: { id: number; name: string }[] = [
  { id: 1, name: 'الفاتحة' }, { id: 2, name: 'البقرة' }, { id: 3, name: 'آل عمران' },
  { id: 4, name: 'النساء' }, { id: 5, name: 'المائدة' }, { id: 6, name: 'الأنعام' },
  { id: 7, name: 'الأعراف' }, { id: 8, name: 'الأنفال' }, { id: 9, name: 'التوبة' },
  { id: 10, name: 'يونس' }, { id: 11, name: 'هود' }, { id: 12, name: 'يوسف' },
  { id: 13, name: 'الرعد' }, { id: 14, name: 'إبراهيم' }, { id: 15, name: 'الحجر' },
  { id: 16, name: 'النحل' }, { id: 17, name: 'الإسراء' }, { id: 18, name: 'الكهف' },
  { id: 19, name: 'مريم' }, { id: 20, name: 'طه' }, { id: 21, name: 'الأنبياء' },
  { id: 22, name: 'الحج' }, { id: 23, name: 'المؤمنون' }, { id: 24, name: 'النور' },
  { id: 25, name: 'الفرقان' }, { id: 26, name: 'الشعراء' }, { id: 27, name: 'النمل' },
  { id: 28, name: 'القصص' }, { id: 29, name: 'العنكبوت' }, { id: 30, name: 'الروم' },
  { id: 31, name: 'لقمان' }, { id: 32, name: 'السجدة' }, { id: 33, name: 'الأحزاب' },
  { id: 34, name: 'سبأ' }, { id: 35, name: 'فاطر' }, { id: 36, name: 'يس' },
  { id: 37, name: 'الصافات' }, { id: 38, name: 'ص' }, { id: 39, name: 'الزمر' },
  { id: 40, name: 'غافر' }, { id: 41, name: 'فصلت' }, { id: 42, name: 'الشورى' },
  { id: 43, name: 'الزخرف' }, { id: 44, name: 'الدخان' }, { id: 45, name: 'الجاثية' },
  { id: 46, name: 'الأحقاف' }, { id: 47, name: 'محمد' }, { id: 48, name: 'الفتح' },
  { id: 49, name: 'الحجرات' }, { id: 50, name: 'ق' }, { id: 51, name: 'الذاريات' },
  { id: 52, name: 'الطور' }, { id: 53, name: 'النجم' }, { id: 54, name: 'القمر' },
  { id: 55, name: 'الرحمن' }, { id: 56, name: 'الواقعة' }, { id: 57, name: 'الحديد' },
  { id: 58, name: 'المجادلة' }, { id: 59, name: 'الحشر' }, { id: 60, name: 'الممتحنة' },
  { id: 61, name: 'الصف' }, { id: 62, name: 'الجمعة' }, { id: 63, name: 'المنافقون' },
  { id: 64, name: 'التغابن' }, { id: 65, name: 'الطلاق' }, { id: 66, name: 'التحريم' },
  { id: 67, name: 'الملك' }, { id: 68, name: 'القلم' }, { id: 69, name: 'الحاقة' },
  { id: 70, name: 'المعارج' }, { id: 71, name: 'نوح' }, { id: 72, name: 'الجن' },
  { id: 73, name: 'المزمل' }, { id: 74, name: 'المدثر' }, { id: 75, name: 'القيامة' },
  { id: 76, name: 'الإنسان' }, { id: 77, name: 'المرسلات' }, { id: 78, name: 'النبأ' },
  { id: 79, name: 'النازعات' }, { id: 80, name: 'عبس' }, { id: 81, name: 'التكوير' },
  { id: 82, name: 'الانفطار' }, { id: 83, name: 'المطففين' }, { id: 84, name: 'الانشقاق' },
  { id: 85, name: 'البروج' }, { id: 86, name: 'الطارق' }, { id: 87, name: 'الأعلى' },
  { id: 88, name: 'الغاشية' }, { id: 89, name: 'الفجر' }, { id: 90, name: 'البلد' },
  { id: 91, name: 'الشمس' }, { id: 92, name: 'الليل' }, { id: 93, name: 'الضحى' },
  { id: 94, name: 'الشرح' }, { id: 95, name: 'التين' }, { id: 96, name: 'العلق' },
  { id: 97, name: 'القدر' }, { id: 98, name: 'البينة' }, { id: 99, name: 'الزلزلة' },
  { id: 100, name: 'العاديات' }, { id: 101, name: 'القارعة' }, { id: 102, name: 'التكاثر' },
  { id: 103, name: 'العصر' }, { id: 104, name: 'همزة' }, { id: 105, name: 'الفيل' },
  { id: 106, name: 'قريش' }, { id: 107, name: 'الماعون' }, { id: 108, name: 'الكوثَر' },
  { id: 109, name: 'الكافرون' }, { id: 110, name: 'النصر' }, { id: 111, name: 'المسد' },
  { id: 112, name: 'الإخلاص' }, { id: 113, name: 'الفلق' }, { id: 114, name: 'الناس' },
];

const SURAH_VERSE_COUNTS: Record<number, number> = {
  1: 7, 2: 286, 3: 200, 4: 176, 5: 120, 6: 165, 7: 206, 8: 75, 9: 129,
  10: 109, 11: 123, 12: 111, 13: 43, 14: 52, 15: 99, 16: 128, 17: 111,
  18: 110, 19: 98, 20: 135, 21: 112, 22: 78, 23: 118, 24: 64, 25: 77,
  26: 227, 27: 93, 28: 88, 29: 69, 30: 60, 31: 34, 32: 30, 33: 73,
  34: 54, 35: 45, 36: 83, 37: 182, 38: 88, 39: 75, 40: 85, 41: 54,
  42: 53, 43: 89, 44: 59, 45: 37, 46: 35, 47: 38, 48: 29, 49: 18,
  50: 45, 51: 60, 52: 49, 53: 62, 54: 55, 55: 78, 56: 96, 57: 29,
  58: 22, 59: 24, 60: 13, 61: 14, 62: 11, 63: 11, 64: 18, 65: 12,
  66: 12, 67: 30, 68: 52, 69: 52, 70: 44, 71: 28, 72: 28, 73: 20,
  74: 56, 75: 40, 76: 31, 77: 50, 78: 40, 79: 46, 80: 42, 81: 29,
  82: 19, 83: 36, 84: 25, 85: 22, 86: 17, 87: 19, 88: 26, 89: 30,
  90: 20, 91: 15, 92: 21, 93: 11, 94: 8, 95: 8, 96: 19, 97: 5,
  98: 8, 99: 8, 100: 11, 101: 11, 102: 8, 103: 3, 104: 9, 105: 5,
  106: 4, 107: 7, 108: 3, 109: 6, 110: 3, 111: 5, 112: 4, 113: 5,
  114: 6,
};

const PLAYBACK_MODES: { value: PlaybackMode; label: string; desc: string }[] = [
  { value: 'normal', label: 'عادي', desc: 'القارئ الأول فقط' },
  { value: 'alternating-reader', label: 'تبديل القارئ', desc: 'قارئ لكل آية' },
  { value: 'alternating-group', label: 'تبديل المجموعة', desc: 'كل قارئ يقرأ الجميع' },
  { value: 'random', label: 'عشوائي', desc: 'قارئ عشوائي لكل آية' },
];

interface ControlsPanelProps {
  settings: MemorizationSettings;
  onSettingsChange: (settings: Partial<MemorizationSettings>) => void;
  isOpen: boolean;
  onToggle: () => void;
  onOpenReaderSelector: () => void;
}

export default function ControlsPanel({
  settings,
  onSettingsChange,
  isOpen,
  onToggle,
  onOpenReaderSelector,
}: ControlsPanelProps) {
  const [showMore, setShowMore] = useState(false);

  const startVerseCount = SURAH_VERSE_COUNTS[settings.startSurah] || 7;
  const endVerseCount = SURAH_VERSE_COUNTS[settings.endSurah] || 7;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-48px)]'}`}>
      <div className="bg-[#1a1d26]/95 backdrop-blur-lg border-t border-white/10">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between px-4 py-3 text-white"
        >
          <span className="font-medium">الإعدادات</span>
          <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>

        <div className={`overflow-hidden transition-all ${isOpen ? 'max-h-[70vh]' : 'max-h-0'}`}>
          <div className="px-4 pb-4 space-y-4 overflow-y-auto max-h-[60vh]">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-white/50 mb-1">من سورة</label>
                <select
                  value={settings.startSurah}
                  onChange={(e) => onSettingsChange({ startSurah: parseInt(e.target.value), startVerse: 1 })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500"
                >
                  {SURAH_NAMES.map((s) => (
                    <option key={s.id} value={s.id} className="bg-[#1a1d26]">{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1">من آية</label>
                <input
                  type="number"
                  min={1}
                  max={startVerseCount}
                  value={settings.startVerse}
                  onChange={(e) => onSettingsChange({ startVerse: parseInt(e.target.value) || 1 })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1">إلى سورة</label>
                <select
                  value={settings.endSurah}
                  onChange={(e) => onSettingsChange({ endSurah: parseInt(e.target.value), endVerse: SURAH_VERSE_COUNTS[parseInt(e.target.value)] || 7 })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500"
                >
                  {SURAH_NAMES.map((s) => (
                    <option key={s.id} value={s.id} className="bg-[#1a1d26]">{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1">إلى آية</label>
                <input
                  type="number"
                  min={1}
                  max={endVerseCount}
                  value={settings.endVerse}
                  onChange={(e) => onSettingsChange({ endVerse: parseInt(e.target.value) || 1 })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-white/50 mb-1">تكرار الآية</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={settings.verseRepeatCount}
                  onChange={(e) => onSettingsChange({ verseRepeatCount: parseInt(e.target.value) || 1 })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1">تكرار المجموعة</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={settings.groupRepeatCount}
                  onChange={(e) => onSettingsChange({ groupRepeatCount: parseInt(e.target.value) || 1 })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1">فترة توقف (ث)</label>
                <input
                  type="number"
                  min={0}
                  max={30}
                  value={settings.pauseDuration}
                  onChange={(e) => onSettingsChange({ pauseDuration: parseInt(e.target.value) || 0 })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.loopVerseForever}
                  onChange={(e) => onSettingsChange({ loopVerseForever: e.target.checked })}
                  className="sr-only"
                />
                <span className={`w-4 h-4 rounded border ${settings.loopVerseForever ? 'bg-green-500 border-green-500' : 'border-white/30'} flex items-center justify-center`}>
                  {settings.loopVerseForever && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
                <span className="text-sm text-white/70">تكرار الآية للأبد</span>
              </label>
              <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.loopGroupForever}
                  onChange={(e) => onSettingsChange({ loopGroupForever: e.target.checked })}
                  className="sr-only"
                />
                <span className={`w-4 h-4 rounded border ${settings.loopGroupForever ? 'bg-green-500 border-green-500' : 'border-white/30'} flex items-center justify-center`}>
                  {settings.loopGroupForever && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
                <span className="text-sm text-white/70">تكرار المجموعة للأبد</span>
              </label>
              <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showDoublePage}
                  onChange={(e) => onSettingsChange({ showDoublePage: e.target.checked })}
                  className="sr-only"
                />
                <span className={`w-4 h-4 rounded border ${settings.showDoublePage ? 'bg-green-500 border-green-500' : 'border-white/30'} flex items-center justify-center`}>
                  {settings.showDoublePage && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
                <span className="text-sm text-white/70">صفحتان</span>
              </label>
            </div>

            <div>
              <label className="block text-xs text-white/50 mb-2">وضع التشغيل</label>
              <div className="grid grid-cols-2 gap-2">
                {PLAYBACK_MODES.map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() => onSettingsChange({ playbackMode: mode.value })}
                    className={`p-3 rounded-lg border text-right transition-all ${
                      settings.playbackMode === mode.value
                        ? 'bg-green-500/20 border-green-500/50 text-green-400'
                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-medium text-sm">{mode.label}</div>
                    <div className="text-xs text-white/50">{mode.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenReaderSelector}
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors flex items-center justify-between"
            >
              <span className="text-sm">اختيار القراء</span>
              <span className="text-xs text-green-400">{settings.selectedReaders.length} محدد</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}