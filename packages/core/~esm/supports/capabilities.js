import { Signal } from "./signal.js";
export class Capability {
    constructor(signal) {
        this.signal = signal;
    }
    apply(name, callable) {
        this.signal.listen(name, callable);
        return this;
    }
    call(name, args) {
        this.signal.dispatch(name, args);
        return this;
    }
    removeEntry(type, index) {
        this.signal.remove(type, index);
        return this;
    }
    remove(type) {
        this.signal.removeStack(type);
        return this;
    }
    removeAll(types) {
        this.signal.removeStacks(types);
        return this;
    }
    removeCallable(callable, type) {
        this.signal.removeCallable(callable, type);
        return this;
    }
    reset() {
        this.signal.clear();
        return this;
    }
}
export function createCapability(options) {
    const signal = new Signal.Stack();
    const initial = {};
    const callable = function (key, arg) {
        signal.dispatch(key, arg);
        return signal.computed(key);
    };
    const handler = {
        get(target, prop, receiver) {
            const value = Reflect.get(target, prop, receiver);
            if (typeof value === "function") {
                return function (arg) { return callable(prop, arg); };
            }
            return value;
        }
    };
    options.methods.forEach(key => initial[key] = () => signal.computed(key));
    return {
        current: new Proxy(initial, handler),
        capability: new Capability(signal),
    };
}
