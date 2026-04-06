export interface MemorizationSettings {
  startSurah: number;
  startVerse: number;
  endSurah: number;
  endVerse: number;
  verseRepeatCount: number;
  groupRepeatCount: number;
  pauseDuration: number;
  loopVerseForever: boolean;
  loopGroupForever: boolean;
  selectedReaders: string[];
  playbackMode: PlaybackMode;
  showDoublePage: boolean;
}

export type PlaybackMode = 'normal' | 'alternating-reader' | 'alternating-group' | 'random';

export interface PlaybackProgress {
  currentSurah: number;
  currentVerse: number;
  currentVerseRepeat: number;
  currentGroupRepeat: number;
  timestamp: number;
}

export const DEFAULT_SETTINGS: MemorizationSettings = {
  startSurah: 1,
  startVerse: 1,
  endSurah: 1,
  endVerse: 7,
  verseRepeatCount: 1,
  groupRepeatCount: 1,
  pauseDuration: 0,
  loopVerseForever: false,
  loopGroupForever: false,
  selectedReaders: ['Husary_128kbps'],
  playbackMode: 'normal',
  showDoublePage: true,
};

const STORAGE_KEYS = {
  SETTINGS: 'memorization_settings',
  PROGRESS: 'memorization_progress',
};

export function loadSettings(): MemorizationSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Failed to load settings:', e);
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: MemorizationSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
}

export function loadProgress(): PlaybackProgress | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load progress:', e);
  }
  return null;
}

export function saveProgress(progress: PlaybackProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

export function clearProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.PROGRESS);
}

export function generateVerseList(settings: MemorizationSettings): { surah: number; verse: number }[] {
  const verses: { surah: number; verse: number }[] = [];
  
  const startSurah = settings.startSurah;
  const endSurah = settings.endSurah;
  const surahVerseCounts: Record<number, number> = {
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
  
  if (startSurah === endSurah) {
    for (let v = settings.startVerse; v <= settings.endVerse; v++) {
      verses.push({ surah: startSurah, verse: v });
    }
  } else {
    for (let s = startSurah; s <= endSurah; s++) {
      const startV = s === startSurah ? settings.startVerse : 1;
      const endV = s === endSurah ? settings.endVerse : (surahVerseCounts[s] || 7);
      for (let v = startV; v <= endV; v++) {
        verses.push({ surah: s, verse: v });
      }
    }
  }
  
  return verses;
}