import {type ISignalStack, Signal} from "@protorians/core";
import type {
    IAnimetric, IAnimetricBaseOptions,
    IAnimetricCallable,
    IAnimetricEasing,
    IAnimetricSignalMap,
    IAnimetricGroup,
    IAnimetricGroupOptions,
    IAnimetricOptions,
    IAnimetricPayload
} from "../types";
import {round, toPercent} from "../helpers/integer";
import {computeAnimetricEase} from "../helpers/computing";


export class AnimetricEngine implements IAnimetric {

    protected _ready: boolean = false;

    protected _state: IAnimetricPayload = {} as IAnimetricPayload;

    protected _options: IAnimetricOptions = {} as IAnimetricOptions;

    protected _status: boolean | null = null;

    protected _begin: number = 0;

    protected _snap: number = 0;

    protected _elapsed: number = 0;

    protected _percent: number = 0;


    signal: ISignalStack<IAnimetricSignalMap>;

    get ready(): boolean {
        return this._ready;
    }

    get status(): boolean | null {
        return this._status;
    }

    get percent(): number {
        return this._percent;
    }

    get state(): Readonly<IAnimetricPayload> {
        return this._state;
    }

    get options(): Readonly<IAnimetricOptions> {
        return this._options;
    }

    get completed(): boolean {
        return this._state.frames.every((value, index) => {
            return (this.waves[index])
                ? value >= this.options.to[index]
                : value <= this.options.to[index];
        });
    }

    get waves(): boolean[] {
        return this.options.to.map((value, index) =>
            value >= this.options.from[index]
        );
    }

    get gaps(): number[] {
        return this._options.to.map(
            (value, index) =>
                this._options.from[index] - value
        );
    }


    constructor() {
        this.signal = new Signal.Stack<IAnimetricSignalMap>();
    }

    from(...value: number[]): this {
        if (this.status !== null) return this;
        this._options.from = value;
        return this;
    }

    to(...value: number[]): this {
        if (this.status !== null) return this;
        this._options.to = value;
        return this;
    }

    duration(millisecondes: number): this {
        if (this.status !== null) return this;
        this._options.duration = millisecondes;
        return this;
    }

    delay(millisecondes: number): this {
        if (this.status !== null) return this;
        this._options.delay = millisecondes;
        return this;
    }

    decimal(decimal: number): this {
        this._options.decimal = decimal;
        return this;
    }

    infinite(infinite: boolean): this {
        this._options.infinite = infinite;
        return this;
    }

    ease(ease: IAnimetricEasing | undefined): this {
        if (this.status !== null) return this;
        if (ease) this._options.ease = ease;
        return this;
    }

    callable(callback: IAnimetricCallable): this {
        this.signal.listen('update', callback);
        return this;
    }

    initialize(): this {
        this._options.to = this._options.to || [0];
        this._options.from = this._options.from || this._options.to.map(() => 0);
        this._options.duration = this._options.duration || 360;
        this._options.infinite = this._options.infinite || false;
        this._options.decimal = this._options.decimal || 3;
        this.signal.dispatch('initialize', this._state);
        this._ready = true;
        return this;
    }

    yield(timestamp: number): this {
        if (this.ready) new Error('Animetric is not ready.');

        if (!this._status) {
            this._snap = performance.now();
            return this;
        }

        const old_percent = this._percent;
        this._elapsed = timestamp - this._begin;
        this._percent = toPercent(Math.min(this._elapsed / this.options.duration, 1));

        this._state = {
            percent: round(this._percent * 100, this._options.decimal),
            frames: this._options.ease
                ? this._options.from.map((value, index) =>
                    round(
                        (value - ((value - this._options.to[index]) * computeAnimetricEase(this._percent, this))),
                        // computeAnimetricEase(this._percent, this) * (value + (this.options.to[index] - value)),
                        this._options.decimal
                    )
                )
                : this.options.from.map((value, index) =>
                    round(
                        (value - ((value - this._options.to[index]) * this._percent)),
                        // ((value + (this.options.to[index] - value)) * this._percent),
                        this._options.decimal
                    )
                ),
        };

        if (old_percent <= this._percent)
            this.signal.dispatch('update', this._state);

        if (this._percent < 1) requestAnimationFrame(this.yield.bind(this))

        if (this._percent >= 1) {
            const completed_state = {
                ...this._state,
                percent: this._percent,
                value: this.options.to,
            }
            if (this.options.infinite) {
                this.signal.dispatch('loop', completed_state)
                requestAnimationFrame(this.play.bind(this))
            } else this.signal.dispatch('complete', completed_state)
        }

        return this;
    }

