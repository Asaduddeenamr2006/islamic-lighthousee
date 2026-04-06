const AUDIO_BASE_URL = 'https://www.everyayah.com/data';

function getAudioUrl(reciterId: string, surah: number, verse: number): string {
  const s = String(surah).padStart(3, '0');
  const v = String(verse).padStart(3, '0');
  return `${AUDIO_BASE_URL}/${reciterId}/${s}${v}.mp3`;
}

interface CacheEntry {
  url: string;
  blob: Blob;
  timestamp: number;
}

class AudioCache {
  private memoryCache: Map<string, CacheEntry> = new Map();
  private dbCache: Map<string, CacheEntry> = new Map();
  private maxMemoryItems = 20;
  private maxDBItems = 100;
  private preloadQueue: string[] = [];
  private isProcessing = false;

  private getKey(reciterId: string, surah: number, verse: number): string {
    return `${reciterId}_${surah}_${verse}`;
  }

  private evictMemory(): void {
    if (this.memoryCache.size >= this.maxMemoryItems) {
      let oldestKey: string | null = null;
      let oldestTime = Infinity;
      for (const [key, entry] of this.memoryCache) {
        if (entry.timestamp < oldestTime) {
          oldestTime = entry.timestamp;
          oldestKey = key;
        }
      }
      if (oldestKey) {
        this.memoryCache.delete(oldestKey);
      }
    }
  }

  async get(reciterId: string, surah: number, verse: number): Promise<HTMLAudioElement | null> {
    const key = this.getKey(reciterId, surah, verse);
    const url = getAudioUrl(reciterId, surah, verse);

    if (this.memoryCache.has(key)) {
      const entry = this.memoryCache.get(key)!;
      entry.timestamp = Date.now();
      const url = URL.createObjectURL(entry.blob);
      const audio = new Audio(url);
      return audio;
    }

    if (this.dbCache.has(key)) {
      const entry = this.dbCache.get(key)!;
      this.memoryCache.set(key, entry);
      this.evictMemory();
      const audioUrl = URL.createObjectURL(entry.blob);
      return new Audio(audioUrl);
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      
      const entry: CacheEntry = {
        url,
        blob,
        timestamp: Date.now(),
      };

      this.memoryCache.set(key, entry);
      this.evictMemory();

      if (this.dbCache.size < this.maxDBItems) {
        this.dbCache.set(key, entry);
      }

      return new Audio(URL.createObjectURL(blob));
    } catch (error) {
      console.error(`Failed to fetch audio: ${url}`, error);
      return null;
    }
  }

  async prefetch(reciterId: string, verses: { surah: number; verse: number }[]): Promise<void> {
    for (const v of verses) {
      const key = this.getKey(reciterId, v.surah, v.verse);
      if (!this.memoryCache.has(key) && !this.dbCache.has(key)) {
        this.preloadQueue.push(this.getKey(reciterId, v.surah, v.verse));
      }
    }
    this.processQueue();
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.preloadQueue.length > 0 && this.memoryCache.size < this.maxMemoryItems) {
      const key = this.preloadQueue.shift();
      if (!key) break;

      const [reciterId, surah, verse] = key.split('_');
      const s = parseInt(surah);
      const v = parseInt(verse);
      
      if (this.memoryCache.has(key) || this.dbCache.has(key)) continue;

      try {
        const url = getAudioUrl(reciterId, s, v);
        const response = await fetch(url);
        if (!response.ok) continue;
        const blob = await response.blob();
        
        const entry: CacheEntry = { url, blob, timestamp: Date.now() };
        this.memoryCache.set(key, entry);
        this.evictMemory();

        if (this.dbCache.size < this.maxDBItems) {
          this.dbCache.set(key, entry);
        }
      } catch (e) {
        // Silent fail for prefetch
      }
    }

    this.isProcessing = false;
  }

  clear(): void {
    this.memoryCache.clear();
    this.dbCache.clear();
    this.preloadQueue = [];
  }

  getStats(): { memorySize: number; dbSize: number; queueLength: number } {
    return {
      memorySize: this.memoryCache.size,
      dbSize: this.dbCache.size,
      queueLength: this.preloadQueue.length,
    };
  }
}

export const audioCache = new AudioCache();
export { getAudioUrl };