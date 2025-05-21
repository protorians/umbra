import type {IChildren} from "./children.js";
import type {IPrimitives, IPrimitive, IStringToken, IFunctioningPrimitives} from "./value.js";
import type {IAttributes} from "./attributes.js";
import type {IMeasure} from "./measure.js";
import {ToggleOption, ObjectElevation, Displaying} from "../enums.js";
import {ISignalStack, IUiTarget, TreatmentQueueStatus} from "@protorians/core";
import {IStateStack} from "./state.js";
import {IEngine} from "./engine.js";
import {IStyleDeclaration, IStyleSheet, IStyleSheetDeclarations} from "./style.js";
import {ISpectraElement} from "@protorians/spectra";

export type IWidgetElement<E extends HTMLElement> = ISpectraElement | E

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

export type IRefCallable<E extends HTMLElement, A extends IAttributes> = (ref: IRef<E, A>) => void

// export type IContextWidgets = {
//   [K: string]: IWidget<any, any>
// }

// export type IOldContext<E extends HTMLElement, A extends IAttributes, Payload> = {
//   component: IWidget<E, A>;
//   event: Event | undefined;
//   payload?: Payload;
// }


export type IPropStack = {
    [K: string]: IPrimitives
}

// export type IContextStore<T extends Object> = ISignalController<T>

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
}

export type ICallable<E extends HTMLElement, A extends IAttributes, Payload> = (payload: ICallablePayload<E, A, Payload>) => TreatmentQueueStatus | any;

// export type IEventMap = {
//   create: CustomEvent;
//   clear: CustomEvent;
//   unmount: CustomEvent;
//   mount: CustomEvent;
//   before: CustomEvent;
//   after: CustomEvent;
//   remove: CustomEvent;
//   enable: CustomEvent;
//   disable: CustomEvent;
//   lock: CustomEvent;
//   unlock: CustomEvent;
//   trigger: CustomEvent;
//   hide: CustomEvent;
//   show: CustomEvent;
//   data: CustomEvent;
//   style: CustomEvent;
//   className: CustomEvent;
//   value: CustomEvent;
//   html: CustomEvent;
// }

export type INativeEventMap = {
    [K in keyof HTMLElementEventMap]: HTMLElementEventMap[K]
}

export type IGlobalEventMap = INativeEventMap;

export type IGlobalEventCallableMap<E extends HTMLElement, A extends IAttributes> = {
    [K in keyof IGlobalEventMap]: ICallable<E, A, IGlobalEventPayload<any>>
};

export type IGlobalEventPayload<T extends keyof IGlobalEventMap> = {
    type: T;
    event: IGlobalEventMap[T] | Event;
};

export type IChildrenSupported = IPrimitives | IWidgetNode<any, any>

export type IBehaviorOptions = {
    locked: boolean;
    disabled: boolean;
}

// export type ISelfEvents<E extends HTMLElement, A extends IAttributes> = {
//   mount: ICallable<E, A, undefined>[];
//   unmount: ICallable<undefined>[];
//   before: ICallable<undefined>[];
//   after: ICallable<undefined>[];
// }

export type IWidgetConstruct<E extends HTMLElement, A extends IAttributes> = (attributes: IWidgetDeclaration<E, A>) => IWidgetNode<E, A> | undefined;

export interface IWidgetCollection {
    [key: string]: <E extends HTMLElement, A extends IAttributes>(attributes: IWidgetDeclaration<E, A>) => IWidgetNode<E, A> | undefined;
}

export interface IWidgetNode<E extends HTMLElement, A extends IAttributes> {

    readonly element: IWidgetElement<E>;

    get fingerprint(): string;

    get tag(): string;

    // get mockup(): IMockup<E, A> | undefined;

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

    get context(): IContext<any, any> | undefined

    useContext(context?: IContext<any, any>): this;

    construct(callback: ICallable<E, A, undefined>): this;

    clear(): this;

    remove(): this;

    enable(): this;

    disable(): this;

    lock(): this;

    unlock(): this;

    toggle(options?: ToggleOption): this;

    show(display?: Displaying): this;

    hide(): this;

    elevate(elevation?: ObjectElevation): this;

    // replaceWith(component: IWidget<any, any>): this;

    // insert(component: IWidget<any, any>, position?: InsertionPosition): this;

    mount(callback: ICallable<E, A, IWidgetNode<E, A>>): this;

    unmount(callback: ICallable<E, A, undefined>): this;

    ready(callback: ICallable<E, A, IWidgetNode<E, A>>): this;

    before(callback: ICallable<E, A, undefined>): this;

    after(callback: ICallable<E, A, undefined>): this;

