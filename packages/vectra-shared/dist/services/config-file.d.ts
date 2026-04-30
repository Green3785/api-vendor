import { type OnModuleDestroy, type OnModuleInit } from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";
import type { Subscription } from "rxjs";
import { ConfigFileHandler } from "../util/config-file-handler.js";
import { ConfigDefinition } from "../util/config-definition.js";
export type ConfigSubscription = {
    /**
     * Called when the config changes.
     * To prevent race conditions, a config is not provided to the callback.
     */
    next?: () => Promise<void>;
    /**
     * Called when an error occurs within the subscriber.
     */
    error?: (error: unknown) => Promise<void>;
};
/**
 * Abstract base class for persisting configuration objects to JSON files.
 *
 * Provides NestJS integration with reactive config updates, standalone file operations,
 * and lifecycle management with automatic persistence.
 *
 * @template T The configuration object type that extends object
 *
 * @example
 * ```typescript
 * @Injectable()
 * class MyConfigPersister extends ConfigFilePersister<MyConfig> {
 *   constructor(configService: ConfigService) {
 *     super(configService);
 *   }
 *
 *   fileName() { return "my-config.json"; }
 *   configKey() { return "myConfig"; }
 *   defaultConfig(): MyConfig {
 *     return { enabled: false, timeout: 5000 };
 *   }
 * }
 * ```
 */
export declare abstract class ConfigFilePersister<T extends object> extends ConfigDefinition<T> implements OnModuleInit, OnModuleDestroy {
    protected readonly configService: ConfigService;
    private configObserver?;
    private fileHandler;
    /**
     * Creates a new ConfigFilePersister instance.
     *
     * @param configService The NestJS ConfigService instance for reactive config management
     */
    constructor(configService: ConfigService);
    /**
     * Returns the configuration key used in the ConfigService.
     *
     * This key is used to:
     * - Store/retrieve config from the ConfigService
     * - Filter config change events to only process relevant changes
     * - Namespace configuration to avoid conflicts
     *
     * @returns The config key string (e.g., "userPreferences", "apiSettings")
     * @example "myModuleConfig"
     */
    abstract configKey(): string;
    /**
     * Support feature flagging or dynamic toggling of config persistence.
     *
     * @returns Whether the config is enabled. Defaults to true.
     */
    enabled(): boolean;
    /**
     * Returns a `structuredClone` of the current config object.
     *
     * @param assertExists - Whether to throw an error if the config does not exist. Defaults to true.
     * @returns The current config object, or the default config if assertExists is false & no config exists
     */
    getConfig(assertExists: true): T;
    getConfig(assertExists: false): T;
    getConfig(): T;
    /**
     * Replaces the current config with a new one. Will trigger a persistence attempt.
     *
     * @param config - The new config object
     */
    replaceConfig(config: T): void;
    /**
     * Returns the absolute path to the configuration file.
     * Combines `PATHS_CONFIG_MODULES` environment variable with the filename.
     *
     * @throws Error if `PATHS_CONFIG_MODULES` environment variable is not set
     */
    configPath(): string;
    /**
     * Returns a standalone ConfigFileHandler for direct file operations outside NestJS.
     */
    getFileHandler(): ConfigFileHandler<T>;
    /**
     * NestJS lifecycle hook for cleanup.
     * Unsubscribes from config changes and persists final state.
     */
    onModuleDestroy(): Promise<void>;
    /**
     * NestJS lifecycle hook for initialization.
     * Loads config from disk and sets up reactive change subscription.
     */
    onModuleInit(): Promise<void>;
    /**
     * Persists configuration to disk with change detection optimization.
     *
     * @param config - The config object to persist (defaults to current config from service)
     * @returns `true` if persisted to disk, `false` if skipped or failed
     */
    persist(config?: any): Promise<boolean>;
    /**
     * Subscribe to config changes. Changes are buffered for 25ms to prevent race conditions.
     *
     * When enabled() returns false, the `next` callback will not be called.
     *
     * @param subscription - The subscription to add
     * @returns rxjs Subscription
     */
    subscribe(subscription: ConfigSubscription): Subscription;
    /**
     * Load or migrate configuration and set it in ConfigService.
     */
    private loadOrMigrateConfig;
}
