import {StateWidget} from "./hooks/index.js";

export function createState<T>(initial: T) {
    return new StateWidget<T>(initial)
}