import {IMouseCoordinate, IMouseEvent} from "../types";

export namespace MouseUtility {
    export function coordinate(e: IMouseEvent): IMouseCoordinate {
        if (e instanceof TouchEvent) {
            return {
                x: e.touches[0].clientX, y: e.touches[0].clientY
            }
        } else {
            return {
                x: e.clientX, y: e.clientY
            }
        }
    }

    export function coordinates(e: MouseEvent | TouchEvent): IMouseCoordinate[] {
        if (e instanceof TouchEvent) {
            return Object.values(e.touches).map(touch => {
                return {x: touch.clientX, y: touch.clientY};
            })

        } else {
            return [{x: e.clientX, y: e.clientY}]
        }
    }
}