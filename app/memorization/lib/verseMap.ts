interface VerseLocation {
  page: number;
  surah: number;
  verse: number;
}

interface PageRange {
  startPage: number;
  endPage: number;
  surahStart: number;
  surahEnd: number;
  versesStart: number;
  versesEnd: number;
}

const SURAH_PAGE_START: Record<number, number> = {
  1: 1, 2: 2, 3: 50, 4: 77, 5: 106, 6: 128, 7: 151, 8: 177, 9: 187,
  10: 198, 11: 208, 12: 221, 13: 232, 14: 237, 15: 242, 16: 249, 17: 255,
  18: 262, 19: 267, 20: 272, 21: 282, 22: 289, 23: 293, 24: 305, 25: 312,
  26: 318, 27: 329, 28: 334, 29: 341, 30: 350, 31: 354, 32: 356, 33: 362,
  34: 366, 35: 370, 36: 373, 37: 380, 38: 389, 39: 394, 40: 400, 41: 405,
  42: 410, 43: 415, 44: 419, 45: 422, 46: 425, 47: 428, 48: 432, 49: 434,
  50: 437, 51: 442, 52: 445, 53: 448, 54: 450, 55: 454, 56: 458, 57: 462,
  58: 466, 59: 469, 60: 471, 61: 472, 62: 473, 63: 474, 64: 475, 65: 477,
  66: 478, 67: 480, 68: 482, 69: 485, 70: 487, 71: 489, 72: 490, 73: 492,
  74: 494, 75: 497, 76: 498, 77: 500, 78: 502, 79: 504, 80: 506, 81: 508,
  82: 509, 83: 510, 84: 512, 85: 513, 86: 514, 87: 515, 88: 516, 89: 518,
  90: 519, 91: 520, 92: 521, 93: 522, 94: 523, 95: 523, 96: 524, 97: 526,
  98: 527, 99: 528, 100: 529, 101: 530, 102: 531, 103: 532, 104: 533, 105: 534,
  106: 535, 107: 536, 108: 537, 109: 538, 110: 539, 111: 540, 112: 541, 113: 542, 114: 543,
};

const SURAH_VERSE_COUNT: Record<number, number> = {
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

export function getPageNumber(surah: number, verse: number): number {
  if (surah === 1 || surah === 9) {
    if (surah === 1) return 1;
    return 187;
  }

  let page = SURAH_PAGE_START[surah] || 1;
  const versesBefore = verse - 1;
  page += Math.floor(versesBefore / 3);
  return Math.min(page, 604);
}

export function getPageRange(surah: number, verse: number): { startPage: number; endPage: number } {
  const startPage = getPageNumber(surah, verse);
  const verseCount = SURAH_VERSE_COUNT[surah] || 1;
  const endPage = getPageNumber(surah, verseCount);
  return { startPage, endPage };
}

export function getVerseLocationsInRange(
  startSurah: number,
  startVerse: number,
  endSurah: number,
  endVerse: number
): { surah: number; verse: number; page: number }[] {
  const locations: { surah: number; verse: number; page: number }[] = [];

  if (startSurah === endSurah) {
    for (let v = startVerse; v <= endVerse; v++) {
      locations.push({ surah: startSurah, verse: v, page: getPageNumber(startSurah, v) });
    }
  } else {
    for (let s = startSurah; s <= endSurah; s++) {
      const vStart = s === startSurah ? startVerse : 1;
      const vEnd = s === endSurah ? endVerse : (SURAH_VERSE_COUNT[s] || 1);
      for (let v = vStart; v <= vEnd; v++) {
        locations.push({ surah: s, verse: v, page: getPageNumber(s, v) });
      }
    }
  }

  return locations;
}

export const MUSHAF_IMAGE_BASE = 'https://quran.ksu.edu.sa/ayat/safahat';

export function getMushafPageUrl(pageNumber: number): string {
  return `${MUSHAF_IMAGE_BASE}${pageNumber}.png`;
}

export { SURAH_PAGE_START, SURAH_VERSE_COUNT };