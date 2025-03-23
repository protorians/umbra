export type IPrimitive = string | number | boolean | null | undefined | Symbol | BigInt;

export type IFunctioningPrimitives = IPrimitive | Function;

export type IPrimitives = IPrimitive | object;

export type IPrimitivePayload = IPrimitive | IPrimitive[] | Promise<IPrimitive | IPrimitive[]>;

export type IPrimitivesPayload = IPrimitives | IPrimitives[] | Promise<IPrimitives | IPrimitives[]>;

export type IStringToken = string | string[];


export type QuadrilateralArray<T> = [T, T, T, T] | [T, T, T] | [T, T] | [T]
export type IQuadrilateralKey = 'top' | 'bottom' | 'left' | 'right'
export type IQuadrilateral<T> = {
  [K in IQuadrilateralKey]?: T
}

// export type ISupportableValue = IParameterValue | IWidget<IAttributes, IWidgetElements>

export type IOnOff = 'on' | 'off';

export type IYesNo = 'yes' | 'no';

export type IBoolean = 'true' | 'false';

export type IUndefined = 'undefined';

export type ISorting = "ascending" | "descending" | "none" | "other";

export type ILoading = 'eager' | 'lazy';

export type ISandbox =
  'allow-forms'
  | 'allow-pointer-lock'
  | 'allow-popups'
  | 'allow-same-origin'
  | 'allow-scripts'
  | 'allow-top-navigation';

export type ICrossOrigin = 'anonymous' | 'use-credentials';

export type ILinkRel = 'alternate'
  | 'author'
  | 'dns-prefetch'
  | 'help'
  | 'icon'
  | 'license'
  | 'next'
  | 'pingback'
  | 'preconnect'
  | 'prefetch'
  | 'preload'
  | 'prerender'
  | 'prev'
  | 'search'
  | 'stylesheet';

export type IReferrerPolicy = 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'origin'
  | ' origin-when-cross-origin'
  | 'unsafe-url';

export type ITarget =
  '_blank'
  | '_self'
  | '_parent'
  | '_top'
  | string;


export type IFormRelationship = 'external'
  | 'license'
  | 'next'
  | 'nofollow'
  | 'noopener'
  | 'noreferrer'
  | 'opener'
  | 'prev'
  | 'search'
  | 'help';