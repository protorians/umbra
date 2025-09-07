var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { WidgetNode } from "../widget-node.js";
import { Composable, Mountable } from "../decorators.js";
import { declarationExplodes } from "../helpers/index.js";
import { Style } from "../style.js";
import { TextUtility } from "@protorians/core";
let GridWidget = class GridWidget extends WidgetNode {
    get tag() {
        return 'div';
    }
    ;
    static mount(widget) {
        widget.style({ display: 'grid', });
        return widget;
    }
};
GridWidget = __decorate([
    Mountable(),
    Composable()
], GridWidget);
export { GridWidget };
export function Grid(declarations) {
    const { declaration, extended } = declarationExplodes(declarations, [
        'grid',
        'area',
        'column',
        'columnStart',
        'columnEnd',
        'row',
        'rowStart',
        'rowEnd',
        'template',
        'templateRows',
        'templateColumns',
        'templateAreas',
        'gap',
        'autoRows',
        'autoColumns',
        'autoFlow',
    ]);
    const props = {};
    Object.entries(extended).forEach(([key, value]) => props[`grid${TextUtility.ucFirstLetter(key)}`] = value);
    declaration.style = Style({}).merge(declaration.style || {}).merge({ ...props });
    return new GridWidget(declaration);
}
