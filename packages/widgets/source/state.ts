import {StateWidget} from "./hooks/index.js";
import {IState} from "./types/index.js";

/**
 * Creates and returns a new state widget with the specified initial state.
 *
 * @param {T} initial - The initial value for the state.
 */
export function createState<T>(initial: T): IState<T> {
    return new StateWidget<T>(initial)
}