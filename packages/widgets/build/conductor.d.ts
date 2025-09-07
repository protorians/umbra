import type { IConductor, IConductorScheme, IConductorState, IState, IStateCallable } from "./types/index.js";
export declare class Conductor<T extends IConductorScheme> implements IConductor<T> {
    readonly schematic: T;
    protected _states: IConductorState<T>;
    constructor(schematic: T);
    protected initializeStates(): IConductorState<T>;
    get states(): IConductorState<T>;
    effects(callable: IStateCallable<T[keyof T] | undefined>): this;
    effect<K extends keyof T>(name: K, callable: IStateCallable<T[K] | undefined>): this;
    toArray(): IState<T[keyof T]>[];
    reset(): this;
}
export declare function createConductor<T extends IConductorScheme>(schematic: T): IConductor<T>;
