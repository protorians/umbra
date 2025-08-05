import type {
    IAttributes,
    IGestureDetail,
    IGestureEventMap,
    IGestureOptions,
    IWidgetNode,
    IGesture,
    IGestureCallable, IGestureTrackingCallable
} from "./types/index.js";
import {GestureType} from "./enums.js";
import {ISignalStack, MouseUtility, Signal} from "@protorians/core";


export class Gesture<E extends HTMLElement, A extends IAttributes> implements IGesture<E, A> {
    protected startX: number = 0;
    protected startY: number = 0;
    protected startTime: number = 0;
    protected startDist: number = 0;
    protected longPressTimer: number | undefined;
    protected lastTapTime: number = 0;
    protected _options: Required<IGestureOptions>;
    public readonly signal: ISignalStack<IGestureEventMap>

    get options(): IGestureOptions {
        return this._options;
    }

    constructor(
        public readonly widget: IWidgetNode<E, A>,
        options: IGestureOptions = {}
    ) {
        this.signal = new Signal.Stack<IGestureEventMap>();
        this._options = {
            ...options,
            threshold: options.threshold ?? 30,
            longPressTimeout: options.longPressTimeout ?? 600,
            diagonal: options.diagonal ?? true,
        };

        this.widget.clientElement?.addEventListener('mousedown', this.onStartMouse);
        this.widget.clientElement?.addEventListener('touchstart', this.onStartTouch, {passive: false});
    }

    protected onStartMouse = (e: MouseEvent) => {
        this.setStart(e.clientX, e.clientY);
        window.addEventListener('mousemove', this.onMoveMouse);
        window.addEventListener('mouseup', this.onEndMouse);
        this.initLongPress();
    };

    protected onMoveMouse = (e: MouseEvent) => {
        this.signal.dispatch('tracking', {event: e, ...MouseUtility.coordinate(e)})
    };

    protected onEndMouse = (e: MouseEvent) => {
        this.clearLongPress();
        const x = e.clientX - this.startX;
        const y = e.clientY - this.startY;
        this.resolveGesture(x, y);
        window.removeEventListener('mousemove', this.onMoveMouse);
        window.removeEventListener('mouseup', this.onEndMouse);
    };

    protected onStartTouch = (e: TouchEvent) => {
        e.preventDefault();

        if (e.touches.length === 1) {
            this.setStart(e.touches[0].clientX, e.touches[0].clientY);
            this.initLongPress();
        }

        if (e.touches.length === 2) {
            this.startDist = this.getDistance(e.touches);
        }

        window.addEventListener('touchmove', this.onMoveTouch, {passive: false});
        window.addEventListener('touchend', this.onEndTouch);
    };

    protected onMoveTouch = (e: TouchEvent) => {
        e.preventDefault();
        this.signal.dispatch('tracking', {event: e, ...MouseUtility.coordinate(e)})
    };

    protected onEndTouch = (e: TouchEvent) => {
        this.clearLongPress();
        const touches = e.changedTouches;

        if (touches.length === 1) {
            const x = touches[0].clientX - this.startX;
            const y = touches[0].clientY - this.startY;
            this.resolveGesture(x, y);
            this.checkDoubleTap();
        }

        if (touches.length === 2) {
            const endDist = this.getDistance(touches);
            const gesture = endDist > this.startDist ? GestureType.ZoomIn : GestureType.ZoomOut;
            this.dispatch(gesture, {x: 0, y: 0, duration: Date.now() - this.startTime});
        }

        window.removeEventListener('touchmove', this.onMoveTouch);
        window.removeEventListener('touchend', this.onEndTouch);
    };

    protected resolveGesture(x: number, y: number) {
        const ax = Math.abs(x);
        const ay = Math.abs(y);
        const duration = Date.now() - this.startTime;

        if (ax < this._options.threshold && ay < this._options.threshold) {
            this.dispatch(GestureType.Swing, {x, y, duration});
            return this;
        }

        if (this._options.diagonal && ax > this._options.threshold && ay > this._options.threshold) {
            if (x < 0 && y < 0) return this.dispatch(GestureType.SlideTopLeft, {x, y, duration});
            if (x > 0 && y < 0) return this.dispatch(GestureType.SlideTopRight, {x, y, duration});
            if (x > 0 && y > 0) return this.dispatch(GestureType.SlideBottomRight, {x, y, duration});
            if (x < 0 && y > 0) return this.dispatch(GestureType.SlideBottomLeft, {x, y, duration});
        }

        if (ax > ay) {
            const gesture = x > 0 ? GestureType.SlideRight : GestureType.SlideLeft;
            this.dispatch(gesture, {x, y, duration});
            this.dispatch(GestureType.SlideX, {x, y, duration});
        } else {
            const gesture = y > 0 ? GestureType.SlideBottom : GestureType.SlideTop;
            this.dispatch(gesture, {x, y, duration});
            this.dispatch(GestureType.SlideY, {x, y, duration});
        }

        if (ax > this._options.threshold && ay > this._options.threshold) {
            this.dispatch(GestureType.Swipe, {x, y, duration});
        }
        return this;
    }

