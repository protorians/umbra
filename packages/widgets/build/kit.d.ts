import type { ILayout, ILayoutCallable, ICallablePayload, IEncapsulatorConfigs, IKit, IKitWidgetCallable, IState, IEncapsulatorStack, IKitCallable, IKitSignalMap, IKitOptionsStates, IKitRef, IKitLayoutStructured } from "./types/index.js";
import { ISignalStack } from "@protorians/core";
export declare class Kit<Layout, Options> implements IKit<Layout, Options> {
    protected _options: Options;
    protected _states: IKitOptionsStates<Options>;
    protected _status: IState<boolean | null>;
    protected _structured: IKitLayoutStructured<Layout>;
    signal: ISignalStack<IKitSignalMap<Layout, Options>>;
    static _default_configs: IEncapsulatorConfigs;
    static _configs: IEncapsulatorStack;
    static _getConfigs(): IEncapsulatorConfigs | undefined;
    static begin<T extends IKit<any, any>, O>(options?: O): T;
    static callable(callable: IKitCallable): IKitWidgetCallable;
    protected initialize(): this;
    protected push(instance?: any): IKitWidgetCallable;
    get status(): boolean | null;
    get rollback(): this;
    get commit(): IKitWidgetCallable;
    get states(): IKitOptionsStates<Options>;
    get options(): Options;
    get structures(): ILayout<Layout>;
    get layouts(): IKitLayoutStructured<Layout>;
    constructor(_options?: Options);
    exposeLayout<K extends keyof Layout>(key: K, widget: Layout[K]): this;
    setOptions(options: Options): this;
    updated(callable: (kit: this) => void): this;
    mounted(callable: (context: ICallablePayload<any, any, any> | undefined) => void): this;
    unmounted(callable: (context: ICallablePayload<any, any, any> | undefined) => void): this;
    synchronize(): this;
    structure<K extends keyof Layout>(name: K): ILayoutCallable<Layout[K]>;
}
export declare class KitRef<Layout, Options> implements IKitRef<Layout, Options> {
    protected _current: IKit<Layout, Options> | undefined;
    get current(): IKit<Layout, Options> | undefined;
    bind(kit: IKit<Layout, Options>): this;
}
export declare function createKitRef<Layout, Options>(): KitRef<Layout, Options>;
