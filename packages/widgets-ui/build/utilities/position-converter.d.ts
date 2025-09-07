import { Axis2D, EdgePosition, FloatPosition, PositionX, PositionY } from "@protorians/widgets";
export declare function convertAlignementToAxisPosition(axis: Axis2D, alignment: EdgePosition): PositionX | PositionY;
export declare function convertToArrayPosition(position: FloatPosition, alignment: EdgePosition): [PositionX, PositionY];
