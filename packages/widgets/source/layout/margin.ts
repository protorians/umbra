import {type IEdgeInsetAttributes, IWidgetNode} from "../types/index.js";
import {EdgeInsets} from "./edge-insets.js";

export function Margin({children, ratio, y, x, size}: IEdgeInsetAttributes) {
    const {x: h, y: v} = EdgeInsets({ratio, x, y, size});
    return children.style({margin: `${v}px ${h}px`});
}

Margin.xs = (children: IWidgetNode<any, any>) => Margin({ratio: 0.25, children});
Margin.sm = (children: IWidgetNode<any, any>) => Margin({ratio: 0.5, children});
Margin.md = (children: IWidgetNode<any, any>) => Margin({ratio: 1, children});
Margin.lg = (children: IWidgetNode<any, any>) => Margin({ratio: 2, children});
Margin.xl = (children: IWidgetNode<any, any>) => Margin({ratio: 4, children});