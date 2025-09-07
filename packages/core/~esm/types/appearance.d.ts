import type { IEventDispatcher } from "./event.js";
export interface IAppearanceEmitterScheme {
    ready: IAppearance;
    insertProperties: IAppearanceObject;
    removeProperties: IAppearanceObjectDestroyed;
    set: IAppearanceObject;
    unset: IAppearanceObjectDestroyed;
    mount: IAppearance;
    sync: IAppearance;
    destroy: undefined;
}
export type IAppearanceValues = string | number | undefined;
export interface IAppearanceCSSDeclaration extends Partial<CSSStyleDeclaration> {
    paddingVertical?: IAppearanceValues;
    paddingHorizontal?: IAppearanceValues;
    marginVertical?: IAppearanceValues;
    marginHorizontal?: IAppearanceValues;
}
export type IAppearanceObjectExtended = {
    backdropFilter?: string;
};
export type IAppearanceObject = IAppearanceObjectExtended & {
    [K in keyof Partial<IAppearanceCSSDeclaration>]: IAppearanceValues;
};
export interface IAppearanceStyleSheet {
    [Selector: string]: IAppearanceObject;
}
export type IAppearanceObjectDestroyed = Array<keyof IAppearanceObject>;
export interface IAppearance {
    instance: HTMLStyleElement;
    uid: string;
    properties: IAppearanceObject;
    emitter: IEventDispatcher<IAppearanceEmitterScheme>;
    inject(code: string | string[]): this;
    insertProperties(properties: IAppearanceObject, data: IAppearanceObject): IAppearanceObject;
    removeProperties(properties: IAppearanceObject, payload: IAppearanceObjectDestroyed): IAppearanceObject;
    sheet(stylesheet: IAppearanceStyleSheet): this;
    set(payload: IAppearanceObject): this;
    unset(payload: IAppearanceObjectDestroyed): this;
    mount(): this;
    mountImmediat(): this;
    sync(): this;
    destroy(): this;
}
