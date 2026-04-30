import type { ApiConfig } from "./api-config.js";
import { type SettingSlice } from "../jsonforms/settings.js";
/**
 * A SettingsFragment represents a logical grouping (or "slice") of settings
 * exposed to users of the API. It's used to bundle the schema, view, and
 * control of a group of settings.
 */
export interface SettingsFragment<T> {
    buildSlice(): Promise<SettingSlice>;
    getCurrentValues(): Promise<T>;
    updateValues(values: Partial<T>): Promise<{
        restartRequired?: boolean;
        values: Partial<T>;
        warnings?: string[];
    }>;
}
/**
 * A container type mapping setting names to the corresponding type of its settings values.
 *
 * This is used to provide type assistance via the {@see UserSettingsService}.
 *
 * Use interface merging to add new settings. Note that you must still call
 * {@see UserSettingsService.register} to register the settings. Otherwise, the type assistance will
 * be incorrect.
 *
 * ! Note that the following characters may not be used in setting names:
 * - `/`, `~` - will cause issues in JSON schema references (during dynamic form & schema generation)
 *
 * Note that the UserSettings type is not used to store the actual SettingsFragment, just
 * the type of the settings values.
 */
export interface UserSettings {
    api: ApiConfig;
}
/** Wrap a type in a SettingsFragment. Ensure the type lives in the UserSettings interface. */
type FragmentOf<T extends keyof UserSettings = keyof UserSettings> = SettingsFragment<UserSettings[T]>;
/**
 * A service for controlling exposed settings.
 *
 * This allows plugins to expose settings to users of the API without having to
 * implement their own UI or api endpoints.
 */
export declare class UserSettingsService {
    readonly settings: Map<"api", FragmentOf<"api">>;
    constructor();
    register<T extends keyof UserSettings>(name: T, fragment: FragmentOf<T>): void;
    get<T extends keyof UserSettings>(name: T): FragmentOf<T> | undefined;
    getOrThrow<T extends keyof UserSettings>(name: T): NonNullable<ReturnType<typeof this.get>>;
    /**
     * Get all settings as a single SettingSlice.
     *
     * Optionally accepts an ordered list of setting keys.  Slices belonging to these keys
     * will be placed at the beginning of the merged slice, in the order provided.  Any
     * remaining registered settings will be appended afterwards, ordered alphabetically
     * by key.  This ensures a deterministic result while still allowing the caller to
     * prioritise first-party settings.
     */
    getAllSettings(orderedKeys?: (keyof UserSettings)[]): Promise<SettingSlice>;
    /** Get all current values from all registered settings fragments. */
    getAllValues(): Promise<Record<string, any>>;
    /** Update values for a specific settings fragment. */
    updateValues<T extends keyof UserSettings>(name: T, values: Partial<UserSettings[T]>): Promise<{
        restartRequired?: boolean;
        values: Partial<UserSettings[T]>;
        warnings?: string[];
    }>;
    /** Update values from a namespaced object. */
    updateNamespacedValues(values: Record<string, unknown>): Promise<{
        restartRequired: boolean;
        values: Record<string, unknown>;
        warnings?: string[];
    }>;
}
export declare class UserSettingsModule {
}
export {};
