import NodeCache from 'node-cache';

// Create a new cache instance
const cache = new NodeCache();

interface CacheableResponse<T> {
    data: T;
    timestamp: number;
}

// Define a function to fetch data from the API and cache it
export async function fetchDataAndCache<T>(url: string, cacheKey: string, ttl: number): Promise<T> {
    // Check if data exists in cache
    const cachedData = cache.get<CacheableResponse<T>>(cacheKey);
    const currentTime = Date.now();
    if (cachedData && currentTime - cachedData.timestamp <= ttl * 1000) {
        return cachedData.data;
    } else {
        // Fetch data from the API
        const response = await fetch(url);
        const data: T = await response.json();
        // Store data in cache with a TTL
        cache.set(cacheKey, { data, timestamp: currentTime }, ttl);
        return data;
    }
}