    protected _playNow() {
        this._begin = performance.now();
        this.signal.dispatch('play', this._state);
        requestAnimationFrame(this.yield.bind(this));
        return this;
    }

    play(): this {
        this._status = true;
        this.initialize();

        if (this._options.delay) {
            setTimeout(() => this._playNow(), this._options.delay);
        } else this._playNow()

        return this;
    }

    pause(): this {
        this._status = false;
        this.signal.dispatch('pause', this._state);
        return this;
    }

    resume(): this {
        const now = performance.now();
        this._status = true;
        this._begin = now - this._snap;
        this.signal.dispatch('resume', this._state);
        this.yield(this._snap);
        return this;
    }

    stop(): this {
        this._status = null;
        this._snap = 0;
        this.signal.dispatch('stop', this._state);
        this._state = {} as IAnimetricPayload;
        return this;
    }

}


export class AnimetricGroup implements IAnimetricGroup {

    protected _index: number | undefined;
    signal: ISignalStack<IAnimetricSignalMap>

    constructor(
        readonly timelines: IAnimetric[],
        readonly options?: Partial<IAnimetricBaseOptions> & IAnimetricGroupOptions,
    ) {

        this.signal = new Signal.Stack<IAnimetricSignalMap>();
        this.options = options || {} as IAnimetricBaseOptions & IAnimetricGroupOptions;
        this.timelines = timelines.map(animetric =>
            animetric
                .ease(this.options?.ease || undefined)
                .duration(this.options?.duration || 1000)
                .infinite(this.options?.infinite || false)
                .decimal(this.options?.decimal || 3)
                .delay(this.options?.delay || 0)
        );
        this.initialize()
    }

    protected initialize() {
        const frame = this.timelines[0]
        if (frame) {
            frame.signal
                .listen('play', (d) => {
                    this.signal.dispatch('play', d)
                })
                .listen('initialize', (d) => {
                    this.signal.dispatch('initialize', d)
                })
                .listen('stop', (d) => {
                    this.signal.dispatch('stop', d)
                })
                .listen('pause', (d) => {
                    this.signal.dispatch('pause', d)
                })
                .listen('resume', (d) => {
                    this.signal.dispatch('resume', d)
                })
                .listen('complete', (d) => {
                    this.signal.dispatch('complete', d)
                })
                .listen('loop', (d) => {
                    this.signal.dispatch('loop', d)
                })
                .listen('update', (d) => {
                    this.signal.dispatch('update', d)
                })
        }
        return this;
    }

    play(): this {
        this._index = undefined;

        if (this.options?.parallel)
            for (const timeline of this.timelines)
                timeline.play()

        else if (this.timelines.length) {
            this._index = 0;
            for (const timeline of this.timelines) {
                timeline.signal.listen('complete', () => {
                    this.next()?.play()
                })
            }
            this.timelines[0].play()
        }


        return this;
    }

    pause(): this {
        for (const timeline of this.timelines)
            timeline.pause();
        return this;
    }

    resume(): this {
        for (const timeline of this.timelines)
            timeline.resume();
        return this;
    }

    stop(): this {
        for (const timeline of this.timelines)
            timeline.stop();
        return this;
    }

    replay(delay?: number): this {
        this.stop()
        if (delay) setTimeout(() => this.play(), delay);
        else requestAnimationFrame(() => this.play());
        return this;
    }

    next(): IAnimetric | undefined {
        return this.go((this._index || 0) + 1);
    }

    previous(): IAnimetric | undefined {
        return this.go((this._index || 0) - 1);
    }

    go(index: number): IAnimetric | undefined {
        const timeline = this.timelines[index] || undefined;

        if (!timeline) return undefined;
        this._index = index;
        return timeline;
    }

}

export function createAnimetric(options?: Partial<IAnimetricOptions>) {
    const instance = (new AnimetricEngine());

    if (options)
        Object.entries(options)
            .forEach(
                ([key, value]) =>
                    (typeof instance[key] == 'function')
                        ? instance[key](value)
                        : void (0)
            )

    return instance;
}

export function createAnimetricGroup(timelines: IAnimetric[], options?: Partial<IAnimetricBaseOptions>) {
    return new AnimetricGroup(timelines, options)
}