    protected initLongPress() {
        this.startTime = Date.now();
        this.longPressTimer = window.setTimeout(() => {
            this.dispatch(GestureType.LongPress, {x: 0, y: 0, duration: this._options.longPressTimeout});
        }, this._options.longPressTimeout);
    }

    protected clearLongPress() {
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
            this.longPressTimer = undefined;
        }
    }

    protected checkDoubleTap() {
        const now = Date.now();
        const gap = now - this.lastTapTime;
        this.lastTapTime = now;

        if (gap < 300) {
            this.dispatch(GestureType.DoubleTap, {x: 0, y: 0, duration: gap});
        }
    }

    protected getDistance(touches: TouchList): number {
        if (touches.length < 2) return 0;
        const [a, b] = [touches[0], touches[1]];
        return Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
    }

    protected setStart(x: number, y: number) {
        this.startX = x;
        this.startY = y;
        this.startTime = Date.now();
        this.signal.dispatch('start', {x, y});
    }

    public option<K extends keyof IGestureOptions>(key: K, value: IGestureOptions[K]): this {
        this.options[key] = value;
        return this;
    }

    public listen<K extends GestureType>(type: K, callable: IGestureCallable): this {
        this.signal.listen(type, callable);
        return this;
    }

    public any(callable: IGestureCallable): this {
        this.signal.listen('any', callable);
        return this;
    }

    public tracking(callable: IGestureTrackingCallable): this {
        this.signal.listen('tracking', callable);
        return this;
    }

    public start(callable: IGestureTrackingCallable): this {
        this.signal.listen('start', callable);
        return this;
    }

    public end(callable: IGestureTrackingCallable): this {
        this.signal.listen('end', callable);
        return this;
    }

    public dispatch<K extends GestureType>(type: K, detail: IGestureDetail): this {
        this.signal.dispatch(type, {type, detail});
        this.signal.dispatch('any', {type, detail});
        this.signal.dispatch('end', {type, x: detail.x, y: detail.y});
        return this;
    }

    public destroy(): void {
        this.widget.clientElement?.removeEventListener('mousedown', this.onStartMouse);
        this.widget.clientElement?.removeEventListener('touchstart', this.onStartTouch);
        window.removeEventListener('mousemove', this.onMoveMouse);
        window.removeEventListener('mouseup', this.onEndMouse);
        window.removeEventListener('touchmove', this.onMoveTouch);
        window.removeEventListener('touchend', this.onEndTouch);
        this.clearLongPress();
    }

    public slideLeft(callable: IGestureCallable): this {
        this.listen(GestureType.SlideLeft, callable);
        return this;
    }

    public slideRight(callable: IGestureCallable): this {
        this.listen(GestureType.SlideRight, callable);
        return this;
    }

    public slideTop(callable: IGestureCallable): this {
        this.listen(GestureType.SlideTop, callable);
        return this;
    }

    public slideBottom(callable: IGestureCallable): this {
        this.listen(GestureType.SlideBottom, callable);
        return this;
    }

    public slideTopLeft(callable: IGestureCallable): this {
        this.listen(GestureType.SlideTopLeft, callable);
        return this;
    }

    public slideTopRight(callable: IGestureCallable): this {
        this.listen(GestureType.SlideTopRight, callable);
        return this;
    }

    public slideBottomLeft(callable: IGestureCallable): this {
        this.listen(GestureType.SlideBottomLeft, callable);
        return this;
    }

    public slideBottomRight(callable: IGestureCallable): this {
        this.listen(GestureType.SlideBottomRight, callable);
        return this;
    }

    public slideX(callable: IGestureCallable): this {
        this.listen(GestureType.SlideX, callable);
        return this;
    }

    public slideY(callable: IGestureCallable): this {
        this.listen(GestureType.SlideY, callable);
        return this;
    }

    public swipe(callable: IGestureCallable): this {
        this.listen(GestureType.Swipe, callable);
        return this;
    }

    public swing(callable: IGestureCallable): this {
        this.listen(GestureType.Swing, callable);
        return this;
    }

    public zoomIn(callable: IGestureCallable): this {
        this.listen(GestureType.ZoomIn, callable);
        return this;
    }

    public zoomOut(callable: IGestureCallable): this {
        this.listen(GestureType.ZoomOut, callable);
        return this;
    }

    public doubleTap(callable: IGestureCallable): this {
        this.listen(GestureType.DoubleTap, callable);
        return this;
    }

    public longPress(callable: IGestureCallable): this {
        this.listen(GestureType.LongPress, callable);
        return this;
    }

}


export function createGesture<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>, options: IGestureOptions = {}) {
    return new Gesture<E, A>(widget, options);
}