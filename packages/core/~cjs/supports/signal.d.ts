import { ISignalController, ISignalControllerCallable, ISignalStack, ISignalStackCallable, ISignalStackEntries, ISignalStackOptions } from "../types/index.js";
export declare namespace Signal {
    class Controller<I extends object> implements ISignalController<I> {
        readonly original: I;
        protected effects: ISignalControllerCallable<any>[];
        constructor(original: I);
        protected _current: I;
        get current(): I;
        update(target: I): this;
        reset(original: I): I;
        assign<K extends keyof I>(key: K, value: I[K]): this;
        effect(callable: ISignalControllerCallable<I>): this;
        trigger<K extends keyof I>(name: K, value: I[K]): this;
        compute(): I;
        parse(target: I, name: string | symbol, value: any, receiver: any): this;
    }
    class Stack<M> implements ISignalStack<M> {
        protected _entries: ISignalStackEntries<M>;
        protected _computed: Record<keyof M, any>;
        get entities(): ISignalStackEntries<M>;
        listen<T extends keyof M>(type: T, callable: ISignalStackCallable<M[T]>, options?: ISignalStackOptions): this;
        dispatch<T extends keyof M>(type: T, payload: M[T], embarked?: any): this;
        computed<T>(type: keyof M): T | undefined;
        remove<T extends keyof M>(type: T, index: number): this;
        removeStack<T extends keyof M>(type: T): this;
        removeStacks(types: (keyof M)[]): this;
        removeCallable<T extends keyof M>(callable: ISignalStackCallable<M[T]>, type?: T | undefined): this;
        clear(): void;
    }
}
