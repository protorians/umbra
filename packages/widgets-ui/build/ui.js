import { Aligning, PositionX, PositionY } from "@protorians/widgets";
class UiPosition {
    static get Center() {
        return [PositionX.Center, PositionY.Center];
    }
    static get LeftTop() {
        return [PositionX.Left, PositionY.Top];
    }
    static get LeftCenter() {
        return [PositionX.Left, PositionY.Center];
    }
    static get LeftBottom() {
        return [PositionX.Left, PositionY.Bottom];
    }
    static get RightTop() {
        return [PositionX.Right, PositionY.Top];
    }
    static get RightCenter() {
        return [PositionX.Right, PositionY.Center];
    }
    static get RightBottom() {
        return [PositionX.Right, PositionY.Bottom];
    }
}
export class WidgetUi {
    static Position = UiPosition;
    static horizontally(x) {
        switch (x ? x : PositionX.Center) {
            case PositionX.Left:
                return Aligning.FlexStart;
            case PositionX.Right:
                return Aligning.FlexEnd;
            default:
                return Aligning.Center;
        }
    }
    static vertically(y) {
        switch (y ? y || PositionY.Center : PositionY.Center) {
            case PositionY.Top:
                return Aligning.FlexStart;
            case PositionY.Bottom:
                return Aligning.FlexEnd;
            default:
                return Aligning.Center;
        }
    }
}
