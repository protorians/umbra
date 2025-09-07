import { TreatmentQueueStatus } from "../supports/index.js";
export type ISignalControllerCallablePayload<I extends Object> = {
    target: I;
    name: string | symbol;
    value: any;
    receiver: any;
};
export type ISignalControllerCallable<I extends Object> = (props: ISignalControllerCallablePayload<I>) => void;
export interface ISignalController<I extends Object> {
    readonly original: I;
    get current(): I;
    update(target: I): this;
    reset(target: I): I;
    assign<K extends keyof I>(key: K, value: I[K]): this;
    effect(callable: ISignalControllerCallable<I>): this;
    trigger<K extends keyof I>(name: K, value: I[K]): this;
    compute(): I;
    parse(target: I, name: string | symbol, value: any, receiver: any): this;
}
export type ISignalStackCallable<P> = (payload: P) => any | TreatmentQueueStatus;
export type ISignalStackOptions = {
    key?: string | number;
    index?: number;
    cancellable?: boolean;
};
export type ISignalStackEntry<M, T extends keyof M> = {
    type: T;
    callable: ISignalStackCallable<M[T]>;
    options?: ISignalStackOptions;
};
export type ISignalStackEntries<M> = {
    [K in keyof M]: ISignalStackEntry<M, keyof M>[];
};
export interface ISignalStack<M> {
    get entities(): ISignalStackEntries<M>;
    listen<T extends keyof M>(type: T, callable: ISignalStackCallable<M[T]>, options?: ISignalStackOptions): this;
    dispatch<T extends keyof M>(type: T, payload: M[T], embarked?: any): this;
    computed<T>(type: keyof M): T | undefined;
    remove<T extends keyof M>(type: T, index: number): this;
    removeStack<T extends keyof M>(type: T): this;
    removeStacks(types: (keyof M)[]): this;
    removeCallable<T extends keyof M>(callable: ISignalStackCallable<M[T]>, type?: T): this;
    clear(): void;
}
