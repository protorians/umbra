export class Dictionary {
    constructor() {
        this._map = {};
    }
    get map() {
        return this._map;
    }
    get array() {
        return Object.entries(this._map);
    }
    get string() {
        return JSON.stringify(this._map);
    }
    get(key) {
        return this._map[key];
    }
    set(key, value) {
        this._map[key] = value;
        return this;
    }
    remove(key) {
        const entries = {};
        for (const [name, value] of Object.entries(this._map))
            if (name !== key)
                entries[name] = value;
        this._map = entries;
        return this;
    }
    clear() {
        this._map = {};
        return this;
    }
    fromString(data) {
        this._map = JSON.parse(data);
        return this;
    }
    parse(callable) {
        for (const [key, value] of this.array) {
            this._map[key] = callable(key, value);
        }
        return this;
    }
    many(values) {
        for (const [key, value] of Object.entries(values)) {
            this.set(key, value);
        }
        return this;
    }
    values() {
        return Object.values(this._map);
    }
    keys() {
        return Object.keys(this._map);
    }
}
