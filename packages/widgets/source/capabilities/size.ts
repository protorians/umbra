import {createCapabilities, createCapability} from "../capability.js";
import type {IAttributes, ISizeCapabilityScheme} from "../types/index.js";
import {Sizer} from "../enums.js";
import {StyleWidget} from "../style.js";



export const SurfaceSizeCapability = createCapability<HTMLElement, IAttributes, string>(
  'surface',
  ({payload}) => {
    let value: string = '960px';
    switch (payload) {
      case Sizer.XS:
        value = '320px';
        break;
      case Sizer.S:
        value = '768px';
        break;
      case Sizer.L:
        value = '1024px';
        break;
      case Sizer.XL:
        value = '1280px';
        break;
    }
    return StyleWidget.unit(value)
  }
)

export const TextSizeCapability = createCapability<HTMLElement, IAttributes, string>(
  'text',
  ({payload}) => {
    let value: string = '16px';
    switch (payload) {
      case Sizer.XS:
        value = '8px';
        break;
      case Sizer.S:
        value = '12px';
        break;
      case Sizer.L:
        value = '20px';
        break;
      case Sizer.XL:
        value = '24px';
        break;
    }
    return StyleWidget.unit(value)
  }
)

export const BitSizeCapability = createCapability<HTMLElement, IAttributes, number>(
  'unit',
  ({payload}) => `${StyleWidget.unit(payload)}`
)

export const SizeCapabilities = createCapabilities<ISizeCapabilityScheme>()
  .attach<'surface'>(SurfaceSizeCapability)
  .attach<'text'>(TextSizeCapability)
  .attach<'unit'>(BitSizeCapability)