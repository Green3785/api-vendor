/**
 * Returns Map keys with specified ordering preserved, followed by remaining keys in deterministic ASCII order.
 *
 * Useful for maintaining consistent object property ordering in serialization, UI rendering,
 * or API responses where certain keys should appear first while ensuring deterministic output.
 *
 * @param map - Source Map to extract keys from
 * @param orderedKeys - Keys to prioritize in the specified order (duplicates and non-existent keys ignored)
 * @returns Array of keys with prefixed ordering preserved, remaining keys in ASCII sort
 *
 * @example
 * ```ts
 * const data = new Map([['id', 1], ['name', 'test'], ['created', Date.now()]]);
 * getPrefixedSortedKeys(data, ['name', 'id']);
 * // Returns: ['name', 'id', 'created']
 * ```
 */
export declare function getPrefixedSortedKeys<K extends keyof any>(map: Map<K, unknown>, orderedKeys?: K[]): K[];
