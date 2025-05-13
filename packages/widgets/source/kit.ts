import type {
    ILayout,
    ILayoutCallable,
    IAttributes,
    ICallablePayload,
    IEncapsulatorConfigs,
    IKit, IChildren,
    IKitWidgetCallable, ILayoutStates, IState, IEncapsulatorStack, IKitCallable, IKitSignalMap, IWidgetNode
} from "./types/index.js";
import {WidgetException} from "./errors/index.js";
import {createState} from "./state.js";
import {ISignalStack, Signal} from "@protorians/core";


export class Kit<Layout, Options> implements IKit<Layout, Options> {

    protected static layoutSlugs: string[] = []
    protected _states: ILayoutStates<Layout> = {} as ILayoutStates<Layout>
    protected _status: IState<boolean | null> = createState<boolean | null>(false)

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
        (this.constructor as typeof Kit<any, any>).layoutSlugs
            .forEach(key =>
                this._states[key] = createState(this.options[key as any] || undefined)
                    .effect((state: any) =>
                        this.signal.dispatch('effect', state)))

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

    get states(): ILayoutStates<Layout> {
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

    constructor(
        protected _options: Options = {} as Options
    ) {
        this.signal = new Signal.Stack<IKitSignalMap<Layout, Options>>();
        this.initialize();
    }

    setOptions(options: Options): this {
        this._options = options;
        return this.initialize();
    }

    updated(callable: (kit: this) => void): this {
        this.signal.listen('effect', kit => callable(kit as this));
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

    synchronizeStates(states: Record<string, IState<any>>): this {
        for (const [key, state] of Object.entries(states)) {
            if (typeof this._states[key] !== 'undefined') state.effect((current: any) => this._states[key].set(current))
            else if (key == 'status') state.effect((current) => this._status.set(current))
        }
        return this;
    }

    structure<K extends keyof Layout>(name: K): ILayoutCallable<Layout[K]> {
        const _static = this.constructor as typeof Kit<Layout, Options>;
        if (typeof _static[name as any] !== 'function')
            throw (new WidgetException(`Kit.${name.toString()} must be a function.`)).show();
        return _static[name as any] as ILayoutCallable<Layout[K]>
    }
}