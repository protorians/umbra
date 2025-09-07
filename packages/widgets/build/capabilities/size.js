import { createWidgetCapabilities, createWidgetCapability } from "../capability.js";
import { ObjectSize } from "../enums.js";
import { StyleWidget } from "../style.js";
export const SurfaceSizeCapability = createWidgetCapability('surface', ({ payload }) => {
    let value = '960px';
    switch (payload) {
        case ObjectSize.ExtraSmall:
            value = '320px';
            break;
        case ObjectSize.Small:
            value = '768px';
            break;
        case ObjectSize.Large:
            value = '1024px';
            break;
        case ObjectSize.ExtraLarge:
            value = '1280px';
            break;
    }
    return StyleWidget.unit(value);
});
export const TextSizeCapability = createWidgetCapability('text', ({ payload }) => {
    let value = '16px';
    switch (payload) {
        case ObjectSize.ExtraSmall:
            value = '8px';
            break;
        case ObjectSize.Small:
            value = '12px';
            break;
        case ObjectSize.Large:
            value = '20px';
            break;
        case ObjectSize.ExtraLarge:
            value = '24px';
            break;
    }
    return StyleWidget.unit(value);
});
export const BitSizeCapability = createWidgetCapability('unit', ({ payload }) => `${StyleWidget.unit(payload)}`);
export const SizeCapabilities = createWidgetCapabilities()
    .attach(SurfaceSizeCapability)
    .attach(TextSizeCapability)
    .attach(BitSizeCapability);
