import type { IAttributes, IColumnAttributes, ICommonAttributes, IRowAttributes, IWidgetDeclaration, IWidgetNode } from "../types/index.js";
import { WidgetNode } from "../widget-node.js";
export declare class StackWidget extends WidgetNode<HTMLElement, ICommonAttributes> {
    get tag(): string;
    static mount<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>): IWidgetNode<E, A> | undefined;
}
export declare class RowStackWidget extends WidgetNode<HTMLHeadElement, IRowAttributes> {
    get tag(): string;
    static mount<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>): IWidgetNode<E, A> | undefined;
}
export declare class ColumnStackWidget extends WidgetNode<HTMLHeadElement, IColumnAttributes> {
    get tag(): string;
    static mount<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>): IWidgetNode<E, A> | undefined;
}
export declare function Stack(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes>): StackWidget;
export declare function Row(declaration: IWidgetDeclaration<HTMLElement, IRowAttributes>): RowStackWidget;
export declare function Column(declaration: IWidgetDeclaration<HTMLElement, IColumnAttributes>): ColumnStackWidget;
