var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Composable, Mountable } from "../decorators.js";
import { WidgetNode } from "../widget-node.js";
import { widgetAligningDirectionFeature, widgetAligningFeature, } from "../helpers/index.js";
import { AligningProperty } from "../enums.js";
import { Widget } from "../collections.js";
let StackWidget = class StackWidget extends WidgetNode {
    get tag() {
        return 'div';
    }
    ;
    static mount(widget) {
        widget.style({
            display: 'flex',
            ...widgetAligningDirectionFeature(widget),
            ...widgetAligningFeature(widget, [
                AligningProperty.AlignItems,
                AligningProperty.JustifyContent,
            ]),
        });
        return widget;
    }
};
StackWidget = __decorate([
    Mountable(),
    Composable()
], StackWidget);
export { StackWidget };
let RowStackWidget = class RowStackWidget extends WidgetNode {
    get tag() {
        return 'div';
    }
    ;
    static mount(widget) {
        widget.style({
            display: 'flex',
            flexDirection: 'row',
            ...widgetAligningFeature(widget, [
                AligningProperty.JustifyContent,
            ]),
        });
        return widget;
    }
};
RowStackWidget = __decorate([
    Mountable(),
    Composable(Widget, 'Stack')
], RowStackWidget);
export { RowStackWidget };
let ColumnStackWidget = class ColumnStackWidget extends WidgetNode {
    get tag() {
        return 'div';
    }
    ;
    static mount(widget) {
        widget.style({
            display: 'flex',
            flexDirection: 'column',
            ...widgetAligningFeature(widget, [
                AligningProperty.AlignItems,
            ]),
        });
        return widget;
    }
};
ColumnStackWidget = __decorate([
    Mountable(),
    Composable(Widget, 'Stack')
], ColumnStackWidget);
export { ColumnStackWidget };
export function Stack(declaration) {
    return new StackWidget(declaration);
}
export function Row(declaration) {
    return new RowStackWidget(declaration);
}
export function Column(declaration) {
    return new ColumnStackWidget(declaration);
}
