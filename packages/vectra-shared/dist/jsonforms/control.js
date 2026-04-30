/**
 * Creates a Layout (typically UnraidSettingsLayout) containing a Label and a Control element.
 */
export function createLabeledControl({ scope, label, description, controlOptions, labelOptions, layoutOptions, rule, }) {
    const layout = {
        type: 'UnraidSettingsLayout', // Use the specific Unraid layout type
        scope: scope, // Apply scope to the layout for potential rules/visibility
        options: layoutOptions,
        elements: [
            {
                type: 'Label',
                text: label,
                scope: scope, // Scope might be needed for specific label behaviors
                options: { ...labelOptions, description },
            },
            {
                type: 'Control',
                scope: scope,
                options: controlOptions,
            },
        ],
    };
    // Conditionally add the rule to the layout if provided
    if (rule) {
        layout.rule = rule;
    }
    return layout;
}
//# sourceMappingURL=control.js.map