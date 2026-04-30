import type { Categorization, ComposableCondition, ControlElement, JsonSchema, LabelElement, Layout, LeafCondition, SchemaBasedCondition, UISchemaElement } from '@jsonforms/core';
/**
 * JSON schema properties.
 */
export type DataSlice = Record<string, JsonSchema>;
/**
 * A JSONForms UI schema element.
 */
export type UIElement = (UISchemaElement | LabelElement | Layout | ControlElement | Categorization) & {
    elements?: UIElement[];
};
/**
 * A condition for a JSONForms rule.
 */
export type RuleCondition = LeafCondition | ComposableCondition | SchemaBasedCondition | Omit<SchemaBasedCondition, 'scope'>;
/**
 * A slice of settings form data.
 */
export type SettingSlice = {
    /** One or more JSON schema properties.
     * Conceptually, this is a subset (slice) of the JSON schema,
     * specific to a piece or logical group of data.
     */
    properties: DataSlice;
    /** One or more UI schema elements that describe the form layout of this piece/subset of data. */
    elements: UIElement[];
};
export declare function createEmptySettingSlice(): SettingSlice;
/**
 * Merges multiple setting slices into a single, holistic slice.
 */
export declare const mergeSettingSlices: (slices: SettingSlice[], options?: {
    as?: string;
}) => SettingSlice;
