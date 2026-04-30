import type { ControlElement, LabelElement, Layout, Rule } from '@jsonforms/core';
/**
 * Creates a Layout (typically UnraidSettingsLayout) containing a Label and a Control element.
 */
export declare function createLabeledControl({ scope, label, description, controlOptions, labelOptions, layoutOptions, rule, }: {
    scope: string;
    label: string;
    description?: string;
    controlOptions: ControlElement['options'];
    labelOptions?: LabelElement['options'];
    layoutOptions?: Layout['options'];
    rule?: Rule;
}): Layout;
