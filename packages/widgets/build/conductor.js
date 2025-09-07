import { createState } from "./state.js";
export class Conductor {
    schematic;
    _states;
    constructor(schematic) {
        this.schematic = schematic;
        this._states = this.initializeStates();
    }
    initializeStates() {
        const states = {};
        for (const [key, value] of Object.entries(this.schematic))
            states[key] = createState(value);
        return states;
    }
    get states() {
        return this._states;
    }
    effects(callable) {
        for (const entry of Object.values(this.states))
            entry.effect(callable);
        return this;
    }
    effect(name, callable) {
        this.states[name].effect(callable);
        return this;
    }
    toArray() {
        const array = [];
        for (const key of Object.keys(this.schematic))
            array.push(this.states[key]);
        return array;
    }
    reset() {
        for (const entry of Object.values(this.states))
            entry.reset();
        return this;
    }
}
export function createConductor(schematic) {
    return new Conductor(schematic);
}
