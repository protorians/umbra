import type {ISignalStack} from "@protorians/core";
import type {IEasing} from "./ease";

export type IAnimetricCallable = (payload: IAnimetricPayload) => void;

export interface IAnimetricPayload {
    percent: number;
    frames: number[];
}

export type IAnimetricEasing = IEasing

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
}

/**
 * Animetric Slim Options
 */
export interface IAnimetricSlimOptions extends Partial<IAnimetricBaseOptions>, IAnimetricGroupOptions {
    from?: Partial<IAnimetricSequence>;
    to: Partial<IAnimetricSequence>;
}


/**
 * Animetric Options
 */
export interface IAnimetricOptions extends IAnimetricBaseOptions {
    from: number[];
    to: number[];
}

/**
 * Animetric Controller
 */
export interface IAnimetricController {

    /**
     * Trigger `playing`
     */
    play(): this;

    /**
     * Set pause
     */
    pause(): this;

    /**
     * Resume
     */
    resume(): this;

    /**
     * Stop
     */
    stop(): this;
}


/**
 * Animetric
 */
export interface IAnimetric extends IAnimetricController {

    /**
     * Signal Stack
     */
    signal: ISignalStack<IAnimetricSignalMap>

    /**
     * @description `true` to play
     * @description `false` to pause
     * @description `null` to stop
     */
    get status(): boolean | null;

    /**
     * Get percentage
     */
    get percent(): number;

    /**
     * Check is `ready`
     */
    get ready(): boolean;

    /**
     * Get state
     */
    get state(): Readonly<IAnimetricPayload>;

    /**
     * Get options
     */
    get options(): Readonly<IAnimetricOptions>;

    /**
     * Check is `completed`
     */
    get completed(): boolean;

    /**
     * Get the list of negativities of the `to` property in the options
     */
    get waves(): boolean[];

    /**
     * Get list of gaps between `from` and `to`
     */
    get gaps(): number[];

    /**
     * Initializer
     */
    initialize(): this;

    /**
     * Set `from`
     * @param value
     */
    from(...value: number[]): this;

    /**
     * Set `duration`
     * @param millisecondes
     */
    duration(millisecondes: number): this;

    /**
     * Apply delay before
     * @param millisecondes
     */
    delay(millisecondes: number): this;

    /**
     * Set `precision` : round numeric to fix
     * @param decimal
     */
    decimal(decimal: number): this;

    /**
     * Set `infinite` : `true` or `false`
     * @param infinite
     */
    infinite(infinite: boolean): this;

    /**
     * Set `ease` : computing easing
     * @param ease
     */
    ease(ease: IAnimetricEasing | undefined): this;

    /**
     * Set `to`
     * @param value
     */
    to(...value: number[]): this;

    /**
     * Set `callable` : on engine update frame
     * @param callback
     */
    callable(callback: IAnimetricCallable): this;

    /**
     * Trigger next frame
     * @param timestamp
     */
    yield(timestamp: number): this;

}

/**
 * Animetric Group
 */
export interface IAnimetricGroup extends IAnimetricController{
    readonly timelines: IAnimetric[];
    readonly options?: Partial<IAnimetricBaseOptions> & IAnimetricGroupOptions;

    replay(delay?: number): this;

    next(): IAnimetric | undefined;

    previous(): IAnimetric | undefined;

    go(index: number): IAnimetric | undefined;
}

/**
 * Animetric Signal Map
 */
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