import type {IAnimetric} from "../types";

export function computeAnimetricEase(value: number, animetric: IAnimetric): number {
    return animetric.options.ease
        ? animetric.options.ease.compute(value) || value
        : value;
}