import { Signal } from "./signal.js";
import { ICapability, ICapabilityCallable, ICapabilityContext, ICapabilityOptions } from "../types/index.js";
export declare class Capability<T extends Record<string, any>> implements ICapability<T> {
    protected readonly signal: Signal.Stack<T>;
    constructor(signal: Signal.Stack<T>);
    apply<K extends keyof T>(name: K, callable: ICapabilityCallable<T[K]>): this;
    call<K extends keyof T>(name: K, args: T[K]): this;
    removeEntry<K extends keyof T>(type: K, index: number): this;
    remove<K extends keyof T>(type: K): this;
    removeAll(types: (keyof T)[]): this;
    removeCallable<K extends keyof T>(callable: T[K], type?: K): this;
    reset(): this;
}
export declare function createCapability<T extends Record<string, any>, I>(options: ICapabilityOptions<T>): ICapabilityContext<T, I>;
