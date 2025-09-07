"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
class Collection {
    constructor(scheme) {
        this._effect = [];
        this._transform = [];
        this._spec_effect = {};
        this._spec_transform = {};
        scheme = structuredClone(scheme || {});
        this._map = new Map();
        this._origin = scheme;
        this.state = new Proxy(scheme, this.stateHandler());
        this.reset();
    }
    static context(scheme) {
        return new this(scheme);
    }
    stateHandler() {
        const current = this;
        return {
            set(target, prop, value, receiver) {
                var _a;
                const index = prop;
                current._effect.forEach(callback => value = callback({ target, prop: prop, value }));
                (_a = current._spec_effect[index]) === null || _a === void 0 ? void 0 : _a.forEach(callback => callback({ target, prop: prop, value }));
                current.map.set(prop, value);
                return Reflect.set(target, prop, value, receiver);
            },
            get(target, prop) {
                var _a;
                const index = prop;
                let value = current.get(index);
                current._transform.forEach(callback => value = callback({ target, prop: index, value }));
                (_a = current._spec_transform[index]) === null || _a === void 0 ? void 0 : _a.forEach(callback => value = callback({ target, prop: index, value }));
                return value;
            },
        };
    }
    get map() {
        return this._map;
    }
    get scheme() {
        return this._map.entries();
    }
    get values() {
        return this._map.values();
    }
    get keys() {
        return this._map.keys();
    }
    get array() {
        return Object.entries(this.export());
    }
    get string() {
        return JSON.stringify(this.export());
    }
    effect(key, callback) {
        this._spec_effect[key] = this._spec_effect[key] || [];
        this._spec_effect[key].push(callback);
        return this;
    }
    effects(setter) {
        this._effect.push(setter);
        return this;
    }
    transform(key, callback) {
        this._spec_transform[key] = this._spec_transform[key] || [];
        this._spec_transform[key].push(callback);
        return this;
    }
    transforms(transformers) {
        this._transform.push(transformers);
        return this;
    }
    each(callback) {
        this._map.forEach(callback);
        return this;
    }
    set(key, value) {
        this._map.set(key, value);
        return this;
    }
    get(key) {
        return this._map.get(key);
    }
    exist(key) {
        return this._map.has(key);
    }
    fill(scheme) {
        Object.entries(scheme).forEach(([key, value]) => {
            this._map.set(key, value);
        });
        return this;
    }
    reset() {
        return this.fill(this._origin);
    }
    clear() {
        this._map.clear();
        return this;
    }
    delete(key) {
        this._map.delete(key);
        return this;
    }
    export() {
        const property = {};
        this._map.forEach((value, key) => property[key] = this.state[key] || value);
        return property;
    }
}
exports.Collection = Collection;
