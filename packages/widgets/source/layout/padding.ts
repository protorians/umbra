import {type IEdgeInsetAttributes, IWidgetNode} from "../types/index.js";
import {EdgeInsets} from "./edge-insets.js";

export function Padding({children, ratio, y, x, size}: IEdgeInsetAttributes) {
    const {x: h, y: v} = EdgeInsets({ratio, x, y, size});
    return children.style({padding: `${v}px ${h}px`});
}

Padding.xs = (children: IWidgetNode<any, any>) => Padding({ratio: 0.25, children});
Padding.sm = (children: IWidgetNode<any, any>) => Padding({ratio: 0.5, children});
Padding.md = (children: IWidgetNode<any, any>) => Padding({ratio: 1, children});
Padding.lg = (children: IWidgetNode<any, any>) => Padding({ratio: 2, children});
Padding.xl = (children: IWidgetNode<any, any>) => Padding({ratio: 4, children});