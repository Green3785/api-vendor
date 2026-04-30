import type { Get } from "type-fest";
/**
 * Converts a Comma Separated (CSV) string to an array of strings.
 *
 * @example
 * csvStringToArray('one,two,three') // ['one', 'two', 'three']
 * csvStringToArray('one, two, three') // ['one', 'two', 'three']
 * csvStringToArray(null) // []
 * csvStringToArray(undefined) // []
 * csvStringToArray('') // []
 *
 * @param csvString - The Comma Separated string to convert
 * @param opts - Options
 * @param opts.noEmpty - Whether to omit empty strings. Default is true.
 * @returns An array of strings
 */
export declare function csvStringToArray(csvString?: string | null, opts?: {
    noEmpty?: boolean;
}): string[];
/**
 * Retrieves a nested value from an object using a dot notation path.
 *
 * @example
 * const obj = { a: { b: { c: 'value' } } };
 * getNestedValue(obj, 'a.b.c') // 'value'
 * getNestedValue(obj, 'a.b') // { c: 'value' }
 * getNestedValue(obj, 'a.b.d') // undefined
 *
 * @param obj - The object to retrieve the value from
 * @param path - The dot notation path to the value
 * @returns The nested value or undefined if the path is invalid
 */
export declare function getNestedValue<TObj extends object, TPath extends string>(obj: TObj, path: TPath): Get<TObj, TPath>;
/**
 * Converts a value to a number. If the value is NaN, returns the default value.
 *
 * @param value - The value to convert to a number
 * @param defaultValue - The default value to return if the value is NaN. Default is 0.
 * @returns The number value or the default value if the value is NaN
 */
export declare function toNumberAlways(value: unknown, defaultValue?: number): number;
