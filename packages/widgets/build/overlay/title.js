var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Composable, Mountable } from "../decorators.js";
import { WidgetNode } from "../widget-node.js";
let SubTitleWidget = class SubTitleWidget extends WidgetNode {
    get tag() {
        return 'span';
    }
    ;
    static get style() {
        return {
            fontSize: `x-large`
        };
    }
};
SubTitleWidget = __decorate([
    Mountable(),
    Composable()
], SubTitleWidget);
export { SubTitleWidget };
let TitleWidget = class TitleWidget extends WidgetNode {
    get tag() {
        return 'span';
    }
    ;
    static get style() {
        return {
            fontSize: `xx-large`
        };
    }
};
TitleWidget = __decorate([
    Mountable(),
    Composable()
], TitleWidget);
export { TitleWidget };
let HugeTitleWidget = class HugeTitleWidget extends WidgetNode {
    get tag() {
        return 'span';
    }
    ;
    static get style() {
        return {
            fontSize: `xxx-large`
        };
    }
};
HugeTitleWidget = __decorate([
    Mountable(),
    Composable()
], HugeTitleWidget);
export { HugeTitleWidget };
export function SubTitle(declaration) {
    return new SubTitleWidget(declaration);
}
export function Title(declaration) {
    return new TitleWidget(declaration);
}
export function HugeTitle(declaration) {
    return new HugeTitleWidget(declaration);
}
