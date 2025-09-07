import type { IAttributes, ICallable, IWidgetCapabilities, IWidgetCapabilitiesMap, IWidgetCapabilitiesScheme, IWidgetCapability, IWidgetNode } from "./types/index.js";
export declare class WidgetCapability<E extends HTMLElement, A extends IAttributes, Payload> implements IWidgetCapability<E, A, Payload> {
    readonly name: string;
    readonly callable: ICallable<E, A, Payload>;
    protected target: IWidgetNode<E, A> | undefined;
    constructor(name: string, callable: ICallable<E, A, Payload>);
    on(widget: IWidgetNode<E, A>): this;
    make<T>(payload: Payload): T | void;
}
export declare function createWidgetCapability<E extends HTMLElement, A extends IAttributes, Payload>(name: string, callable: ICallable<E, A, Payload>): IWidgetCapability<E, A, Payload>;
export declare class Capabilities<C> implements IWidgetCapabilities<C> {
    protected _scheme: Partial<IWidgetCapabilitiesMap<C>>;
    get scheme(): Partial<IWidgetCapabilitiesMap<C>>;
    attach<K extends keyof C>(capability: IWidgetCapability<any, any, C[K]>): this;
    override<K extends keyof C>(capability: IWidgetCapability<any, any, C[K]>): this;
    detach(name: keyof C): this;
    capability<K extends keyof C>(name: K): IWidgetCapability<any, any, C[K]> | undefined;
    has(name: keyof C): boolean;
}
export declare function createWidgetCapabilities<C extends IWidgetCapabilitiesScheme>(): Capabilities<C>;
