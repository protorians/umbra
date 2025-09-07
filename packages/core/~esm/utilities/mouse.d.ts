import { IMouseCoordinate, IMouseEvent } from "../types/index.js";
export declare namespace MouseUtility {
    function coordinate(e: IMouseEvent): IMouseCoordinate;
    function coordinates(e: MouseEvent | TouchEvent): IMouseCoordinate[];
}
