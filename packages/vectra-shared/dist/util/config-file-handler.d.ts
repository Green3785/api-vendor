import { Logger } from "@nestjs/common";
import { ConfigDefinition } from "./config-definition.js";
/**
 * Standalone configuration file handler that works with any ConfigDefinition.
 * Can be used independently of NestJS DI container.
 *
 * This class provides robust file operations with the following features:
 * - **Migration Priority**: When files don't exist, migration is attempted before falling back to defaults
 * - **Change Detection**: Uses deep equality checks to avoid unnecessary disk writes (flash drive optimization)
 * - **Error Resilience**: Graceful handling of file system errors, JSON parsing failures, and validation errors
 * - **Atomic Operations**: Individual methods for specific file operations (read, write, update)
 *
 * @template T The configuration object type that extends object
 *
 * @example
 * ```typescript
 * const configDef = new MyConfigDefinition('/etc/myapp');
 * const fileHandler = new ConfigFileHandler(configDef);
 *
 * // Load config with migration fallback
 * const config = await fileHandler.loadConfig();
 *
 * // Update specific properties
 * await fileHandler.updateConfig({ enabled: true });
 * ```
 */
export declare class ConfigFileHandler<T extends object> {
    private readonly definition;
    private readonly logger;
    /**
     * @param definition The configuration definition that provides behavior
     */
    constructor(definition: ConfigDefinition<T>, logger?: Logger);
    /**
     * Loads configuration from file, with migration fallback.
     *
     * Strategy:
     * 1. Load and validate existing config
     * 2. If loading fails, attempt migration
     * 3. If migration fails, use defaults
     * 4. Merge result with defaults and persist if migrated
     *
     * @returns Complete configuration object
     */
    loadConfig(): Promise<T>;
    /**
     * Reads and validates configuration from file.
     *
     * @param configPath - Path to config file (defaults to `configPath()`)
     * @returns Validated configuration object from disk
     * @throws Error if file doesn't exist, contains invalid JSON, or fails validation
     */
    readConfigFile(configPath?: string): Promise<T>;
    /**
     * Writes configuration to file with change detection optimization.
     * Uses deep equality checks to avoid unnecessary writes.
     *
     * @param config - The config object to write to disk
     * @returns `true` if written to disk, `false` if skipped or failed
     */
    writeConfigFile(config: T): Promise<boolean>;
    /**
     * Updates configuration by merging with existing config.
     * Loads current config, shallow merges updates, and writes back to disk.
     *
     * @param updates - Partial configuration object with properties to update
     * @returns `true` if updated on disk, `false` if failed or no changes
     */
    updateConfig(updates: Partial<T>): Promise<boolean>;
}
