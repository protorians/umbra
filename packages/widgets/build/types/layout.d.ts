import { IWidgetNode } from "./widget.js";
import { IState } from "./state.js";
export type ILayoutCallable<Props> = (props?: Props) => IWidgetNode<any, any>;
export type ILayout<Scheme> = {
    [K in keyof Scheme]: ILayoutCallable<Scheme[K]>;
};
export type ILayoutStates<Scheme> = {
    [K in keyof Scheme]: IState<Scheme[K] | undefined>;
};
export interface IEdgeInset {
    x?: number;
    y?: number;
    ratio?: number;
    size?: number;
}
export interface IEdgeInsetValue {
    x?: number;
    y?: number;
}
export interface IEdgeInsetAttributes extends IEdgeInset {
    children: IWidgetNode<any, any> | undefined;
}
