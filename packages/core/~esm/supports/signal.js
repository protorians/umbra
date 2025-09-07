import { TreatmentQueueStatus } from "./enums.js";
export var Signal;
(function (Signal) {
    class Controller {
        constructor(original) {
            this.original = original;
            this.effects = [];
            this._current = this.reset(original);
        }
        get current() {
            return this._current;
        }
        update(target) {
            Object.entries(target).forEach(([key, value]) => this._current[key] = value);
            return this;
        }
        reset(original) {
            const _this = this;
            this._current = new Proxy(original, {
                set(target, name, value, receiver) {
                    _this.parse(target, name, value, receiver);
                    return true;
                }
            });
            return this._current;
        }
        assign(key, value) {
            this._current[key] = value;
            return this;
        }
        effect(callable) {
            this.effects[this.effects.length] = callable;
            return this;
        }
        trigger(name, value) {
            for (const key in this.effects) {
                this.effects[key]({
                    target: this._current,
                    name: name,
                    value,
                    receiver: value,
                });
            }
            return this;
        }
        compute() {
            const refactor = {};
            Object.entries(this._current).forEach(([name, value]) => {
                refactor[name] = value;
                this.trigger(name, value);
            });
            return refactor;
        }
        parse(target, name, value, receiver) {
            for (const key in this.effects) {
                this.effects[key]({
                    target,
                    name,
                    value,
                    receiver,
                });
            }
            return this;
        }
    }
    Signal.Controller = Controller;
    class Stack {
        constructor() {
            this._entries = {};
            this._computed = {};
        }
        get entities() {
            return this._entries;
        }
        listen(type, callable, options) {
            this._computed[type] = undefined;
            this._entries[type] = this._entries[type] || [];
            this._entries[type].push({
                type,
                callable: callable,
                options,
            });
            return this;
        }
        dispatch(type, payload, embarked) {
            var _a;
            const accumulate = [];
            if (this._entries[type]) {
                let cancellable = false;
                for (const entry of this._entries[type]) {
                    if (((_a = entry.options) === null || _a === void 0 ? void 0 : _a.cancellable) === true && cancellable)
                        continue;
                    const parsed = entry.callable.apply(embarked || entry, [payload]);
                    if (parsed) {
                        if (parsed === TreatmentQueueStatus.Cancel)
                            cancellable = true;
                        else if (parsed === TreatmentQueueStatus.Exit)
                            break;
                        else if (parsed === TreatmentQueueStatus.SnapOut) {
                        }
                        else
                            accumulate.push(entry);
                    }
                    if (!parsed)
                        accumulate.push(entry);
                    if (parsed !== this._computed[type])
                        this._computed[type] = parsed;
                }
                this._entries[type] = accumulate;
            }
            return this;
        }
        computed(type) {
            return this._computed[type] || undefined;
        }
        remove(type, index) {
            if (this._entries[type] || undefined) {
                const refactor = [];
                Object.entries(this._entries[type]).forEach(([rank, value]) => {
                    if (parseInt(rank) !== index)
                        refactor.push(value);
                });
                this._entries[type] = refactor;
            }
            return this;
        }
        removeStack(type) {
            const entries = {};
            Object.keys(this._entries).forEach(key => {
                if (key != type)
                    entries[key] = this._entries[key];
            });
            this._entries = entries;
            return this;
        }
        removeStacks(types) {
            const entries = {};
            Object.keys(this._entries).forEach(key => {
                if (!types.includes(key))
                    entries[key] = this._entries[key];
            });
            this._entries = entries;
            return this;
        }
        removeCallable(callable, type) {
            const entries = {};
            if (typeof type === "undefined" || type === null) {
                Object.keys(this._entries).forEach(key => {
                    Object.values(entries[key])
                        .forEach(entry => {
                        if (entry.callable.toString() !== callable.toString())
                            entries[key] = this._entries[key];
                    });
                });
            }
            else {
                Object.keys(this._entries).forEach(key => {
                    if (key != type)
                        entries[key] = this._entries[key];
                });
            }
            this._entries = entries;
            return this;
        }
        clear() {
            this._entries = {};
        }
    }
    Signal.Stack = Stack;
})(Signal || (Signal = {}));
