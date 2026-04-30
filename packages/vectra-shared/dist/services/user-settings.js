// Container for user-configurable settings (e.g in the Unraid GUI)
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, Module } from "@nestjs/common";
import { mergeSettingSlices, } from "../jsonforms/settings.js";
import { getPrefixedSortedKeys } from "../util/key-order.js";
/**
 * A service for controlling exposed settings.
 *
 * This allows plugins to expose settings to users of the API without having to
 * implement their own UI or api endpoints.
 */
let UserSettingsService = class UserSettingsService {
    settings = new Map();
    constructor() { }
    register(name, fragment) {
        this.settings.set(name, fragment);
    }
    get(name) {
        return this.settings.get(name);
    }
    getOrThrow(name) {
        const fragment = this.get(name);
        if (!fragment) {
            throw new Error(`Setting '${name}' not registered (${typeof fragment}).`);
        }
        return fragment;
    }
    /**
     * Get all settings as a single SettingSlice.
     *
     * Optionally accepts an ordered list of setting keys.  Slices belonging to these keys
     * will be placed at the beginning of the merged slice, in the order provided.  Any
     * remaining registered settings will be appended afterwards, ordered alphabetically
     * by key.  This ensures a deterministic result while still allowing the caller to
     * prioritise first-party settings.
     */
    async getAllSettings(orderedKeys = []) {
        // Build final key order using helper
        const finalOrder = getPrefixedSortedKeys(this.settings, orderedKeys);
        const slicePromises = finalOrder.map((key) => this.settings.get(key).buildSlice());
        const slices = await Promise.all(slicePromises);
        return mergeSettingSlices(slices);
    }
    /** Get all current values from all registered settings fragments. */
    async getAllValues() {
        const entriesPromises = Array.from(this.settings.entries()).map(async ([key, fragment]) => {
            const values = await fragment.getCurrentValues();
            return [key, values];
        });
        const entries = await Promise.all(entriesPromises);
        return Object.fromEntries(entries);
    }
    /** Update values for a specific settings fragment. */
    async updateValues(name, values) {
        const fragment = this.getOrThrow(name);
        return fragment.updateValues(values);
    }
    /** Update values from a namespaced object. */
    async updateNamespacedValues(values) {
        let restartRequired = false;
        let allWarnings = [];
        for (const [key, fragmentValues] of Object.entries(values)) {
            if (!this.settings.has(key)) {
                // Skip unknown namespaces – they may belong to other consumers
                continue;
            }
            const result = await this.updateValues(key, fragmentValues);
            if (result.restartRequired) {
                restartRequired = true;
            }
            // Collect any warnings from individual fragments
            if (result.warnings) {
                allWarnings = allWarnings.concat(result.warnings);
            }
        }
        const response = {
            restartRequired,
            values: await this.getAllValues()
        };
        if (allWarnings.length > 0) {
            response.warnings = allWarnings;
        }
        return response;
    }
};
UserSettingsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], UserSettingsService);
export { UserSettingsService };
let UserSettingsModule = class UserSettingsModule {
};
UserSettingsModule = __decorate([
    Module({
        providers: [UserSettingsService],
        exports: [UserSettingsService],
    })
], UserSettingsModule);
export { UserSettingsModule };
//# sourceMappingURL=user-settings.js.map