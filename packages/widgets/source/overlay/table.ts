import type {
  ICommonAttributes,
  ITableAttributes,
  ITableCaptionAttributes,
  ITableCellAttributes,
  ITableRowAttributes, IWidgetDeclaration
} from "../types/index.js";
import {WidgetNode} from "../widget-node.js";
import {Composable, Mountable} from "../decorators.js";

/**
 * @description Table Widget
 */
@Mountable()
@Composable()
export class TableWidget extends WidgetNode<HTMLTableElement, ITableAttributes> {
  get tag(): string {
    return 'table'
  };
}

/**
 * @description Construct's Function of `TableWidget`
 * @param declaration
 * @constructor
 */
export function Table(declaration: IWidgetDeclaration<HTMLTableElement, ITableAttributes>): TableWidget {
  return new TableWidget(declaration)
}


/**
 * @description Table Head Row Widget
 */
@Mountable()
@Composable()
export class TableHeadWidget extends WidgetNode<HTMLTableRowElement, ITableRowAttributes> {
  get tag(): string {
    return 'thead'
  };
}

/**
 * @description Construct's Function of `TableHeadWidget`
 * @param declaration
 * @constructor
 */
export function TableHead(declaration: IWidgetDeclaration<HTMLTableRowElement, ITableRowAttributes>): TableHeadWidget {
  return new TableHeadWidget(declaration)
}

/**
 * @description Table Head Row Widget
 */
@Mountable()
@Composable()
export class TableHeadCellWidget extends WidgetNode<HTMLTableCellElement, ITableCellAttributes> {
  get tag(): string {
    return 'th'
  };
}

/**
 * @description Construct's Function of `TableHeadCellWidget`
 * @param declaration
 * @constructor
 */
export function TableHeadCell(declaration: IWidgetDeclaration<HTMLTableCellElement, ITableCellAttributes>): TableHeadCellWidget {
  return new TableHeadCellWidget(declaration)
}

/**
 * @description Table Head Row Widget
 */
@Mountable()
@Composable()
export class TableFootWidget extends WidgetNode<HTMLTableRowElement, ITableRowAttributes> {
  get tag(): string {
    return 'tfoot'
  };
}

/**
 * @description Construct's Function of `TableFootWidget`
 * @param declaration
 * @constructor
 */
export function TableFoot(declaration: IWidgetDeclaration<HTMLTableRowElement, ITableRowAttributes>): TableFootWidget {
  return new TableFootWidget(declaration)
}

/**
 * @description Table Head Row Widget
 */
@Mountable()
@Composable()
export class TableRowWidget extends WidgetNode<HTMLTableRowElement, ITableRowAttributes> {
  get tag(): string {
    return 'tr'
  };
}

/**
 * @description Construct's Function of `TableRowWidget`
 * @param declaration
 * @constructor
 */
export function TableRow(declaration: IWidgetDeclaration<HTMLTableRowElement, ITableRowAttributes>): TableRowWidget {
  return new TableRowWidget(declaration)
}

/**
 * @description Table Head Row Widget
 */
@Mountable()
@Composable()
export class TableCellWidget extends WidgetNode<HTMLTableCellElement, ITableCellAttributes> {
  get tag(): string {
    return 'td'
  };
}

/**
 * @description Construct's Function of `TableCellWidget`
 * @param declaration
 * @constructor
 */
export function TableCell(declaration: IWidgetDeclaration<HTMLTableCellElement, ITableCellAttributes>): TableCellWidget {
  return new TableCellWidget(declaration)
}

/**
 * @description Table Head Row Widget
 */
@Mountable()
@Composable()
export class TableCaptionWidget extends WidgetNode<HTMLTableCaptionElement, ITableCaptionAttributes> {
  get tag(): string {
    return 'caption'
  };
}

/**
 * @description Construct's Function of `TableCaptionWidget`
 * @param declaration
 * @constructor
 */
export function TableCaption(declaration: IWidgetDeclaration<HTMLTableCaptionElement, ITableCaptionAttributes>): TableCaptionWidget {
  return new TableCaptionWidget(declaration)
}

/**
 * @description Table Head Row Widget
 */
@Mountable()
@Composable()
export class TableColumnGroupWidget extends WidgetNode<HTMLTableColElement, ICommonAttributes> {
  get tag(): string {
    return 'colgroup'
  };
}

/**
 * @description Construct's Function of `TableColumnGroupWidget`
 * @param declaration
 * @constructor
 */
export function TableColumnGroup(declaration: IWidgetDeclaration<HTMLTableColElement, ICommonAttributes>): TableColumnGroupWidget {
  return new TableColumnGroupWidget(declaration)
}

/**
 * @description Table Head Row Widget
 */
@Mountable()
@Composable()
export class TableColumnWidget extends WidgetNode<HTMLTableColElement, ICommonAttributes> {
  get tag(): string {
    return 'col'
  };
}

/**
 * @description Construct's Function of `TableColumnWidget`
 * @param declaration
 * @constructor
 */
export function TableColumn(declaration: IWidgetDeclaration<HTMLTableColElement, ICommonAttributes>): TableColumnWidget {
  return new TableColumnWidget(declaration)
}
