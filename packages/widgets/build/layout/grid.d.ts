import { WidgetNode } from "../widget-node.js";
import type { IAttributes, IGridAttributes, IWidgetDeclaration, IWidgetNode } from "../types/index.js";
export declare class GridWidget extends WidgetNode<HTMLElement, IGridAttributes> {
    get tag(): string;
    static mount<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>): IWidgetNode<E, A> | undefined;
}
export declare function Grid(declarations: IWidgetDeclaration<HTMLElement, IGridAttributes>): GridWidget;
