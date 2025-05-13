import {IWidgetNode} from "./widget.js";
import {IState} from "./state.js";


export type ILayoutCallable<Props> = (props?: Props) => IWidgetNode<any, any>;

export type ILayout<Scheme> = {
    [K in keyof Scheme]: ILayoutCallable<Scheme[K]>
}

export type ILayoutStates<Scheme> = {
    [K in keyof Scheme]: IState<Scheme[K] | undefined>
}
