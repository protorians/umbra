import type {
    IAttributes,
    ICallable,
    IChildren,
    IChildrenSupported,
    IContext,
    IEngine,
    IGlobalAttributes,
    IGlobalEventMap,
    IGlobalEventPayload,
    IMockupMeasure,
    INativeProperties,
    IPrimitive,
    IPropStack,
    IRef,
    IStateStack,
    IStringToken,
    IStyleDeclaration,
    IStyleSheet,
    IStyleSheetDeclarations,
    IWidgetDeclaration,
    IWidgetElement,
    IWidgetNode,
    IWidgetSignalMap,
} from "./types/index.js";
import {
    Environment,
    type ISignalStack,
    IUiTarget,
    MetricRandom,
    Signal,
    TreatmentQueueStatus,
    camelCase
} from "@protorians/core";
import {ToggleOption, WidgetElevation, WidgetsNativeProperty} from "./enums.js";
import {Widgets} from "./widgets.js";
import {StyleWidget} from "./style.js";
import {ISpectraElement, SpectraElement} from "@protorians/spectra";


export const WidgetNativeProperties = Object.values(WidgetsNativeProperty)

export class ContextWidget<P extends IPropStack, S extends IStateStack> implements IContext<P, S> {

    public root: IWidgetNode<any, any> | undefined;
    public props: P
    public state: S
    public engine: IEngine<any, any> | undefined

    constructor(
        public readonly widget: IWidgetNode<any, any>,
        props?: P,
        state?: S,
    ) {
        this.props = props || {} as P
        this.state = state || {} as S
    }

}

export class WidgetNode<E extends HTMLElement, A extends IAttributes> implements IWidgetNode<E, A> {

    readonly element: IWidgetElement<E>;
    protected _fingerprint: string;

    // protected _mockup: IMockup<E, A>;
    protected _reference: IRef<E, A> | undefined;
    protected _tag: string = 'div';
    protected _attributes: A = {} as A;
    protected _props: INativeProperties<E, A> = {} as INativeProperties<E, A>;
    protected _signal: ISignalStack<IWidgetSignalMap<E, A>>;
    protected _locked: boolean = false;
    protected _context: IContext<any, any> | undefined = undefined;
    protected _stylesheet: IStyleSheet | undefined = undefined;
    protected _mounted: boolean = false;

    constructor(declaration: IWidgetDeclaration<E, A>) {
        this.extractProperties(declaration);
        this.element = Environment.Client
            ? document.createElement(this.tag) as E
            : new SpectraElement(this.tag)
        this._fingerprint = `${MetricRandom.CreateAlpha(6).join('')}-${MetricRandom.Create(10).join('')}`;
        this._signal = new Signal.Stack;
    }

    static get style(): IStyleSheetDeclarations | undefined {
        return undefined;
    }

    static get attributes(): IAttributes | undefined {
        return undefined;
    }

    static get children(): IWidgetNode<any, any> | undefined {
        return undefined
    }

    static mount<E extends HTMLElement, A extends IAttributes>(
        widget: IWidgetNode<E, A>
    ): IWidgetNode<E, A> | void | undefined {
        return widget
    }

    static unmount<E extends HTMLElement, A extends IAttributes>(
        widget: IWidgetNode<E, A>
    ): IWidgetNode<E, A> | void | undefined {
        return widget
    }

    get tag(): string {
        return this._tag;
    }

    get fingerprint(): string {
        return this._fingerprint;
    }

    get clientElement(): E | undefined {
        return Environment.Client ? this.element as E || undefined : undefined;
    }

    get serverElement(): ISpectraElement | undefined {
        return Environment.Client ? undefined : (this.element as ISpectraElement) || undefined;
    }

    get children(): IChildren<IChildrenSupported> {
        return this._props.children;
    }

    get attributes(): A {
        return this._attributes;
    }

    get props(): INativeProperties<E, A> {
        return this._props;
    }

    get datasets(): IGlobalAttributes {
        const dataset = {}
        const entries = Environment.Client
            ? Object.entries(this.clientElement?.dataset || {})
            : [...this.serverElement?.blueprint.attributes.entries() || []]
                .filter(x => x.toString().startsWith('data-'))

        for (const [key, value] of entries) dataset[camelCase(key)] = value;

        return dataset;
    }

    get reference(): IRef<E, A> | undefined {
        return this._reference || undefined;
    }

    get locked(): boolean {
        return this._locked
    }

    set locked(value: boolean) {
        this._locked = value;
        if (this._locked) this.lock()
        else this.unlock();
    }

    get signal(): ISignalStack<IWidgetSignalMap<E, A>> {
        return this._signal;
    }

    get measure(): IMockupMeasure {
        return {
            x: 0,
            y: 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0,
            ...Environment.Client ? this.clientElement?.getBoundingClientRect() : {},
        }
    }

    get stylesheet(): IStyleSheet {
        this._stylesheet = this._stylesheet || (new StyleWidget()).bind(this);
        return this._stylesheet;
    }

    get context(): IContext<any, any> | undefined {
        return this._context;
    }

    useContext(context?: IContext<any, any>): this {
        this._context = context;
        // this._context = this._context || context;
        return this;
    }

    construct(callback: ICallable<E, A, undefined>): this {
        this._signal.listen('construct', callback);
        return this;
    }

    mount(callback: ICallable<E, A, IWidgetNode<E, A>>): this {
        this._signal.listen('mount', payload => {
            if (!this._mounted) {
                this._mounted = true;
                return callback(payload);
            }
        });
        return this;
    }

    unmount(callback: ICallable<E, A, undefined>): this {
        this._signal.listen('unmount', payload => {
            if (this._mounted) {
                this._mounted = false;
                return callback(payload);
            }
        });
        return this;
    }

