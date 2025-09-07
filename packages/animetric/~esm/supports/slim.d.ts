import { type IUiTarget } from "@protorians/core";
import type { IAnimetric, IAnimetricSequence, IAnimetricSlimOptions } from "../types/index.js";
export declare function createSlimSequence<T extends HTMLElement>(targets: IUiTarget<T>, property: keyof CSSStyleDeclaration, from: number, to: number, forwarding?: boolean): IAnimetric;
export declare function createSlimSequences<T extends HTMLElement>(target: IUiTarget<T>, from: Partial<IAnimetricSequence>, to: Partial<IAnimetricSequence>, forwarding?: boolean): IAnimetric[];
export declare function slimetric<T extends HTMLElement>(target: IUiTarget<T>, options: IAnimetricSlimOptions): import("./engine.js").AnimetricGroup;
