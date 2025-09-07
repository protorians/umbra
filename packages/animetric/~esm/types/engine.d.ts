import type { ISignalStack } from "@protorians/core";
import type { IEasing } from "./ease.js";
export type IAnimetricCallable = (payload: IAnimetricPayload) => void;
export interface IAnimetricPayload {
    percent: number;
    frames: number[];
}
export type IAnimetricEasing = IEasing;
export interface IAnimetricBaseOptions {
    infinite: boolean;
    duration: number;
    decimal: number;
    delay: number;
    ease: IAnimetricEasing;
}
export interface IAnimetricGroupOptions {
    parallel?: boolean;
}
export type IAnimetricSequence = {
    [K in keyof CSSStyleDeclaration]: number | string;
};
export interface IAnimetricSlimOptions extends Partial<IAnimetricBaseOptions>, IAnimetricGroupOptions {
    from?: Partial<IAnimetricSequence>;
    to: Partial<IAnimetricSequence>;
    forwarding?: boolean;
}
export interface IAnimetricOptions extends IAnimetricBaseOptions {
    from: number[];
    to: number[];
}
export interface IAnimetricController {
    play(): this;
    pause(): this;
    resume(): this;
    stop(): this;
}
export interface IAnimetric extends IAnimetricController {
    signal: ISignalStack<IAnimetricSignalMap>;
    get status(): boolean | null;
    get percent(): number;
    get ready(): boolean;
    get state(): Readonly<IAnimetricPayload>;
    get options(): Readonly<IAnimetricOptions>;
    get completed(): boolean;
    get waves(): boolean[];
    get gaps(): number[];
    initialize(): this;
    from(...value: number[]): this;
    duration(millisecondes: number): this;
    delay(millisecondes: number): this;
    decimal(decimal: number): this;
    infinite(infinite: boolean): this;
    ease(ease: IAnimetricEasing | undefined): this;
    to(...value: number[]): this;
    callable(callback: IAnimetricCallable): this;
    yield(timestamp: number): this;
}
export interface IAnimetricGroup extends IAnimetricController {
    readonly timelines: IAnimetric[];
    readonly options?: Partial<IAnimetricBaseOptions> & IAnimetricGroupOptions;
    signal: ISignalStack<IAnimetricSignalMap>;
    replay(delay?: number): this;
    next(): IAnimetric | undefined;
    previous(): IAnimetric | undefined;
    go(index: number): IAnimetric | undefined;
}
export interface IAnimetricSignalMap {
    initialize: IAnimetricPayload;
    update: IAnimetricPayload;
    play: IAnimetricPayload;
    pause: IAnimetricPayload;
    resume: IAnimetricPayload;
    stop: IAnimetricPayload;
    complete: IAnimetricPayload;
    loop: IAnimetricPayload;
}
