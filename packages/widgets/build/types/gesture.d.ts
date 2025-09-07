import { GestureType } from "../enums.js";
import { IAttributes } from "./attributes.js";
import { IWidgetNode } from "./widget.js";
export type IGestureDetail = {
    x: number;
    y: number;
    duration: number;
};
export type IGestureCallablePayload = {
    type: GestureType;
    detail: IGestureDetail;
};
export type IGestureCallable = (payload: IGestureCallablePayload) => void;
export type IGestureEvents = MouseEvent | TouchEvent;
export type IGestureEventCallable = (event: IGestureEvents) => void;
export type IGestureTrackingCallable = (event: IGestureTracking) => void;
export interface IGestureOptions {
    threshold?: number;
    longPressTimeout?: number;
    diagonal?: boolean;
}
export interface IGestureTracking {
    event?: IGestureEvents;
    type?: GestureType;
    x: number;
    y: number;
}
export type IGestureEventBaseMap = {
    start: IGestureTracking;
    end: IGestureTracking;
    tracking: IGestureTracking;
    any: IGestureCallablePayload;
};
export type IGestureEventMap = IGestureEventBaseMap & {
    [K in GestureType]: IGestureCallablePayload;
};
export interface IGestureActionable {
    slideLeft(callable: IGestureCallable): this;
    slideRight(callable: IGestureCallable): this;
    slideTop(callable: IGestureCallable): this;
    slideBottom(callable: IGestureCallable): this;
    slideTopLeft(callable: IGestureCallable): this;
    slideTopRight(callable: IGestureCallable): this;
    slideBottomLeft(callable: IGestureCallable): this;
    slideBottomRight(callable: IGestureCallable): this;
    slideX(callable: IGestureCallable): this;
    slideY(callable: IGestureCallable): this;
    swipe(callable: IGestureCallable): this;
    swing(callable: IGestureCallable): this;
    zoomIn(callable: IGestureCallable): this;
    zoomOut(callable: IGestureCallable): this;
    doubleTap(callable: IGestureCallable): this;
    longPress(callable: IGestureCallable): this;
}
export interface IGesture<E extends HTMLElement, A extends IAttributes> extends IGestureActionable {
    readonly widget: IWidgetNode<E, A>;
    get options(): IGestureOptions;
    option<K extends keyof IGestureOptions>(key: K, value: IGestureOptions[K]): this;
    dispatch<K extends GestureType>(type: K, detail: IGestureDetail): this;
    listen<K extends GestureType>(type: K, callable: IGestureCallable): this;
    any(callable: IGestureCallable): this;
    start(callable: IGestureTrackingCallable): this;
    tracking(callable: IGestureTrackingCallable): this;
    end(callable: IGestureTrackingCallable): this;
    destroy(): void;
}
