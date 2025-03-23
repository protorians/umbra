import {Aligning, PositionX, PositionY} from "@protorians/widgets"


class UiPosition {

    static get Center(): [PositionX, PositionY] {
        return [PositionX.Center, PositionY.Center]
    }

    static get LeftTop(): [PositionX, PositionY] {
        return [PositionX.Left, PositionY.Top]
    }

    static get LeftCenter(): [PositionX, PositionY] {
        return [PositionX.Left, PositionY.Center]
    }

    static get LeftBottom(): [PositionX, PositionY] {
        return [PositionX.Left, PositionY.Bottom]
    }

    static get RightTop(): [PositionX, PositionY] {
        return [PositionX.Right, PositionY.Top]
    }

    static get RightCenter(): [PositionX, PositionY] {
        return [PositionX.Right, PositionY.Center]
    }

    static get RightBottom(): [PositionX, PositionY] {
        return [PositionX.Right, PositionY.Bottom]
    }

}


export class WidgetUi {

    static Position = UiPosition;

    static horizontally(x?: PositionX) {
        switch (x ? x : PositionX.Center) {
            case PositionX.Left:
                return Aligning.FlexStart;
            case PositionX.Right:
                return Aligning.FlexEnd;
            default:
                return Aligning.Center;
        }
    }

    static vertically(y?: PositionY) {
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