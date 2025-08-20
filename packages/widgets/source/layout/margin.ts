import {type IEdgeInsetAttributes, IWidgetNode} from "../types/index.js";
import {EdgeInsets} from "./edge-insets.js";
import {StyleWidget} from "../style.js";

export function Margin({children, ratio, y, x, size}: IEdgeInsetAttributes) {
    const {x: h, y: v} = EdgeInsets({ratio, x, y, size});
    return children?.style({margin: `${StyleWidget.unit(v||1)} ${StyleWidget.unit(h||1)} !important`});
}

Margin.xs = (children: IWidgetNode<any, any> | undefined) => Margin({ratio: 0.25, children});
Margin.sm = (children: IWidgetNode<any, any> | undefined) => Margin({ratio: 0.5, children});
Margin.md = (children: IWidgetNode<any, any> | undefined) => Margin({ratio: 1, children});
Margin.lg = (children: IWidgetNode<any, any> | undefined) => Margin({ratio: 2, children});
Margin.xl = (children: IWidgetNode<any, any> | undefined) => Margin({ratio: 4, children});