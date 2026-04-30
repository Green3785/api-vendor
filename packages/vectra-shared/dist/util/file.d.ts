/**
 * Checks if a file exists asynchronously.
 * @param path - The file path to check
 * @returns Promise that resolves to true if file exists, false otherwise
 */
export declare const fileExists: (path: string) => Promise<boolean>;
/**
 * Checks if a file exists synchronously.
 * @param path - The file path to check
 * @returns true if file exists, false otherwise
 */
export declare const fileExistsSync: (path: string) => boolean;
/**
 * Writes data to a file, creating parent directories if they don't exist.
 *
 * This function ensures the directory structure exists before writing the file,
 * equivalent to `mkdir -p` followed by file writing.
 *
 * @param path - The file path to write to
 * @param data - The data to write (string or Buffer)
 * @throws {Error} If path is invalid (null, empty, or not a string)
 * @throws {Error} For any file system errors (EACCES, EPERM, ENOSPC, EISDIR, etc.)
 */
export declare const ensureWrite: (path: string, data: string | Buffer) => Promise<void>;
/**
 * Writes data to a file synchronously, creating parent directories if they don't exist.
 *
 * This function ensures the directory structure exists before writing the file,
 * equivalent to `mkdir -p` followed by file writing.
 *
 * @param path - The file path to write to
 * @param data - The data to write (string or Buffer)
 * @throws {Error} If path is invalid (null, empty, or not a string)
 * @throws {Error} For any file system errors (EACCES, EPERM, ENOSPC, EISDIR, etc.)
 */
export declare const ensureWriteSync: (path: string, data: string | Buffer) => void;
