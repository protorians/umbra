export type IDictionaryCallbackParser<T> = (key: keyof T, value: T[keyof T]) => T[keyof T]

export interface IDictionary<T> {
    get map(): T;

    get array(): ([keyof T, T[keyof T]])[];

    get string(): string;

    get<K extends keyof T>(key: K): T[K];

    set<K extends keyof T>(key: K, value: T[K]): this;

    remove(key: string): this;

    clear(): this;

    fromString(data: string): this;

    parse(callable: IDictionaryCallbackParser<T>): this;

    many(values: Partial<T>): this;

    values(): (T[keyof T])[];

    keys(): (keyof T)[];
}
