import {IWidgetNode} from "./widget.js";


export type ILayoutCallable<Props> = (props: Props) => IWidgetNode<any, any>;

export type ILayout<Scheme> = {
    [K in keyof Scheme]: ILayoutCallable<Scheme[K]>
}
