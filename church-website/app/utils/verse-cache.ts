interface CacheEntry {
  data: any;
  timestamp: number;
}

// In-memory cache using Map
const cache = new Map<string, CacheEntry>();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export function getCachedVerse(date: string): any | null {
  const entry = cache.get(date);
  if (!entry) return null;

  const now = Date.now();
  if (now - entry.timestamp > CACHE_DURATION) {
    cache.delete(date);
    return null;
  }

  return entry.data;
}

export function setCachedVerse(date: string, data: any): void {
  cache.set(date, {
    data,
    timestamp: Date.now()
  });
}
