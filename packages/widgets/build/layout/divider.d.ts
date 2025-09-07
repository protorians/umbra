import { IAttributes, ICommonAttributes, IWidgetDeclaration, IWidgetNode } from "../types/index.js";
import { WidgetNode } from "../widget-node.js";
export declare class DividerWidget extends WidgetNode<HTMLElement, ICommonAttributes> {
    get tag(): string;
    static mount<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>): IWidgetNode<E, A> | undefined;
}
export declare function Divider(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes>): DividerWidget;
