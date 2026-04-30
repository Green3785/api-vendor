import { merge } from 'lodash-es';
export function createEmptySettingSlice() {
    return { properties: {}, elements: [] };
}
/**
 * Reduces multiple setting slices into a single slice
 */
function reduceSlices(slices) {
    const result = createEmptySettingSlice();
    for (const slice of slices) {
        // Deep merge properties using lodash.merge
        merge(result.properties, slice.properties);
        // Append elements
        result.elements.push(...slice.elements);
    }
    return result;
}
/**
 * Merges multiple setting slices into a single, holistic slice.
 */
export const mergeSettingSlices = (slices, options) => {
    const merged = reduceSlices(slices);
    if (options?.as) {
        return {
            properties: {
                [options.as]: {
                    type: 'object',
                    properties: merged.properties,
                },
            },
            elements: merged.elements,
        };
    }
    return merged;
};
//# sourceMappingURL=settings.js.map