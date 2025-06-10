import {type IEdgeInsetAttributes, IWidgetNode} from "../types/index.js";
import {EdgeInsets} from "./edge-insets.js";

export function Padding({children, ratio, y, x, size}: IEdgeInsetAttributes) {
    const {x: h, y: v} = EdgeInsets({ratio, x, y, size});
    return children.style({padding: `${v}px ${h}px`});
}

Padding.XS = (children: IWidgetNode<any, any>) => Padding({ratio: 0.25, children});
Padding.SM = (children: IWidgetNode<any, any>) => Padding({ratio: 0.5, children});
Padding.MD = (children: IWidgetNode<any, any>) => Padding({ratio: 1, children});
Padding.LG = (children: IWidgetNode<any, any>) => Padding({ratio: 2, children});
Padding.XL = (children: IWidgetNode<any, any>) => Padding({ratio: 4, children});