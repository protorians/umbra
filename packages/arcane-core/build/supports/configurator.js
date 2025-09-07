import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { ArcaneObject } from "./object.js";
export var ArcaneConfig;
(function (ArcaneConfig) {
    class Loader {
        source;
        _schematic;
        constructor(source) {
            this.source = source;
            this._schematic = existsSync(source) ? JSON.parse(`${readFileSync(source)}`) : undefined;
        }
        get schematic() {
            return this._schematic;
        }
        get exists() {
            return typeof this._schematic !== 'undefined';
        }
        get(key) {
            return (this._schematic && (key in (this._schematic || {}))) ? this._schematic[key] : undefined;
        }
        value(key) {
            return this._schematic ? (ArcaneObject.toNested(this._schematic, key)) : undefined;
        }
        update(key, value) {
            if (this._schematic)
                this._schematic[key] = value;
            return this;
        }
        remove(key) {
            if (this._schematic && this._schematic[key] !== undefined) {
                const accumulate = {};
                Object.entries(this._schematic).forEach(([k, value]) => {
                    if (k !== key)
                        accumulate[k] = value;
                });
                this._schematic = accumulate;
            }
            return this;
        }
        save() {
            try {
                if (!this.source)
                    return false;
                writeFileSync(this.source, JSON.stringify(this._schematic || {}, null, 2), { encoding: 'utf-8' });
                return true;
            }
            catch (e) {
                return false;
            }
        }
    }
    ArcaneConfig.Loader = Loader;
})(ArcaneConfig || (ArcaneConfig = {}));
