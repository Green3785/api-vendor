import { Logger, } from "@nestjs/common";
import path from "node:path";
import { bufferTime } from "rxjs/operators";
import { ConfigFileHandler } from "../util/config-file-handler.js";
import { ConfigDefinition } from "../util/config-definition.js";
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
export class ConfigFilePersister extends ConfigDefinition {
    configService;
    configObserver;
    fileHandler;
    /**
     * Creates a new ConfigFilePersister instance.
     *
     * @param configService The NestJS ConfigService instance for reactive config management
     */
    constructor(configService) {
        super();
        this.configService = configService;
        this.logger = new Logger(`ConfigFilePersister:${this.fileName()}`);
        this.fileHandler = new ConfigFileHandler(this);
    }
    /**
     * Support feature flagging or dynamic toggling of config persistence.
     *
     * @returns Whether the config is enabled. Defaults to true.
     */
    enabled() {
        return true;
    }
    getConfig(assertExists = true) {
        try {
            const config = this.configService.getOrThrow(this.configKey());
            return structuredClone(config);
        }
        catch (error) {
            if (assertExists) {
                throw error;
            }
            else {
                return this.defaultConfig();
            }
        }
    }
    /**
     * Replaces the current config with a new one. Will trigger a persistence attempt.
     *
     * @param config - The new config object
     */
    replaceConfig(config) {
        this.configService.set(this.configKey(), config);
        this.persist(config);
    }
    /**
     * Returns the absolute path to the configuration file.
     * Combines `PATHS_CONFIG_MODULES` environment variable with the filename.
     *
     * @throws Error if `PATHS_CONFIG_MODULES` environment variable is not set
     */
    configPath() {
        return path.join(this.configService.getOrThrow("PATHS_CONFIG_MODULES"), this.fileName());
    }
    /**
     * Returns a standalone ConfigFileHandler for direct file operations outside NestJS.
     */
    getFileHandler() {
        return this.fileHandler;
    }
    /**
     * NestJS lifecycle hook for cleanup.
     * Unsubscribes from config changes and persists final state.
     */
    async onModuleDestroy() {
        this.configObserver?.unsubscribe();
        await this.persist();
    }
    /**
     * NestJS lifecycle hook for initialization.
     * Loads config from disk and sets up reactive change subscription.
     */
    async onModuleInit() {
        if (!this.enabled())
            return;
        this.logger.verbose(`Config path: ${this.configPath()}`);
        await this.loadOrMigrateConfig();
        this.configObserver = this.subscribe({
            next: async () => {
                await this.persist();
            },
            error: async (err) => {
                this.logger.error(err, "Error receiving config changes");
            },
        });
    }
    /**
     * Persists configuration to disk with change detection optimization.
     *
     * @param config - The config object to persist (defaults to current config from service)
     * @returns `true` if persisted to disk, `false` if skipped or failed
     */
    async persist(config = this.configService.get(this.configKey())) {
        if (!this.enabled()) {
            this.logger.verbose(`Config is disabled, skipping persistence`);
            return false;
        }
        if (!config) {
            this.logger.warn(`Cannot persist undefined config`);
            return false;
        }
        return await this.fileHandler.writeConfigFile(config);
    }
    /**
     * Subscribe to config changes. Changes are buffered for 25ms to prevent race conditions.
     *
     * When enabled() returns false, the `next` callback will not be called.
     *
     * @param subscription - The subscription to add
     * @returns rxjs Subscription
     */
    subscribe(subscription) {
        return this.configService.changes$.pipe(bufferTime(25)).subscribe({
            next: async (changes) => {
                if (!subscription.next)
                    return;
                const configChanged = changes.some(({ path }) => path?.startsWith(this.configKey()));
                if (configChanged && this.enabled()) {
                    await subscription.next();
                }
            },
            error: async (err) => {
                if (subscription.error) {
                    await subscription.error(err);
                }
            },
        });
    }
    /**
     * Load or migrate configuration and set it in ConfigService.
     */
    async loadOrMigrateConfig() {
        if (!this.enabled())
            return;
        const config = await this.fileHandler.loadConfig();
        this.configService.set(this.configKey(), config);
        return this.persist(config);
    }
}
//# sourceMappingURL=config-file.js.map