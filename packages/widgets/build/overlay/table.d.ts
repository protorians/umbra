import type { ICommonAttributes, ITableAttributes, ITableCaptionAttributes, ITableCellAttributes, ITableRowAttributes, IWidgetDeclaration } from "../types/index.js";
import { WidgetNode } from "../widget-node.js";
export declare class TableWidget extends WidgetNode<HTMLTableElement, ITableAttributes> {
    get tag(): string;
}
export declare function Table(declaration: IWidgetDeclaration<HTMLTableElement, ITableAttributes>): TableWidget;
export declare class TableHeadWidget extends WidgetNode<HTMLTableRowElement, ITableRowAttributes> {
    get tag(): string;
}
export declare function TableHead(declaration: IWidgetDeclaration<HTMLTableRowElement, ITableRowAttributes>): TableHeadWidget;
export declare class TableHeadCellWidget extends WidgetNode<HTMLTableCellElement, ITableCellAttributes> {
    get tag(): string;
}
export declare function TableHeadCell(declaration: IWidgetDeclaration<HTMLTableCellElement, ITableCellAttributes>): TableHeadCellWidget;
export declare class TableFootWidget extends WidgetNode<HTMLTableRowElement, ITableRowAttributes> {
    get tag(): string;
}
export declare function TableFoot(declaration: IWidgetDeclaration<HTMLTableRowElement, ITableRowAttributes>): TableFootWidget;
export declare class TableRowWidget extends WidgetNode<HTMLTableRowElement, ITableRowAttributes> {
    get tag(): string;
}
export declare function TableRow(declaration: IWidgetDeclaration<HTMLTableRowElement, ITableRowAttributes>): TableRowWidget;
export declare class TableCellWidget extends WidgetNode<HTMLTableCellElement, ITableCellAttributes> {
    get tag(): string;
}
export declare function TableCell(declaration: IWidgetDeclaration<HTMLTableCellElement, ITableCellAttributes>): TableCellWidget;
export declare class TableCaptionWidget extends WidgetNode<HTMLTableCaptionElement, ITableCaptionAttributes> {
    get tag(): string;
}
export declare function TableCaption(declaration: IWidgetDeclaration<HTMLTableCaptionElement, ITableCaptionAttributes>): TableCaptionWidget;
export declare class TableColumnGroupWidget extends WidgetNode<HTMLTableColElement, ICommonAttributes> {
    get tag(): string;
}
export declare function TableColumnGroup(declaration: IWidgetDeclaration<HTMLTableColElement, ICommonAttributes>): TableColumnGroupWidget;
export declare class TableColumnWidget extends WidgetNode<HTMLTableColElement, ICommonAttributes> {
    get tag(): string;
}
export declare function TableColumn(declaration: IWidgetDeclaration<HTMLTableColElement, ICommonAttributes>): TableColumnWidget;
