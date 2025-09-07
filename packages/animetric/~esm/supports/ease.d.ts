import type { IEasing, IEasingEmitterScheme, IEasingFormula } from "../types/index.js";
import { Signal } from "@protorians/core";
export declare class Ease implements IEasing {
    readonly name: string;
    readonly cubicBezier: string;
    readonly formula: IEasingFormula;
    signal: Signal.Stack<IEasingEmitterScheme>;
    constructor(name: string, cubicBezier: string, formula: IEasingFormula);
    compute(x: number): number;
}
export declare class Easing {
    static get inSine(): Ease;
    static get outSine(): Ease;
    static get inOutSine(): Ease;
    static get inQuad(): Ease;
    static get outQuad(): Ease;
    static get inOutQuad(): Ease;
    static get inCubic(): Ease;
    static get outCubic(): Ease;
    static get inOutCubic(): Ease;
    static get inQuart(): Ease;
    static get outQuart(): Ease;
    static get inOutQuart(): Ease;
    static get inQuint(): Ease;
    static get outQuint(): Ease;
    static get inOutQuint(): Ease;
    static get inExpo(): Ease;
    static get outExpo(): Ease;
    static get inOutExpo(): Ease;
    static get inCirc(): Ease;
    static get outCirc(): Ease;
    static get inOutCirc(): Ease;
    static get inBack(): Ease;
    static get outBack(): Ease;
    static get inOutBack(): Ease;
    static get inElastic(): Ease;
    static get outElastic(): Ease;
    static get inOutElastic(): Ease;
    static get inBounce(): Ease;
    static get outBounce(): Ease;
    static get inOutBounce(): Ease;
}
