import { IWidgetNode } from "@protorians/widgets";
export interface PositioningCoordinate<T> {
    left?: T;
    top?: T;
    right?: T;
    bottom?: T;
}
export interface PositioningOptions extends PositioningCoordinate<number> {
    gap?: number;
    persist?: boolean;
    origin?: IWidgetNode<any, any>;
}
