import type {
    ILayout,
    ILayoutCallable,
    IAttributes,
    ICallablePayload,
    IEncapsulatorConfigs,
    IKit,
    IChildren,
    IKitWidgetCallable,
    IState,
    IEncapsulatorStack,
    IKitCallable,
    IKitSignalMap,
    IWidgetNode,
    IKitOptionsStates, IKitRef, IKitLayoutStructured,
} from "./types/index.js";
import {WidgetException} from "./errors/index.js";
import {createState} from "./state.js";
import {ISignalStack, Signal} from "@protorians/core";


export class Kit<Layout, Options> implements IKit<Layout, Options> {

    // protected static layoutSlugs: string[] = []
    protected _states: IKitOptionsStates<Options> = {} as IKitOptionsStates<Options>
    protected _status: IState<boolean | null> = createState<boolean | null>(false)
    protected _structured: IKitLayoutStructured<Layout> = {} as IKitLayoutStructured<Layout>;


    public signal: ISignalStack<IKitSignalMap<Layout, Options>>;

    static _default_configs: IEncapsulatorConfigs = {
        structures: [],
    }

    static _configs: IEncapsulatorStack = new Map<string, IEncapsulatorConfigs>()

    static _getConfigs() {
        const id = this.name;
        return this._configs.get(id)
    }

    static begin<T extends IKit<any, any>, O>(options?: O): T {
        return (new this(options)) as any
    }

    static callable(callable: IKitCallable): IKitWidgetCallable {
        const kit = this.begin({});
        const options = callable(kit as any);
        return kit.setOptions(options).commit;
    }

    protected initialize(): this {
        Object.entries(this._options || {}).forEach(([key, value]) =>
            this._states[key] = createState(value || undefined)
                .effect((state: any) =>
                    this.signal.dispatch('effect', state)));

        // (this.constructor as typeof Kit<any, any>).layoutSlugs
        //     .forEach(key =>
        //         this._states[key] = createState(this.options[key] || undefined)
        //             .effect((state: any) =>
        //                 this.signal.dispatch('effect', state)))

        this._status.effect((state) => this.signal.dispatch('status', state))
        return this;
    }

    protected push(instance?: any): IKitWidgetCallable {
        const configs = (this.constructor as typeof Kit<any, any>)._getConfigs()

        return <E extends HTMLElement, A extends IAttributes>(context?: ICallablePayload<E, A, undefined>): IChildren<any> => {
            if (!configs?.main)
                throw (new WidgetException('No bootstrapper found')).show()

            instance = instance || this;
            const bootstrapper: IWidgetNode<any, any> = typeof instance[configs.main] === 'function' ? instance[configs.main].apply(instance, [context]) : undefined;
            if (!bootstrapper)
                throw (new WidgetException('The bootstrapper is not a function')).show()

            if (typeof bootstrapper == 'function') {
                return bootstrapper;
            }

            bootstrapper.signal.listen('mount', () => instance.signal.dispatch('mount', context))
            bootstrapper.signal.listen('unmount', () => instance.signal.dispatch('unmount', context))

            this.layouts.widget = bootstrapper;

            return bootstrapper;
        };
    }

    get status(): boolean | null {
        return this._status.value;
    }

    get rollback(): this {
        return (this.constructor as any).begin()
    }

    get commit(): IKitWidgetCallable {
        return this.push(this)
    }

    get states(): IKitOptionsStates<Options> {
        return this._states;
    }

    get options(): Options {
        return this._options;
    }

    get structures(): ILayout<Layout> {
        const configs = (this.constructor as typeof Kit<any, any>)._getConfigs()
        const _static = this.constructor as typeof Kit<Layout, Options>;
        const layouts = {} as ILayout<Layout>;

        if (configs && configs.structures) {
            configs.structures = configs?.structures || [];
            for (const name of configs.structures) {
                const composite = _static[name] || this[name] || undefined;
                if (typeof composite !== 'function') {
                    throw (new WidgetException(`Kit.${name} must be a function.`)).show();
                }
                layouts[name] = composite.bind(this);
            }
        }

        return layouts;
    }

    get layouts(): IKitLayoutStructured<Layout> {
        return this._structured;
    }

    constructor(
        protected _options: Options = {} as Options
    ) {
        this.signal = new Signal.Stack<IKitSignalMap<Layout, Options>>();
        this.initialize();
    }

    exposeLayout<K extends keyof Layout>(key: K, widget: Layout[K]): this {
        this._structured[key as keyof IKitLayoutStructured<Layout>] = (this._structured[key] || widget) as IKitLayoutStructured<Layout>[keyof IKitLayoutStructured<Layout>];
        return this;
    }

    setOptions(options: Options): this {
        this._options = options;

        for (const value of Object.values(this._options || {})) {
            if (value instanceof KitRef) {
                value.bind(this as IKit<any, any>);
            }
        }

        return this.initialize();
    }

    updated(callable: (kit: this) => void): this {
        this.signal.listen('effect', () => callable(this));
        return this;
    }

    mounted(callable: (context: ICallablePayload<any, any, any> | undefined) => void): this {
        this.signal.listen('mount', callable);
        return this;
    }

    unmounted(callable: (context: ICallablePayload<any, any, any> | undefined) => void): this {
        this.signal.listen('unmount', callable);
        return this;
    }

    synchronize(): this {
        return this;
    }

    // synchronizeStates(states: Record<string, IState<any>>): this {
    //     for (const [key, state] of Object.entries(states)) {
    //         if (typeof this._states[key] !== 'undefined') state.effect((current: any) => this._states[key].set(current))
    //         else if (key == 'status') state.effect((current) => this._status.set(current))
    //     }
    //     return this;
    // }

    structure<K extends keyof Layout>(name: K): ILayoutCallable<Layout[K]> {
        const _static = this.constructor as typeof Kit<Layout, Options>;
        if (typeof _static[name as any] !== 'function')
            throw (new WidgetException(`Kit.${name.toString()} must be a function.`)).show();
        return _static[name as any] as ILayoutCallable<Layout[K]>
    }
}


export class KitRef<Layout, Options> implements IKitRef<Layout, Options> {
    protected _current: IKit<Layout, Options> | undefined = undefined;

    get current(): IKit<Layout, Options> | undefined {
        return this._current;
    }

    bind(kit: IKit<Layout, Options>): this {
        this._current = kit;
        return this;
    }
}


export function createKitRef<Layout, Options>() {
    return new KitRef<Layout, Options>();
}