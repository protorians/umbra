import { EventDispatcher } from "./event-dispatcher.js";
import type { IAppearance, IAppearanceEmitterScheme, IAppearanceObject, IAppearanceObjectDestroyed, IAppearanceStyleSheet, IAppearanceValues } from "../types/index.js";
export declare function CoreAppearanceProps<T extends IAppearanceObject | IAppearanceObjectDestroyed>(name: keyof IAppearanceObject, value: IAppearanceValues): T;
export declare function CoreAppearanceValues(value: IAppearanceValues): string | undefined;
export declare class CoreAppearance implements IAppearance {
    instance: HTMLStyleElement;
    uid: string;
    emitter: EventDispatcher<IAppearanceEmitterScheme>;
    properties: IAppearanceObject;
    constructor();
    sheet(stylesheet: IAppearanceStyleSheet): this;
    inject(code: string | string[]): this;
    insertProperties(properties: IAppearanceObject, data: IAppearanceObject): IAppearanceObject;
    removeProperties(properties: IAppearanceObject, payload: IAppearanceObjectDestroyed): IAppearanceObject;
    set(properties: IAppearanceObject): this;
    unset(properties: IAppearanceObjectDestroyed): this;
    mount(): this;
    mountImmediat(): this;
    destroy(): this;
    sync(): this;
}
