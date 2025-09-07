var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { WidgetNode } from "../widget-node.js";
import { Composable, Mountable } from "../decorators.js";
let TableWidget = class TableWidget extends WidgetNode {
    get tag() {
        return 'table';
    }
    ;
};
TableWidget = __decorate([
    Mountable(),
    Composable()
], TableWidget);
export { TableWidget };
export function Table(declaration) {
    return new TableWidget(declaration);
}
let TableHeadWidget = class TableHeadWidget extends WidgetNode {
    get tag() {
        return 'thead';
    }
    ;
};
TableHeadWidget = __decorate([
    Mountable(),
    Composable()
], TableHeadWidget);
export { TableHeadWidget };
export function TableHead(declaration) {
    return new TableHeadWidget(declaration);
}
let TableHeadCellWidget = class TableHeadCellWidget extends WidgetNode {
    get tag() {
        return 'th';
    }
    ;
};
TableHeadCellWidget = __decorate([
    Mountable(),
    Composable()
], TableHeadCellWidget);
export { TableHeadCellWidget };
export function TableHeadCell(declaration) {
    return new TableHeadCellWidget(declaration);
}
let TableFootWidget = class TableFootWidget extends WidgetNode {
    get tag() {
        return 'tfoot';
    }
    ;
};
TableFootWidget = __decorate([
    Mountable(),
    Composable()
], TableFootWidget);
export { TableFootWidget };
export function TableFoot(declaration) {
    return new TableFootWidget(declaration);
}
let TableRowWidget = class TableRowWidget extends WidgetNode {
    get tag() {
        return 'tr';
    }
    ;
};
TableRowWidget = __decorate([
    Mountable(),
    Composable()
], TableRowWidget);
export { TableRowWidget };
export function TableRow(declaration) {
    return new TableRowWidget(declaration);
}
let TableCellWidget = class TableCellWidget extends WidgetNode {
    get tag() {
        return 'td';
    }
    ;
};
TableCellWidget = __decorate([
    Mountable(),
    Composable()
], TableCellWidget);
export { TableCellWidget };
export function TableCell(declaration) {
    return new TableCellWidget(declaration);
}
let TableCaptionWidget = class TableCaptionWidget extends WidgetNode {
    get tag() {
        return 'caption';
    }
    ;
};
TableCaptionWidget = __decorate([
    Mountable(),
    Composable()
], TableCaptionWidget);
export { TableCaptionWidget };
export function TableCaption(declaration) {
    return new TableCaptionWidget(declaration);
}
let TableColumnGroupWidget = class TableColumnGroupWidget extends WidgetNode {
    get tag() {
        return 'colgroup';
    }
    ;
};
TableColumnGroupWidget = __decorate([
    Mountable(),
    Composable()
], TableColumnGroupWidget);
export { TableColumnGroupWidget };
export function TableColumnGroup(declaration) {
    return new TableColumnGroupWidget(declaration);
}
let TableColumnWidget = class TableColumnWidget extends WidgetNode {
    get tag() {
        return 'col';
    }
    ;
};
TableColumnWidget = __decorate([
    Mountable(),
    Composable()
], TableColumnWidget);
export { TableColumnWidget };
export function TableColumn(declaration) {
    return new TableColumnWidget(declaration);
}
