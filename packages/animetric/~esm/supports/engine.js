import { Signal } from "@protorians/core";
import { round, toPercent } from "../helpers/integer.js";
import { computeAnimetricEase } from "../helpers/computing.js";
export class AnimetricEngine {
    get ready() {
        return this._ready;
    }
    get status() {
        return this._status;
    }
    get percent() {
        return this._percent;
    }
    get state() {
        return this._state;
    }
    get options() {
        return this._options;
    }
    get completed() {
        return this._state.frames.every((value, index) => {
            return (this.waves[index])
                ? value >= this.options.to[index]
                : value <= this.options.to[index];
        });
    }
    get waves() {
        return this.options.to.map((value, index) => value >= this.options.from[index]);
    }
    get gaps() {
        return this._options.to.map((value, index) => this._options.from[index] - value);
    }
    constructor() {
        this._ready = false;
        this._state = {};
        this._options = {};
        this._status = null;
        this._begin = 0;
        this._snap = 0;
        this._elapsed = 0;
        this._percent = 0;
        this.signal = new Signal.Stack();
    }
    from(...value) {
        if (this.status !== null)
            return this;
        this._options.from = value;
        return this;
    }
    to(...value) {
        if (this.status !== null)
            return this;
        this._options.to = value;
        return this;
    }
    duration(millisecondes) {
        if (this.status !== null)
            return this;
        this._options.duration = millisecondes;
        return this;
    }
    delay(millisecondes) {
        if (this.status !== null)
            return this;
        this._options.delay = millisecondes;
        return this;
    }
    decimal(decimal) {
        this._options.decimal = decimal;
        return this;
    }
    infinite(infinite) {
        this._options.infinite = infinite;
        return this;
    }
    ease(ease) {
        if (this.status !== null)
            return this;
        if (ease)
            this._options.ease = ease;
        return this;
    }
    callable(callback) {
        this.signal.listen("update", callback);
        return this;
    }
    initialize() {
        if (this.status === null) {
            this._options.to = this._options.to || [0];
            this._options.from = this._options.from || this._options.to.map(() => 0);
            this._options.duration = this._options.duration || 360;
            this._options.infinite = this._options.infinite || false;
            this._options.decimal = this._options.decimal || 3;
            this.signal.dispatch("initialize", this._state);
        }
        this._ready = true;
        return this;
    }
    yield(timestamp) {
        if (this.ready)
            new Error("Animetric is not ready.");
        if (!this._status) {
            this._snap = performance.now();
            return this;
        }
        if (this._snap) {
            this._snap = 0;
        }
        const old_percent = this._percent;
        this._elapsed = timestamp - this._begin;
        this._percent = toPercent(Math.min(this._elapsed / this.options.duration, 1));
        this._state = {
            percent: round(this._percent * 100, this._options.decimal),
            frames: this._options.ease
                ? this._options.from.map((value, index) => round((value - ((value - this._options.to[index]) * computeAnimetricEase(this._percent, this))), this._options.decimal))
                : this.options.from.map((value, index) => round((value - ((value - this._options.to[index]) * this._percent)), this._options.decimal)),
        };
        if (old_percent <= this._percent)
            this.signal.dispatch("update", this._state);
        if (this._percent < 1)
            requestAnimationFrame(this.yield.bind(this));
        if (this._percent >= 1) {
            const completed_state = Object.assign(Object.assign({}, this._state), { percent: this._percent, value: this.options.to });
            if (this.options.infinite) {
                this.signal.dispatch("loop", completed_state);
                requestAnimationFrame(this.play.bind(this));
            }
            else {
                this.signal.dispatch("complete", completed_state);
            }
        }
        return this;
    }
    _playNow() {
        this._begin = performance.now();
        this.signal.dispatch("play", this._state);
        requestAnimationFrame(this.yield.bind(this));
        return this;
    }
    play() {
        this.initialize();
        this._status = true;
        if (this._options.delay) {
            setTimeout(() => this._playNow(), this._options.delay);
        }
        else
            this._playNow();
        return this;
    }
    pause() {
        this._status = false;
        this.signal.dispatch("pause", this._state);
        return this;
    }
    resume() {
        const now = performance.now();
        this._status = true;
        this._begin = now - this._elapsed;
        this.yield(now);
        this.signal.dispatch("resume", this._state);
        return this;
    }
    stop() {
        this._status = null;
        this._snap = 0;
        this.signal.dispatch("stop", this._state);
        this._state = {};
        return this;
    }
}
export class AnimetricGroup {
    constructor(timelines, options) {
        this.timelines = timelines;
        this.options = options;
        this.signal = new Signal.Stack();
        this.options = options || {};
        this.timelines = timelines.map(animetric => {
            var _a, _b, _c, _d, _e;
            return animetric
                .ease(((_a = this.options) === null || _a === void 0 ? void 0 : _a.ease) || undefined)
                .duration(((_b = this.options) === null || _b === void 0 ? void 0 : _b.duration) || 1000)
                .infinite(((_c = this.options) === null || _c === void 0 ? void 0 : _c.infinite) || false)
                .decimal(((_d = this.options) === null || _d === void 0 ? void 0 : _d.decimal) || 3)
                .delay(((_e = this.options) === null || _e === void 0 ? void 0 : _e.delay) || 0);
        });
        this.initialize();
    }
    initialize() {
        const frame = this.timelines[0];
        if (frame) {
            frame.signal
                .listen("play", (d) => {
                this.signal.dispatch("play", d);
            })
                .listen("initialize", (d) => {
                this.signal.dispatch("initialize", d);
            })
                .listen("stop", (d) => {
                this.signal.dispatch("stop", d);
            })
                .listen("pause", (d) => {
                this.signal.dispatch("pause", d);
            })
                .listen("resume", (d) => {
                this.signal.dispatch("resume", d);
            })
                .listen("complete", (d) => {
                this.signal.dispatch("complete", d);
            })
                .listen("loop", (d) => {
                this.signal.dispatch("loop", d);
            })
                .listen("update", (d) => {
                this.signal.dispatch("update", d);
            });
        }
        return this;
    }
    play() {
        var _a;
        this._index = undefined;
        if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.parallel)
            for (const timeline of this.timelines)
                timeline.play();
        else if (this.timelines.length) {
            this._index = 0;
            for (const timeline of this.timelines) {
                timeline.signal.listen("complete", () => {
                    var _a;
                    (_a = this.next()) === null || _a === void 0 ? void 0 : _a.play();
                });
            }
            this.timelines[0].play();
        }
        return this;
    }
    pause() {
        for (const timeline of this.timelines)
            timeline.pause();
        return this;
    }
    resume() {
        for (const timeline of this.timelines)
            timeline.resume();
        return this;
    }
    stop() {
        for (const timeline of this.timelines)
            timeline.stop();
        return this;
    }
    replay(delay) {
        this.stop();
        if (delay)
            setTimeout(() => this.play(), delay);
        else
            requestAnimationFrame(() => this.play());
        return this;
    }
    next() {
        return this.go((this._index || 0) + 1);
    }
    previous() {
        return this.go((this._index || 0) - 1);
    }
    go(index) {
        const timeline = this.timelines[index] || undefined;
        if (!timeline)
            return undefined;
        this._index = index;
        return timeline;
    }
}
export function createAnimetric(options) {
    const instance = (new AnimetricEngine());
    if (options)
        Object.entries(options)
            .forEach(([key, value]) => (typeof instance[key] == "function")
            ? instance[key](value)
            : void (0));
    return instance;
}
export function createAnimetricGroup(timelines, options) {
    return new AnimetricGroup(timelines, options);
}
