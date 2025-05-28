import type {IAttributes} from "./attributes.js";
import type {IWidgetNode} from "./widget.js";

export type IStateCallable<T> = (value: T) => any

export type IStatePayload<T> = {
    data: T;
}

export type IStateStack = {
    [K: string]: IState<any>
}

export interface IState<T> {
    get value(): T;

    set(payload: Partial<T>): this;

    effect(callable: IStateCallable<T | undefined>): this;

    watch(callable: IStateCallable<T>): IStateWatcher<T>;

    bind<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>): this;

    prune(data?: T): this;

    reset(): this;
}


export interface IStateWatcher<T>{
    readonly state: IState<T>;
    readonly callable: IStateCallable<T>;
}

export type IStateUnwrapped<T> = T extends IState<infer U> ? U : T;

export type IStatelessProps<Props> = {
    [key in keyof Props]: IStateUnwrapped<Props[keyof Props]>
}
