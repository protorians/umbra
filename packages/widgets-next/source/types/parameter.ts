import {ISignalStack} from "@protorians/core";

export type IMultitonParameter = Record<string, unknown>;

export interface IParameterPayload<T> {
    key: keyof T;
    value: T[keyof T];
}

export type IParameterCallable<P> = (payload: P) => void;

export interface IParameterBagMap<T> {
    set: IParameterPayload<T>;
    get: IParameterPayload<T>;
}

export interface IParameterBag<T> {
    readonly signal: ISignalStack<IParameterBagMap<T>>;

    get bag(): T;

    reset(): this;

    clear(): this;

    effect(callable: IParameterCallable<IParameterPayload<T>>): this;

    render<V = unknown>(): V;
}

export interface IStaticParameterBag<T = any> extends IParameterBag<Set<T>> {
    entries(): T[];

    set(value: T): this;

    get(value: T): T | undefined;

    delete(value: T): boolean;

    has(value: T): boolean;

}

export interface IDynamicParameterBag<T = IMultitonParameter> extends IParameterBag<Map<keyof T, T>> {
    entries(): [keyof T, T][];

    set<K extends keyof T>(key: K, value: T): this;

    get<K extends keyof T>(key: K): T | undefined;

    delete<K extends keyof T>(key: K): boolean;

    has<K extends keyof T>(key: K): boolean;
}