    // synchronize(component: IWidget<any, any>, type: keyof IGlobalEventMap, callback: ICallable<W, A, undefined>): this;

    // behavior(options: IBehaviorOptions): this;

    data(dataset: IGlobalAttributes): this;

    attribute(attributes: Partial<A>): this;

    attributeLess(attributes: IGlobalAttributes): this;

    // nsa(nsa: IGlobalAttributes, ns?: string, separator?: string): this;

    style(declaration: IStyleSheetDeclarations): this;

    // style(declaration: Partial<IStyleDeclaration>): this;

    className(token: IStringToken): this;

    removeClassName(token: IStringToken): this;

    replaceClassName(oldToken: IStringToken, token: IStringToken): this;

    clearClassName(): this;

    value(data: IPrimitive): this;

    html(code: string): this;

    content(children: IChildren<IChildrenSupported>): this;

    listen<T extends keyof IGlobalEventMap>(type: T, callback: ICallable<E, A, IGlobalEventPayload<T>>, options?: boolean | AddEventListenerOptions): this;

    on<T extends keyof IGlobalEventMap>(type: T, callback: ICallable<E, A, IGlobalEventPayload<T>> | null): this;

    append(children: IWidgetNode<any, any> | IUiTarget<any>): this;

    trigger(type: keyof IGlobalEventMap): this;

    stase(state: boolean): this;

    computedStyle(token: keyof IStyleDeclaration): string | undefined;

    // render(): this;
}


export type IEventListeners<E extends HTMLElement, A extends IAttributes> = {
    [K in keyof IGlobalEventMap]: ICallable<E, A, IGlobalEventPayload<K>>;
}


/**
 * Widget Signal Map
 */
export interface IWidgetSignalMap<E extends HTMLElement, A extends IAttributes> {

    construct: ICallablePayload<E, A, undefined>;

    mount: ICallablePayload<E, A, IWidgetNode<E, A>>;

    unmount: ICallablePayload<E, A, undefined>;

    adopted: ICallablePayload<E, A, IWidgetNode<E, A> | undefined>;

    before: ICallablePayload<E, A, undefined>;

    after: ICallablePayload<E, A, undefined>;

    render: ICallablePayload<E, A, undefined>;

    clear: ICallablePayload<E, A, undefined>;

    child: ICallablePayload<E, A, IChildren<IChildrenSupported>>;

    style: ICallablePayload<E, A, IStyleSheetDeclarations>;
    // style: ICallablePayload<E, A, IStyleDeclaration>;

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
    [K in keyof IWidgetSignalMap<E, A>]: ICallable<E, A, IWidgetSignalMap<E, A>[K]>
}

/**
 * Widget Primitive Props
 */
export type INativeProperties<E extends HTMLElement, A extends IAttributes> = {

    /**
     * Features : The features to be consumed by the component's static `featuring` method
     */
    features?: IGlobalAttributes | IGlobalFunctioningAttributes;

    /**
     * Put Widget in stase
     */
    stase?: boolean;

    /**
     * Signals : Listen events
     */
    signal?: Partial<ISignalableCallbackMap<E, A>>

    /**
     * Store component's instance
     */
    ref?: IRef<E, A>

    /**
     * Widget Children
     */
    children: IChildren<IChildrenSupported> | undefined;

    /**
     * Make component's style
     */
    style?: IStyleSheetDeclarations | IStyleSheet;

    /**
     * Make component's CSS class name
     */
    className?: IStringToken;

    /**
     * Widget's dataset
     */
    data?: IGlobalAttributes;

    /**
     * ZIndex Elevation
     */
    elevate?: ObjectElevation;

    // /**
    //  * Namespace Attributes
    //  */
    // nsa?: IGlobalAttributes;

    /**
     * Element Events
     */
    on?: Partial<IGlobalEventCallableMap<E, A>>;

    /**
     * Events listeners
     */
    listen?: Partial<IGlobalEventCallableMap<E, A>>;

}

/**
 * Widget Primitive Props
 */
export type IWidgetDeclaration<E extends HTMLElement, A extends IAttributes> = A & INativeProperties<E, A>

export type IWidgetDeclarationExploded<D extends IWidgetDeclaration<any, any>, T> = {
    declaration: D;
    extended: T;
}


/**
 * Widget Extensible Props
 */
// export type IPropsExtensible<W extends HTMLElement, A extends IAttributes> = {
//   [K in keyof A]: A[keyof A] | ICallable<W, A, undefined>
// }

/**
 * Widget Attribute Scope
 */
export type IAttributesScope<E extends HTMLElement, A extends IAttributes> =
    A
    // & IPropsExtensible<E, A>
    & IWidgetDeclaration<E, A>;
