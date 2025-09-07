import { IWidgetNode } from "@protorians/widgets";
import { PositioningOptions } from "../types/index.js";
export declare class UiPositioning {
    static alwaysOnScreen(widget: IWidgetNode<any, any>, { gap, left, bottom, right, top, persist, origin }: PositioningOptions): void;
}
