import type {ILayout, ILayoutCallable, ILayoutStates} from "./layout.js";
import type {ICallablePayload} from "./widget.js";
import type {IChildren} from "./children.js";
import type {IAttributes} from "./attributes.js";
import {ISignalStack} from "@protorians/core";
import {IState} from "./state.js";


export type IKitCallable = (kit: any) => any;

export interface IKit<Layout, Options> {
    signal: ISignalStack<IKitSignalMap<Layout, Options>>;

    get options(): Options;

    get commit(): IKitWidgetCallable;

    get structures(): ILayout<Layout>;

    get rollback(): this;

    get status(): boolean | null;

    get states(): ILayoutStates<Layout>;

    setOptions(options: Options): this;

    updated(callable: (kit: this) => void): this;

    mounted(callable: (context: ICallablePayload<any, any, any> | undefined) => void): this;

    unmounted(callable: (context: ICallablePayload<any, any, any> | undefined) => void): this;

    synchronizeStates(states: Record<string, IState<any>>): this;

    structure<K extends keyof Layout>(name: K): ILayoutCallable<Layout[K]>;
}

export type IKitWidgetCallable = (context?: ICallablePayload<any, any, any>) => IChildren<any>

export type IKitWidgetStrictCallable<E extends HTMLElement, A extends IAttributes, P, C> = (context?: ICallablePayload<E, A, P>) => IChildren<C>

export interface IKitSignalMap<Layout, Options> {
    status: boolean | null | undefined;
    effect: IKit<Layout, Options>;
    mount: ICallablePayload<any, any, any> | undefined;
    unmount: ICallablePayload<any, any, any> | undefined;
}

