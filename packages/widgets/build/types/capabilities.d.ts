import type { IWidgetCapability } from "./capability.js";
export type IWidgetCapabilitiesScheme = {
    [K: string]: any;
};
export type IWidgetCapabilitiesMap<C> = {
    [K in keyof C]: IWidgetCapability<any, any, any>;
};
export interface IWidgetCapabilities<C> {
    get scheme(): Partial<IWidgetCapabilitiesMap<C>>;
    attach<K extends keyof C>(capability: IWidgetCapability<any, any, C[K]>): this;
    override<K extends keyof C>(capability: IWidgetCapability<any, any, C[K]>): this;
    detach(name: keyof C): this;
    capability<K extends keyof C>(name: K): IWidgetCapability<any, any, C[K]> | undefined;
    has(name: keyof C): boolean;
}
