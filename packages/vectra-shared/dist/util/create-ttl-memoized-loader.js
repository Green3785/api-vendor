/**
 * Creates a memoized loader with a time-to-live (TTL) cache.
 *
 * Subsequent calls within the TTL window reuse the cached value when the cache key matches.
 * The cache entry is invalidated automatically when the TTL expires, the key changes,
   or `shouldCache` returns false.
 */
export const createTtlMemoizedLoader = (options) => {
    let cache;
    const clear = () => {
        cache = undefined;
    };
    const get = (args) => {
        const now = Date.now();
        const key = options.getCacheKey?.(args);
        if (cache) {
            const keyMatches = options.getCacheKey === undefined ? true : Object.is(cache.key, key);
            if (keyMatches && now < cache.expiresAt) {
                return cache.value;
            }
        }
        const value = options.load(args);
        if (!options.shouldCache || options.shouldCache(value)) {
            cache = {
                value,
                expiresAt: now + Math.max(0, options.ttlMs),
                key,
            };
        }
        else {
            cache = undefined;
        }
        return value;
    };
    return { get, clear };
};
//# sourceMappingURL=create-ttl-memoized-loader.js.map