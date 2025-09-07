import type { IAttributes, IState, IStateCallable, IStatePayload, IStateWatcher, IWidgetNode } from "../types/index.js";
import { type ISignalController } from "@protorians/core";
export declare class StateWidget<T> implements IState<T> {
    protected readonly initial: T;
    protected controller: ISignalController<IStatePayload<T>>;
    protected payload: IStatePayload<T>;
    constructor(initial: T);
    get value(): T;
    set(value: T): this;
    reset(): this;
    effect(callable: IStateCallable<T>): this;
    watch(callable: IStateCallable<T>): IStateWatcher<T>;
    bind<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>): this;
    prune(data?: T): this;
    static prune<D>(data?: D): typeof this;
}
export declare function appendState(widget: IWidgetNode<any, any>, marker: Text | HTMLElement, value: any): void;
export declare class StateWidgetWatcher<T> {
    readonly state: IState<T>;
    readonly callable: IStateCallable<T>;
    constructor(state: IState<T>, callable: IStateCallable<T>);
    bind<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>): this;
}
