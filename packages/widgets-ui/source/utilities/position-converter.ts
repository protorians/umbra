import {Axis2D, EdgePosition, FloatPosition, PositionX, PositionY} from "@protorians/widgets";


export function convertAlignementToAxisPosition(
    axis: Axis2D,
    alignment: EdgePosition
): PositionX | PositionY {
    switch (alignment) {
        case EdgePosition.Start:
            return axis === Axis2D.X ? PositionX.Left : PositionY.Top;

        case EdgePosition.Center:
            return axis === Axis2D.X ? PositionX.Center : PositionY.Center;

        case EdgePosition.End:
            return axis === Axis2D.X ? PositionX.Right : PositionY.Bottom;

    }
}

export function convertToArrayPosition(
    position: FloatPosition,
    alignment: EdgePosition,
): [PositionX, PositionY] {
    switch (position) {

        case FloatPosition.Top:
            return [
                convertAlignementToAxisPosition(Axis2D.X, alignment) as PositionX,
                PositionY.Top
            ];

        case FloatPosition.Right:
            return [
                PositionX.Right,
                convertAlignementToAxisPosition(Axis2D.Y, alignment) as PositionY,
            ];

        case FloatPosition.Bottom:
            return [
                convertAlignementToAxisPosition(Axis2D.X, alignment) as PositionX,
                PositionY.Bottom
            ];

        case FloatPosition.Left:
            return [
                PositionX.Left,
                convertAlignementToAxisPosition(Axis2D.Y, alignment) as PositionY,
            ];

    }
}