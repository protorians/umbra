var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { WidgetNode } from "../widget-node.js";
import { Composable, Mountable } from "../decorators.js";
import { AligningDirection } from "../enums.js";
let DividerWidget = class DividerWidget extends WidgetNode {
    get tag() {
        return 'div';
    }
    ;
    static mount(widget) {
        const size = widget.props.features?.size || 1;
        const direction = widget.props.features?.direction || AligningDirection.Row;
        if (size && (typeof size == 'string' || typeof size == 'number') && direction) {
            const style = {};
            if (direction == AligningDirection.Column)
                style.height = size;
            else
                style.width = size;
            widget.style(style);
        }
        return widget;
    }
};
DividerWidget = __decorate([
    Mountable(),
    Composable()
], DividerWidget);
export { DividerWidget };
export function Divider(declaration) {
    return new DividerWidget(declaration);
}
