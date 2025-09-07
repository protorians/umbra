import { GestureType } from "./enums.js";
import { MouseUtility, Signal } from "@protorians/core";
export class Gesture {
    widget;
    startX = 0;
    startY = 0;
    startTime = 0;
    startDist = 0;
    longPressTimer;
    lastTapTime = 0;
    _options;
    signal;
    get options() {
        return this._options;
    }
    constructor(widget, options = {}) {
        this.widget = widget;
        this.signal = new Signal.Stack();
        this._options = {
            ...options,
            threshold: options.threshold ?? 30,
            longPressTimeout: options.longPressTimeout ?? 600,
            diagonal: options.diagonal ?? true,
        };
        this.widget.clientElement?.addEventListener('mousedown', this.onStartMouse);
        this.widget.clientElement?.addEventListener('touchstart', this.onStartTouch, { passive: false });
    }
    onStartMouse = (e) => {
        this.setStart(e.clientX, e.clientY);
        window.addEventListener('mousemove', this.onMoveMouse);
        window.addEventListener('mouseup', this.onEndMouse);
        this.initLongPress();
    };
    onMoveMouse = (e) => {
        this.signal.dispatch('tracking', { event: e, ...MouseUtility.coordinate(e) });
    };
    onEndMouse = (e) => {
        this.clearLongPress();
        const x = e.clientX - this.startX;
        const y = e.clientY - this.startY;
        this.resolveGesture(x, y);
        window.removeEventListener('mousemove', this.onMoveMouse);
        window.removeEventListener('mouseup', this.onEndMouse);
    };
    onStartTouch = (e) => {
        e.preventDefault();
        if (e.touches.length === 1) {
            this.setStart(e.touches[0].clientX, e.touches[0].clientY);
            this.initLongPress();
        }
        if (e.touches.length === 2) {
            this.startDist = this.getDistance(e.touches);
        }
        window.addEventListener('touchmove', this.onMoveTouch, { passive: false });
        window.addEventListener('touchend', this.onEndTouch);
    };
    onMoveTouch = (e) => {
        e.preventDefault();
        this.signal.dispatch('tracking', { event: e, ...MouseUtility.coordinate(e) });
    };
    onEndTouch = (e) => {
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
            this.dispatch(gesture, { x: 0, y: 0, duration: Date.now() - this.startTime });
        }
        window.removeEventListener('touchmove', this.onMoveTouch);
        window.removeEventListener('touchend', this.onEndTouch);
    };
    resolveGesture(x, y) {
        const ax = Math.abs(x);
        const ay = Math.abs(y);
        const duration = Date.now() - this.startTime;
        if (ax < this._options.threshold && ay < this._options.threshold) {
            this.dispatch(GestureType.Swing, { x, y, duration });
            return this;
        }
        if (this._options.diagonal && ax > this._options.threshold && ay > this._options.threshold) {
            if (x < 0 && y < 0)
                return this.dispatch(GestureType.SlideTopLeft, { x, y, duration });
            if (x > 0 && y < 0)
                return this.dispatch(GestureType.SlideTopRight, { x, y, duration });
            if (x > 0 && y > 0)
                return this.dispatch(GestureType.SlideBottomRight, { x, y, duration });
            if (x < 0 && y > 0)
                return this.dispatch(GestureType.SlideBottomLeft, { x, y, duration });
        }
        if (ax > ay) {
            const gesture = x > 0 ? GestureType.SlideRight : GestureType.SlideLeft;
            this.dispatch(gesture, { x, y, duration });
            this.dispatch(GestureType.SlideX, { x, y, duration });
        }
        else {
            const gesture = y > 0 ? GestureType.SlideBottom : GestureType.SlideTop;
            this.dispatch(gesture, { x, y, duration });
            this.dispatch(GestureType.SlideY, { x, y, duration });
        }
        if (ax > this._options.threshold && ay > this._options.threshold) {
            this.dispatch(GestureType.Swipe, { x, y, duration });
        }
        return this;
    }
    initLongPress() {
        this.startTime = Date.now();
        this.longPressTimer = window.setTimeout(() => {
            this.dispatch(GestureType.LongPress, { x: 0, y: 0, duration: this._options.longPressTimeout });
        }, this._options.longPressTimeout);
    }
    clearLongPress() {
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
            this.longPressTimer = undefined;
        }
    }
    checkDoubleTap() {
        const now = Date.now();
        const gap = now - this.lastTapTime;
        this.lastTapTime = now;
        if (gap < 300) {
            this.dispatch(GestureType.DoubleTap, { x: 0, y: 0, duration: gap });
        }
    }
    getDistance(touches) {
        if (touches.length < 2)
            return 0;
        const [a, b] = [touches[0], touches[1]];
        return Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
    }
    setStart(x, y) {
        this.startX = x;
        this.startY = y;
        this.startTime = Date.now();
        this.signal.dispatch('start', { x, y });
    }
    option(key, value) {
        this.options[key] = value;
        return this;
    }
    listen(type, callable) {
        this.signal.listen(type, callable);
        return this;
    }
    any(callable) {
        this.signal.listen('any', callable);
        return this;
    }
    tracking(callable) {
        this.signal.listen('tracking', callable);
        return this;
    }
    start(callable) {
        this.signal.listen('start', callable);
        return this;
    }
    end(callable) {
        this.signal.listen('end', callable);
        return this;
    }
    dispatch(type, detail) {
        this.signal.dispatch(type, { type, detail });
        this.signal.dispatch('any', { type, detail });
        this.signal.dispatch('end', { type, x: detail.x, y: detail.y });
        return this;
    }
    destroy() {
        this.widget.clientElement?.removeEventListener('mousedown', this.onStartMouse);
        this.widget.clientElement?.removeEventListener('touchstart', this.onStartTouch);
        window.removeEventListener('mousemove', this.onMoveMouse);
        window.removeEventListener('mouseup', this.onEndMouse);
        window.removeEventListener('touchmove', this.onMoveTouch);
        window.removeEventListener('touchend', this.onEndTouch);
        this.clearLongPress();
    }
    slideLeft(callable) {
        this.listen(GestureType.SlideLeft, callable);
        return this;
    }
    slideRight(callable) {
        this.listen(GestureType.SlideRight, callable);
        return this;
    }
    slideTop(callable) {
        this.listen(GestureType.SlideTop, callable);
        return this;
    }
    slideBottom(callable) {
        this.listen(GestureType.SlideBottom, callable);
        return this;
    }
    slideTopLeft(callable) {
        this.listen(GestureType.SlideTopLeft, callable);
        return this;
    }
    slideTopRight(callable) {
        this.listen(GestureType.SlideTopRight, callable);
        return this;
    }
    slideBottomLeft(callable) {
        this.listen(GestureType.SlideBottomLeft, callable);
        return this;
    }
    slideBottomRight(callable) {
        this.listen(GestureType.SlideBottomRight, callable);
        return this;
    }
    slideX(callable) {
        this.listen(GestureType.SlideX, callable);
        return this;
    }
    slideY(callable) {
        this.listen(GestureType.SlideY, callable);
        return this;
    }
    swipe(callable) {
        this.listen(GestureType.Swipe, callable);
        return this;
    }
    swing(callable) {
        this.listen(GestureType.Swing, callable);
        return this;
    }
    zoomIn(callable) {
        this.listen(GestureType.ZoomIn, callable);
        return this;
    }
    zoomOut(callable) {
        this.listen(GestureType.ZoomOut, callable);
        return this;
    }
    doubleTap(callable) {
        this.listen(GestureType.DoubleTap, callable);
        return this;
    }
    longPress(callable) {
        this.listen(GestureType.LongPress, callable);
        return this;
    }
}
export function createGesture(widget, options = {}) {
    return new Gesture(widget, options);
}
