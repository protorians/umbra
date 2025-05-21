import {Signal} from "./signal";
import {ICapability, ICapabilityCallable, ICapabilityInstance, ICapabilityContext, ICapabilityOptions} from "../types";


export class Capability<T extends Record<string, any>> implements ICapability<T> {
    constructor(
        protected readonly signal: Signal.Stack<T>,
    ) {
    }

    public apply<K extends keyof T>(name: K, callable: ICapabilityCallable<T[K]>): this {
        this.signal.listen(name, callable);
        return this;
    }

    public call<K extends keyof T>(name: K, args: T[K]): this {
        this.signal.dispatch(name, args as T[K]);
        return this;
    }

    public removeEntry<K extends keyof T>(type: K, index: number): this {
        this.signal.remove(type, index);
        return this;
    }

    public remove<K extends keyof T>(type: K): this {
        this.signal.removeStack(type);
        return this;
    }

    public removeAll(types: (keyof T)[]): this {
        this.signal.removeStacks(types);
        return this;
    }

    public removeCallable<K extends keyof T>(callable: T[K], type?: K): this {
        this.signal.removeCallable(callable, type);
        return this;
    }

    public reset(): this {
        this.signal.clear();
        return this;
    }
}

export function createCapability<T extends Record<string, any>, I>(options: ICapabilityOptions<T>): ICapabilityContext<T, I> {
    const signal = new Signal.Stack<T>();
    const initial = {} as ICapabilityInstance<T>;
    const callable = function (key: string, arg: any) {
        signal.dispatch(key, arg);
        return signal.computed(key);
    };
    const handler = {
        get(target: any, prop: string, receiver: string) {
            const value = Reflect.get(target, prop, receiver);
            if (typeof value === 'function') {
                return function (arg: any) {return callable(prop, arg);};
            }
            return value;
        }
    };

    options.methods.forEach(key =>
        initial[key] = () => signal.computed(key)
    );

    return {
        current: new Proxy(initial as ICapabilityInstance<T> & I, handler),
        capability: new Capability(signal),
    }
}