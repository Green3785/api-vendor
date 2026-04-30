import { Logger } from "@nestjs/common";
/**
 * Abstract base class for configuration behavior without NestJS dependencies.
 * Provides core configuration logic including file path resolution, defaults,
 * validation, and migration support.
 *
 * @template T The configuration object type that extends object
 *
 * @example
 * ```typescript
 * interface MyConfig {
 *   enabled: boolean;
 *   timeout: number;
 * }
 *
 * class MyConfigDefinition extends ConfigDefinition<MyConfig> {
 *   constructor(private configDir: string) {
 *     super('MyConfig');
 *   }
 *
 *   fileName() { return "my-config.json"; }
 *   configPath() { return path.join(this.configDir, this.fileName()); }
 *   defaultConfig(): MyConfig { return { enabled: false, timeout: 5000 }; }
 *
 *   async validate(config: object): Promise<MyConfig> {
 *     const myConfig = config as MyConfig;
 *     if (myConfig.timeout < 1000) throw new Error("Timeout too low");
 *     return myConfig;
 *   }
 * }
 * ```
 */
export class ConfigDefinition {
    logger;
    /**
     * @param loggerName Optional custom logger name (defaults to generic name)
     */
    constructor(loggerName) {
        this.logger = new Logger(loggerName ?? `ConfigDefinition:${this.fileName()}`);
    }
    /**
     * Validates and transforms a configuration object.
     *
     * Override to implement custom validation logic such as:
     * - Schema validation
     * - Range checking for numeric values
     * - Data transformation/normalization
     *
     * @param config - The raw config object to validate
     * @returns The validated and potentially transformed config
     * @throws Error if the config is invalid
     */
    async validate(config) {
        return config;
    }
    /**
     * Migrates legacy or corrupted configuration to the current format.
     *
     * Called when:
     * - Config file doesn't exist (first-time setup)
     * - Config file contains invalid JSON
     * - Config validation fails
     *
     * Override to provide custom migration logic for legacy formats,
     * version upgrades, or first-time installations.
     *
     * Note:
     * - Backwards-compatible updates such as field additions are better handled via `defaultConfig()`
     * because `defaultConfig()` is merged with the loaded config.
     *
     * @returns Migrated configuration object
     * @throws Error if migration is not possible (falls back to defaults)
     */
    async migrateConfig() {
        throw new Error("Not implemented");
    }
}
//# sourceMappingURL=config-definition.js.map