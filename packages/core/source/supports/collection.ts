import type {
    ICollection,
    ICollectionCallback,
    ICollectionEachCallback,
    ICollectionScheme,
    ICollectionSpecificCallback
} from "../types";


export class Collection<T extends ICollectionScheme> implements ICollection<T> {

    protected _map: Map<keyof T, T[keyof T]>;
    protected _origin: T;
    protected _effect: (ICollectionCallback<T, keyof T>)[] = [];
    protected _transform: (ICollectionCallback<T, keyof T>)[] = [];
    protected _spec_effect: ICollectionSpecificCallback<T, keyof T> = {} as ICollectionSpecificCallback<T, keyof T>;
    protected _spec_transform: ICollectionSpecificCallback<T, keyof T> = {} as ICollectionSpecificCallback<T, keyof T>;

    state: T;

    constructor(scheme?: T) {
        scheme = structuredClone<T>(scheme || {} as T)
        this._map = new Map<keyof T, T[keyof T]>();
        this._origin = scheme;
        this.state = new Proxy<T>(scheme, this.stateHandler())
        this.reset()
    }

    static context<T extends ICollectionScheme>(scheme?: T): ICollection<T> {
        return new this(scheme);
    }

    protected stateHandler(): ProxyHandler<T> {
        const current = this;
        return {
            set(target, prop, value, receiver) {
                const index = prop as keyof T;
                current._effect.forEach(callback => value = callback({target, prop: prop as keyof T, value}));
                current._spec_effect[index]?.forEach(callback => callback({target, prop: prop as keyof T, value}));
                current.map.set(prop as keyof T, value);
                return Reflect.set(target, prop, value, receiver)
            },
            get(target, prop): T[keyof T] {
                const index = prop as keyof T;
                let value = current.get(index)
                current._transform.forEach(callback => value = callback({target, prop: index, value}));
                current._spec_transform[index]?.forEach(callback => value = callback({target, prop: index, value}));
                return value;
            },
        }
    }

    get map(): Map<keyof T, T[keyof T]> {
        return this._map;
    }

    get scheme(): IterableIterator<[keyof T, T[keyof T]]> {
        return this._map.entries();
    }

    get values(): IterableIterator<T[keyof T]> {
        return this._map.values();
    }

    get keys(): IterableIterator<keyof T> {
        return this._map.keys();
    }

    get array(): ([keyof T, T[keyof T]])[] {
        return Object.entries(this.export()) as ([keyof T, T[keyof T]])[]
    }

    get string(): string {
        return JSON.stringify(this.export() as object);
    }

    effect<K extends keyof T>(key: K, callback: ICollectionCallback<T, K>): this {
        this._spec_effect[key] = this._spec_effect[key] || []
        this._spec_effect[key].push(callback)
        return this;
    }

    effects(setter: ICollectionCallback<T, keyof T>): this {
        this._effect.push(setter);
        return this;
    }

    transform<P extends keyof T>(key: P, callback: ICollectionCallback<T, P>): this {
        this._spec_transform[key] = this._spec_transform[key] || []
        this._spec_transform[key].push(callback)
        return this;
    }

    transforms(transformers: ICollectionCallback<T, keyof T>): this {
        this._transform.push(transformers);
        return this;
    }

    each(callback: ICollectionEachCallback<T>): this {
        this._map.forEach(callback)
        return this;
    }

    set<P extends keyof T>(key: P, value: T[P]): this {
        this._map.set(key, value as T[P]);
        return this;
    }

    get<P extends keyof T>(key: P): T[P] {
        return this._map.get(key) as T[P];
    }

    exist<P extends keyof T>(key: P): boolean {
        return this._map.has(key);
    }

    fill(scheme: T): this {
        Object.entries(scheme).forEach(([key, value]) => {
            this._map.set(key, value as T[keyof T]);
        })
        return this;
    }

    reset(): this {
        return this.fill(this._origin);
    }

    clear(): this {
        this._map.clear()
        return this;
    }

    delete<P extends keyof T>(key: P): this {
        this._map.delete(key)
        return this;
    }

    export(): T {
        const property = {} as T;
        this._map.forEach((value, key) => property[key] = this.state[key] || value);
        return property;
    }

}
