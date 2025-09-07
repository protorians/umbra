import { IConfigLoader } from "../types/index.js";
export declare namespace ArcaneConfig {
    class Loader<T> implements IConfigLoader<T> {
        readonly source: string;
        protected _schematic: T | undefined;
        constructor(source: string);
        get schematic(): T | undefined;
        get exists(): boolean;
        get(key: string): T[keyof T] | undefined;
        value<K extends keyof T>(key: K): T[K] | undefined;
        update<K extends keyof T>(key: K, value: T[K]): this;
        remove<K extends keyof T>(key: K): this;
        save(): boolean;
    }
}
