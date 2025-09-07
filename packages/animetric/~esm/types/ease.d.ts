import type { ISignalStack } from "@protorians/core";
export interface IEasingEmitterScheme {
    change: number;
}
export type IEasingFormula = (x: number) => number;
export interface IEasingBase {
    get signal(): ISignalStack<IEasingEmitterScheme>;
    get name(): string;
}
export interface IEasing extends IEasingBase {
    get cubicBezier(): string | undefined;
    get formula(): IEasingFormula | undefined;
    compute(x: number): number | undefined;
}
