import type { IChildren } from "./children.js";
import type { IPrimitives, IPrimitive, IStringToken, IFunctioningPrimitives } from "./value.js";
import type { IAttributes } from "./attributes.js";
import type { IMeasure } from "./measure.js";
import { ToggleOption, ObjectElevation, Displaying } from "../enums.js";
import { ISignalStack, IUiTarget, TreatmentQueueStatus } from "@protorians/core";
import { IStateStack } from "./state.js";
import { IEngine } from "./engine.js";
import { IStyleDeclaration, IStyleSheet, IStyleSheetDeclarations } from "./style.js";
import { ISpectraElement } from "@protorians/spectra";
export type IWidgetElement<E extends HTMLElement> = ISpectraElement | E;
export interface IGlobalAttributes {
    [K: string]: IPrimitives;
}
export interface IGlobalFunctioningAttributes {
    [K: string]: IFunctioningPrimitives;
}
export interface IRef<E extends HTMLElement, A extends IAttributes> {
    get current(): IWidgetNode<E, A> | undefined;
    attach(widget: IWidgetNode<E, A>): this;
    detach(): void;
}
export type IRefCallable<E extends HTMLElement, A extends IAttributes> = (ref: IRef<E, A>) => void;
export type IPropStack = {
    [K: string]: IPrimitives;
};
export interface IContext<P extends IPropStack, S extends IStateStack> {
    root: IWidgetNode<any, any> | undefined;
    readonly widget: IWidgetNode<any, any>;
    props: P;
    state: S;
    engine: IEngine<any, any> | undefined;
}
export type ICallablePayload<E extends HTMLElement, A extends IAttributes, Payload> = {
    root: IWidgetNode<any, any>;
    widget: IWidgetNode<E, A>;
    payload: Payload;
};
export type ICallable<E extends HTMLElement, A extends IAttributes, Payload> = (payload: ICallablePayload<E, A, Payload>) => TreatmentQueueStatus | any;
export type INativeEventMap = {
    [K in keyof HTMLElementEventMap]: HTMLElementEventMap[K];
};
export type IGlobalEventMap = INativeEventMap;
export type IGlobalEventCallableMap<E extends HTMLElement, A extends IAttributes> = {
    [K in keyof IGlobalEventMap]: ICallable<E, A, IGlobalEventPayload<any>>;
};
export type IGlobalEventPayload<T extends keyof IGlobalEventMap> = {
    type: T;
    event: IGlobalEventMap[T] | Event;
};
export type IChildrenSupported = IPrimitives | IWidgetNode<any, any>;
export type IBehaviorOptions = {
    locked: boolean;
    disabled: boolean;
};
export type IWidgetConstruct<E extends HTMLElement, A extends IAttributes> = (attributes: IWidgetDeclaration<E, A>) => IWidgetNode<E, A> | undefined;
export interface IWidgetCollection {
    [key: string]: <E extends HTMLElement, A extends IAttributes>(attributes: IWidgetDeclaration<E, A>) => IWidgetNode<E, A> | undefined;
}
export interface IWidgetNode<E extends HTMLElement, A extends IAttributes> {
    readonly element: IWidgetElement<E>;
    get isConnected(): boolean;
    get fingerprint(): string;
    get tag(): string;
    get clientElement(): E | undefined;
    get serverElement(): ISpectraElement | undefined;
    get children(): IChildren<IChildrenSupported>;
    get attributes(): A;
    get props(): INativeProperties<E, A>;
    get datasets(): IGlobalAttributes;
    get reference(): IRef<E, A> | undefined;
    get locked(): boolean;
    set locked(value: boolean);
    get signal(): ISignalStack<IWidgetSignalMap<E, A>>;
    get measure(): IMeasure;
    get stylesheet(): IStyleSheet;
    get context(): IContext<any, any> | undefined;
    useContext(context?: IContext<any, any>): this;
    useReference(ref: IRef<E, A>): this;
    construct(callback: ICallable<E, A, undefined>): this;
    clear(): this;
    remove(): this;
    enable(): this;
    disable(): this;
    lock(): this;
    unlock(): this;
    focus(): this;
    blur(): this;
    toggle(options?: ToggleOption): this;
    show(display?: Displaying): this;
    hide(): this;
    elevate(elevation?: ObjectElevation): this;
    mount(callback: ICallable<E, A, IWidgetNode<E, A>>): this;
    unmount(callback: ICallable<E, A, undefined>): this;
    ready(callback: ICallable<E, A, IWidgetNode<E, A>>): this;
    before(callback: ICallable<E, A, undefined>): this;
    after(callback: ICallable<E, A, undefined>): this;
    get(state: string): boolean | undefined;
    set(state: string): this;
    data(dataset: IGlobalAttributes): this;
    attribute(attributes: Partial<A>): this;
    attributeLess(attributes: IGlobalAttributes): this;
    style(declaration: IStyleSheetDeclarations | IStyleSheet): this;
    className(token: IStringToken): this;
    removeClassName(token: IStringToken): this;
    replaceClassName(oldToken: IStringToken, token: IStringToken): this;
    clearClassName(): this;
    value(data: IPrimitive): this;
    html(code: string): this;
    content(children: IChildren<IChildrenSupported>): this;
    listen<T extends keyof IGlobalEventMap>(type: T, callback: ICallable<E, A, IGlobalEventPayload<T>>, options?: boolean | AddEventListenerOptions): this;
    on<T extends keyof IGlobalEventMap>(type: T, callback: ICallable<E, A, IGlobalEventPayload<T>> | null): this;
    detachEvent<T extends keyof IGlobalEventMap>(type: T): this;
    prepend(children: IWidgetNode<any, any> | IUiTarget<any>): this;
    append(children: IWidgetNode<any, any> | IUiTarget<any>): this;
    trigger(type: keyof IGlobalEventMap): this;
    stase(state: boolean): this;
    computedStyle(token: keyof IStyleDeclaration): string | undefined;
    clone(): this;
    callable(callable: IWidgetSideCallableOptions<E>): this;
}
export type IEventListeners<E extends HTMLElement, A extends IAttributes> = {
    [K in keyof IGlobalEventMap]: ICallable<E, A, IGlobalEventPayload<K>>;
};
export interface IWidgetSignalMap<E extends HTMLElement, A extends IAttributes> {
    construct: ICallablePayload<E, A, undefined>;
    mount: ICallablePayload<E, A, IWidgetNode<E, A>>;
    unmount: ICallablePayload<E, A, undefined>;
    focus: ICallablePayload<E, A, undefined>;
    blur: ICallablePayload<E, A, undefined>;
    adopted: ICallablePayload<E, A, IWidgetNode<E, A> | undefined>;
    before: ICallablePayload<E, A, undefined>;
    after: ICallablePayload<E, A, undefined>;
    render: ICallablePayload<E, A, undefined>;
    clear: ICallablePayload<E, A, undefined>;
    child: ICallablePayload<E, A, IChildren<IChildrenSupported>>;
    style: ICallablePayload<E, A, IStyleSheetDeclarations>;
    className: ICallablePayload<E, A, IStringToken>;
    value: ICallablePayload<E, A, IPrimitives>;
    html: ICallablePayload<E, A, string>;
    trigger: ICallablePayload<E, A, IGlobalEventPayload<keyof IGlobalEventMap>>;
    on: ICallablePayload<E, A, IGlobalEventPayload<keyof IGlobalEventMap>>;
    listen: ICallablePayload<E, A, IGlobalEventPayload<keyof IGlobalEventMap>>;
    data: ICallablePayload<E, A, IGlobalAttributes>;
    attribute: ICallablePayload<E, A, Partial<A> | IGlobalAttributes>;
    remove: ICallablePayload<E, A, undefined>;
    enable: ICallablePayload<E, A, undefined>;
    disable: ICallablePayload<E, A, undefined>;
    lock: ICallablePayload<E, A, undefined>;
    unlock: ICallablePayload<E, A, undefined>;
    hide: ICallablePayload<E, A, undefined>;
    show: ICallablePayload<E, A, undefined>;
    toggle: ICallablePayload<E, A, ToggleOption | undefined>;
}
export type ISignalableCallbackMap<E extends HTMLElement, A extends IAttributes> = {
    [K in keyof IWidgetSignalMap<E, A>]: ICallable<E, A, IWidgetSignalMap<E, A>[K]>;
};
export type INativeProperties<E extends HTMLElement, A extends IAttributes> = {
    features?: IGlobalAttributes | IGlobalFunctioningAttributes;
    stase?: boolean;
    signal?: Partial<ISignalableCallbackMap<E, A>>;
    ref?: IRef<E, A>;
    children: IChildren<IChildrenSupported> | undefined;
    style?: IStyleSheetDeclarations | IStyleSheet;
    className?: IStringToken;
    data?: IGlobalAttributes;
    elevate?: ObjectElevation;
    on?: Partial<IGlobalEventCallableMap<E, A>>;
    listen?: Partial<IGlobalEventCallableMap<E, A>>;
};
export type IWidgetDeclaration<E extends HTMLElement, A extends IAttributes> = A & INativeProperties<E, A>;
export type IWidgetDeclarationExploded<D extends IWidgetDeclaration<any, any>, T> = {
    declaration: Omit<D, keyof T>;
    extended: T;
};
export type IAttributesScope<E extends HTMLElement, A extends IAttributes> = A & IWidgetDeclaration<E, A>;
export interface IWidgetSideCallableOptions<E extends HTMLElement> {
    client?: (element: E) => void;
    server?: (element: ISpectraElement) => void;
}
