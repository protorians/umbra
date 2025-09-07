export interface ICapability<T> {
    apply<K extends keyof T>(name: K, callable: ICapabilityCallable<T[K]>): this;
    call<K extends keyof T>(name: K, args: T[K]): this;
    removeEntry<K extends keyof T>(type: K, index: number): this;
    remove<K extends keyof T>(type: K): this;
    removeAll(types: (keyof T)[]): this;
    removeCallable<K extends keyof T>(callable: T[K], type?: K): this;
    reset(): this;
}
export interface ICapabilityContext<T, I> {
    current: ICapabilityInstance<T> & I;
    capability: ICapability<T>;
}
export type ICapabilityCallable<P> = (props?: P) => any;
export type ICapabilityInstance<T> = {
    [K in keyof T]: ICapabilityCallable<T[K]>;
};
export interface ICapabilityOptions<T> {
    methods: (keyof T)[];
}
