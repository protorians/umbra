import { IState, IStateCallable } from "./state.js";
export type IConductorScheme = Record<string, any>;
export interface IConductor<T extends IConductorScheme> {
    readonly schematic: T;
    get states(): IConductorState<T>;
    effects(callable: IStateCallable<T[keyof T] | undefined>): this;
    effect<K extends keyof T>(name: K, callable: IStateCallable<T[K] | undefined>): this;
    toArray(): IState<T[keyof T]>[];
    reset(): this;
}
export type IConductorState<T extends IConductorScheme> = {
    [K in keyof T]: IState<T[K]>;
};
