import type { ICollection, ICollectionCallback, ICollectionEachCallback, ICollectionScheme, ICollectionSpecificCallback } from "../types/index.js";
export declare class Collection<T extends ICollectionScheme> implements ICollection<T> {
    protected _map: Map<keyof T, T[keyof T]>;
    protected _origin: T;
    protected _effect: (ICollectionCallback<T, keyof T>)[];
    protected _transform: (ICollectionCallback<T, keyof T>)[];
    protected _spec_effect: ICollectionSpecificCallback<T, keyof T>;
    protected _spec_transform: ICollectionSpecificCallback<T, keyof T>;
    state: T;
    constructor(scheme?: T);
    static context<T extends ICollectionScheme>(scheme?: T): ICollection<T>;
    protected stateHandler(): ProxyHandler<T>;
    get map(): Map<keyof T, T[keyof T]>;
    get scheme(): IterableIterator<[
        keyof T,
        T[keyof T]
    ]>;
    get values(): IterableIterator<T[keyof T]>;
    get keys(): IterableIterator<keyof T>;
    get array(): ([
        keyof T,
        T[keyof T]
    ])[];
    get string(): string;
    effect<K extends keyof T>(key: K, callback: ICollectionCallback<T, K>): this;
    effects(setter: ICollectionCallback<T, keyof T>): this;
    transform<P extends keyof T>(key: P, callback: ICollectionCallback<T, P>): this;
    transforms(transformers: ICollectionCallback<T, keyof T>): this;
    each(callback: ICollectionEachCallback<T>): this;
    set<P extends keyof T>(key: P, value: T[P]): this;
    get<P extends keyof T>(key: P): T[P];
    exist<P extends keyof T>(key: P): boolean;
    fill(scheme: T): this;
    reset(): this;
    clear(): this;
    delete<P extends keyof T>(key: P): this;
    export(): T;
}
