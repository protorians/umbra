import { Aligning, PositionX, PositionY } from "@protorians/widgets";
declare class UiPosition {
    static get Center(): [PositionX, PositionY];
    static get LeftTop(): [PositionX, PositionY];
    static get LeftCenter(): [PositionX, PositionY];
    static get LeftBottom(): [PositionX, PositionY];
    static get RightTop(): [PositionX, PositionY];
    static get RightCenter(): [PositionX, PositionY];
    static get RightBottom(): [PositionX, PositionY];
}
export declare class WidgetUi {
    static Position: typeof UiPosition;
    static horizontally(x?: PositionX): Aligning.Center | Aligning.FlexStart | Aligning.FlexEnd;
    static vertically(y?: PositionY): Aligning.Center | Aligning.FlexStart | Aligning.FlexEnd;
}
export {};