    before(callback: ICallable<E, A, undefined>): this {
        this._signal.listen('before', callback);
        return this;
    }

    after(callback: ICallable<E, A, undefined>): this {
        this._signal.listen('after', callback);
        return this;
    }

    // protected recursiveClear() {
    //     this._props.children = (Array.isArray(this._props.children) ? this._props.children : [this._props.children])
    //         .map(child => {
    //             if (child instanceof WidgetNode) {
    //                 child.clear()
    //             }
    //             return undefined;
    //         }).filter(v => v !== undefined)
    //
    // }

    clear(): this {
        if (this._context) {
            this._context?.engine?.clear(this);
        }
        if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.clear(this);
            return TreatmentQueueStatus.SnapOut;
        });
        return this;
    }

    remove(): this {
        if (this._context) this._context?.engine?.remove(this);
        if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.remove(this);
            return TreatmentQueueStatus.SnapOut;
        });
        return this;
    }

    enable(): this {
        if (this._context) this._context.engine?.enable(this);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.enable(this);
            return TreatmentQueueStatus.SnapOut;
        });
        return this;
    }

    disable(): this {
        if (this._context) this._context.engine?.disable(this);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.disable(this);
            return TreatmentQueueStatus.SnapOut;
        });
        return this;
    }

    lock(): this {
        if (this._context) this._context.engine?.lock(this);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.lock(this);
            return TreatmentQueueStatus.SnapOut;
        });
        return this;
    }

    unlock(): this {
        if (this._context) this._context.engine?.unlock(this);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.unlock(this);
            return TreatmentQueueStatus.SnapOut;
        });
        return this;
    }

    trigger(type: keyof IGlobalEventMap): this {
        if (this._context) this._context.engine?.trigger(this, type);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.trigger(this, type);
            return TreatmentQueueStatus.SnapOut;
        });
        return this;
    }

    stase(state: boolean): this {
        if (this._context) this._context.engine?.stase(this, state);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.stase(this, state);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    computedStyle(token: keyof IStyleDeclaration): string | undefined {
        return this.context?.engine?.computedStyle(this, token);
    }

    hide(): this {
        if (this._context) this._context.engine?.hide(this);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.hide(this);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    show(): this {
        if (this._context) this._context.engine?.show(this);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.show(this);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    toggle(option?: ToggleOption): this {
        if (this._context) this._context.engine?.toggle(this, option);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.toggle(this, option);
            return TreatmentQueueStatus.SnapOut;
        })
        return this
    }

    elevate(elevation?: WidgetElevation): this {
        this
            .stylesheet
            .merge({zIndex: elevation?.toString() || WidgetElevation.None})
            .sync()
        return this;
    }

    data(dataset: IGlobalAttributes): this {
        if (this._context) this._context.engine?.data(this, dataset);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.data(this, dataset);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    attribute(attributes: Partial<A>): this {
        if (this._context) this._context.engine?.attribute(this, attributes);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.attribute(this, attributes);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    attributeLess(attributes: IGlobalAttributes): this {
        if (this._context) this._context.engine?.attributeLess(this, attributes);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.attributeLess(this, attributes);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    style(declaration: IStyleSheetDeclarations): this {
        if (this._context) this._context.engine?.style(this, declaration);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.style(this, declaration);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    className(token: IStringToken): this {
        if (this._context) this._context.engine?.className(this, token);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.className(this, token);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    value(data: IPrimitive): this {
        if (this._context) this._context.engine?.value(this, data);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.value(this, data);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    html(code: string): this {
        if (this._context) this._context.engine?.html(this, code);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.html(this, code);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    content(children: IChildren<IChildrenSupported>): this {
        if (this._context) this._context.engine?.content(this, children);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.content(this, children);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    listen<T extends keyof IGlobalEventMap>(
        type: T,
        callback: ICallable<E, A, IGlobalEventPayload<T>>,
        options: boolean | AddEventListenerOptions = false,
    ): this {
        if (this._context) this._context.engine?.listen(this, type, callback, options);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.listen(this, type, callback, options);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    on<T extends keyof IGlobalEventMap>(type: T, callback: ICallable<E, A, IGlobalEventPayload<T>> | null): this {
        if (this._context) this._context.engine?.on(this, type, callback);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.on(this, type, callback);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    append(children: IWidgetNode<any, any> | IUiTarget<any>): this {
        if(Environment.Client) {
            if (Array.isArray(children))
                children.forEach(child => this.clientElement?.append(child))

            else if (children instanceof WidgetNode) {
                this.clientElement?.append(children.element)
                children.useContext(this._context)
            }
        }
        return this;
    }

    protected extractProperties(properties: IWidgetDeclaration<E, A>): this {
        properties = properties || this._props || {};

        const _attributes = {} as A;
        const _props: INativeProperties<E, A> = {} as INativeProperties<E, A>;

        properties.children = properties.children || (this.constructor as typeof WidgetNode<E, A>).children;

        Object.keys(properties)
            .forEach((key) => {
                if (!(WidgetNativeProperties as string[]).includes(key)) _attributes[key] = properties[key];
                else _props[key] = properties[key];
            })

        this._attributes = {...((this.constructor as typeof WidgetNode<E, A>).attributes || {}), ..._attributes};
        this._props = _props;
        return this;
    }

}

export function WidgetBuilder<E extends HTMLElement, A extends IAttributes, P extends IPropStack, S extends IStateStack>(
    widget: IWidgetNode<E, A>,
    context: IContext<P, S>,
): string | E | undefined {
    const engine = ((Environment.Client) ? Widgets.Engine.client(widget) : Widgets.Engine.server(widget));
    context.engine = engine;
    return engine.render<P, S>(widget, context);
}