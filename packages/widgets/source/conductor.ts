import type {IConductor, IConductorScheme, IConductorState, IState, IStateCallable} from "./types/index.js";
import {createState} from "./state.js";

export class Conductor<T extends IConductorScheme> implements IConductor<T> {
    protected _states: IConductorState<T>;

    constructor(public readonly schematic: T,) {
        this._states = this.initializeStates();
    }

    protected initializeStates(): IConductorState<T> {
        const states = {} as IConductorState<T>;
        for (const [key, value] of Object.entries(this.schematic))
            this._states[key as keyof T] = createState(value);
        return states;
    }

    get states(): IConductorState<T> {
        return this._states;
    }

    effects(callable: IStateCallable<T[keyof T] | undefined>): this {
        for (const entry of Object.values(this.states) as IState<T[keyof T]>[])
            entry.effect(callable);
        return this;
    }

    effect<K extends keyof T>(name: K, callable: IStateCallable<T[K] | undefined>): this {
        this.states[name].effect(callable);
        return this;
    }

    reset(): this {
        for (const entry of Object.values(this.states) as IState<T[keyof T]>[])
            entry.reset();
        return this;
    }
}

export function createConductor<T extends IConductorScheme>(schematic: T): IConductor<T> {
    return new Conductor<T>(schematic)
}