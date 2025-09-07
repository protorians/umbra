import type {IParameterCallable, IParametersSet, IStaticParametersBag, IStaticProps} from "@/types";


export class StaticParameterBag<T extends IStaticProps<T>> implements IStaticParametersBag<T> {

    stack: IParametersSet<T>;

    protected _effects: Set<IParameterCallable<T>> = new Set();

    constructor(
        public readonly initial: IStaticProps<T>,
    ) {
        this.stack = new Set();
        this.initialize();
    }

    entries(): T[] {
        return [...this.stack.values()] as T[];
    }

    protected initialize(): this {
        for (const value of this.initial) {
            this.add(value);
        }
        return this;
    }

    get value(): T | undefined {
        return this.stack.values().next().value || undefined;
    }

    add(value: T): this {
        this.stack.add(value);
        return this.dispatch();
    }

    has(key: T): boolean {
        return this.stack.has(key);
    }

    remove(key: T): this {
        this.stack.delete(key);
        return this.dispatch();
    }

    reset(): this {
        return this.clear().initialize().dispatch();
    }

    clear(): this {
        this.stack.clear();
        return this.dispatch();
    }

    clone(): this {
        return new (this.constructor as any)([...this.initial]);
    }

    effect(callback: IParameterCallable<T>): this {
        this._effects.add(callback);
        return this;
    }

    dispatch(): this {
        for (const entry of this.entries())
            for (const callback of this._effects)
                callback(entry);
        return this;
    }

}