import { type IEdgeInsetAttributes, IWidgetNode } from "../types/index.js";
export declare function Margin({ children, ratio, y, x, size }: IEdgeInsetAttributes): IWidgetNode<any, any> | undefined;
export declare namespace Margin {
    var xs: (children: IWidgetNode<any, any> | undefined) => IWidgetNode<any, any> | undefined;
    var sm: (children: IWidgetNode<any, any> | undefined) => IWidgetNode<any, any> | undefined;
    var md: (children: IWidgetNode<any, any> | undefined) => IWidgetNode<any, any> | undefined;
    var lg: (children: IWidgetNode<any, any> | undefined) => IWidgetNode<any, any> | undefined;
    var xl: (children: IWidgetNode<any, any> | undefined) => IWidgetNode<any, any> | undefined;
}
