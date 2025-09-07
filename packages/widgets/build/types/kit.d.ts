import type { ILayout, ILayoutCallable } from "./layout.js";
import type { ICallablePayload, IWidgetNode } from "./widget.js";
import type { IChildren } from "./children.js";
import { ISignalStack } from "@protorians/core";
import { IState } from "./state.js";
export type IKitCallable = (kit: any) => any;
export type IKitLayoutStructured<Layout> = Layout & {
    widget: IWidgetNode<any, any>;
};
export interface IKit<Layout, Options> {
    signal: ISignalStack<IKitSignalMap<Layout, Options>>;
    get options(): Options;
    get commit(): IKitWidgetCallable;
    get structures(): ILayout<Layout>;
    get layouts(): IKitLayoutStructured<Layout>;
    get rollback(): this;
    get status(): boolean | null;
    get states(): IKitOptionsStates<Options>;
    exposeLayout<K extends keyof Layout>(key: K, widget: Layout[K]): this;
    setOptions(options: Options): this;
    updated(callable: (kit: this) => void): this;
    mounted(callable: (context: ICallablePayload<any, any, any> | undefined) => void): this;
    unmounted(callable: (context: ICallablePayload<any, any, any> | undefined) => void): this;
    synchronize(): this;
    structure<K extends keyof Layout>(name: K): ILayoutCallable<Layout[K]>;
}
export type IKitWidgetCallable = (context?: ICallablePayload<any, any, any>) => IChildren<any>;
export interface IKitSignalMap<Layout, Options> {
    status: boolean | null | undefined;
    effect: IKit<Layout, Options>;
    mount: ICallablePayload<any, any, any> | undefined;
    unmount: ICallablePayload<any, any, any> | undefined;
}
export type IKitOptionsStates<T> = {
    [K in keyof T]: IState<T[K] | undefined>;
};
export interface IKitRef<Layout, Options> {
    get current(): IKit<Layout, Options> | undefined;
    bind(kit: IKit<Layout, Options>): this;
}
