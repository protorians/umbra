import {IDictionary, IDictionaryCallbackParser} from "../types";

export class Dictionary<T> implements IDictionary<T> {
    protected _map: T = {} as T

    get map(): T {
        return this._map;
    }

    get array(): ([keyof T, T[keyof T]])[] {
        return Object.entries(this._map as object) as ([keyof T, T[keyof T]])[]
    }

    get string(): string {
        return JSON.stringify(this._map as object);
    }

    get<K extends keyof T>(key: K): T[K] {
        return this._map[key];
    }

    set<K extends keyof T>(key: K, value: T[K]): this {
        this._map[key] = value;
        return this;
    }

    remove(key: string): this {
        const entries: T = {} as T
        for (const [name, value] of Object.entries(this._map as object))
            if (name !== key) entries[name] = value
        this._map = entries;
        return this;
    }

    clear(): this {
        this._map = {} as T;
        return this;
    }

    fromString(data: string): this {
        this._map = JSON.parse(data) as T;
        return this;
    }

    parse(callable: IDictionaryCallbackParser<T>): this {
        for (const [key, value] of this.array) {
            this._map[key] = callable(key, value);
        }
        return this;
    }

    many(values: Partial<T>): this {
        for (const [key, value] of Object.entries(values)) {
            this.set(key as keyof T, value as T[keyof T]);
        }
        return this;
    }

    values(): (T[keyof T])[] {
        return Object.values(this._map as object);
    }

    keys(): (keyof T)[] {
        return Object.keys(this._map as object) as (keyof T)[];
    }
}
