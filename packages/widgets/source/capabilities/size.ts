import {createWidgetCapabilities, createWidgetCapability} from "../capability.js";
import type {IAttributes, ISizeCapabilityScheme} from "../types/index.js";
import {ObjectSize} from "../enums.js";
import {StyleWidget} from "../style.js";



export const SurfaceSizeCapability = createWidgetCapability<HTMLElement, IAttributes, string>(
  'surface',
  ({payload}): string => {
    let value: string = '960px';
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
    return StyleWidget.unit(value)
  }
)

export const TextSizeCapability = createWidgetCapability<HTMLElement, IAttributes, string>(
  'text',
  ({payload}) => {
    let value: string = '16px';
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
    return StyleWidget.unit(value)
  }
)

export const BitSizeCapability = createWidgetCapability<HTMLElement, IAttributes, number>(
  'unit',
  ({payload}) => `${StyleWidget.unit(payload)}`
)

export const SizeCapabilities = createWidgetCapabilities<ISizeCapabilityScheme>()
  .attach<'surface'>(SurfaceSizeCapability)
  .attach<'text'>(TextSizeCapability)
  .attach<'unit'>(BitSizeCapability)