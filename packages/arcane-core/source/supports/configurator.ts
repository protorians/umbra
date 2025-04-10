import {existsSync, readFileSync, writeFileSync} from "node:fs";
import { IConfigLoader } from "../types/index.js";
import {ArcaneObject} from "./object.js";


export namespace ArcaneConfig {

    export class Loader<T> implements IConfigLoader<T>{

        protected _schematic: T | undefined;

        constructor(
            public readonly source: string,
        ) {
            this._schematic = existsSync(source) ? JSON.parse(`${readFileSync(source)}`) : undefined;
        }

        get schematic(): T | undefined {
            return this._schematic;
        }

        get exists(): boolean {
            return typeof this._schematic !== 'undefined';
        }

        get(key: string): T[keyof T] | undefined {
            return (this._schematic && (key in (this._schematic || {}))) ? this._schematic[key] : undefined
        }

        value<K extends keyof T>(key: K): T[K] | undefined {
            return this._schematic ? (ArcaneObject.toNested(this._schematic, key as string)) : undefined
        }

        update<K extends keyof T>(key: K, value: T[K]): this {
            if (this._schematic) this._schematic[key] = value as any;
            return this;
        }

        remove<K extends keyof T>(key: K): this {
            if (this._schematic && this._schematic[key as string] !== undefined) {

                const accumulate: T = {} as T
                Object.entries(this._schematic).forEach(([k, value]) => {
                    if (k !== key) accumulate[k] = value;
                });
                this._schematic = accumulate;
            }
            return this;
        }

        save(): boolean {
            try {
                if (!this.source) return false;
                writeFileSync(this.source, JSON.stringify(this._schematic || {}, null, 2), {encoding: 'utf-8'});
                return true;
            } catch (e) {
                return false;
            }
        }

    }
}
