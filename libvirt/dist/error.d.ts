/**
 * Handles errors from the native libvirt module by converting them to LibvirtError instances.
 * @param error - The error to handle
 * @throws {LibvirtError} A standardized libvirt error
 */
export declare function handleError(error: any): never;
/**
 * Wraps a method call with standardized error handling.
 * @param method - Method to call
 * @param args - Arguments to pass to the method
 * @returns Result of the method call
 * @throws {LibvirtError} If an error occurs
 */
export declare function wrapMethod<T>(method: (...args: any[]) => Promise<T>, ...args: any[]): Promise<T>;
//# sourceMappingURL=error.d.ts.map