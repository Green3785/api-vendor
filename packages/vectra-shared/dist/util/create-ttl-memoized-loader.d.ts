export type CreateTtlMemoizedLoaderOptions<T, Args = void, Key = Args> = {
    /**
     * Function that produces the value to cache.
     */
    load: (args: Args) => T;
    /**
     * Duration (in milliseconds) that the cached value remains valid.
     */
    ttlMs: number;
    /**
     * Optional function that returns a cache key derived from the loader arguments.
     * When provided, the value is only reused when the key matches the cached entry.
     */
    getCacheKey?: (args: Args) => Key;
    /**
     * Optional predicate to determine whether a loaded value should be cached.
     */
    shouldCache?: (value: T) => boolean;
};
export type TtlMemoizedLoader<T, Args = void> = {
    /**
     * Returns a cached value when available, otherwise calls the loader.
     */
    get: (args: Args) => T;
    /**
     * Clears the cached value.
     */
    clear: () => void;
};
/**
 * Creates a memoized loader with a time-to-live (TTL) cache.
 *
 * Subsequent calls within the TTL window reuse the cached value when the cache key matches.
 * The cache entry is invalidated automatically when the TTL expires, the key changes,
   or `shouldCache` returns false.
 */
export declare const createTtlMemoizedLoader: <T, Args = void, Key = Args>(options: CreateTtlMemoizedLoaderOptions<T, Args, Key>) => TtlMemoizedLoader<T, Args>;
