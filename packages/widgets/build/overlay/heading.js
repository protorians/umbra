var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Composable, Mountable } from "../decorators.js";
import { WidgetNode } from "../widget-node.js";
let SmallHeadingWidget = class SmallHeadingWidget extends WidgetNode {
    get tag() {
        return 'h3';
    }
    ;
    static get style() {
        return {
            fontSize: `x-large`
        };
    }
};
SmallHeadingWidget = __decorate([
    Mountable(),
    Composable()
], SmallHeadingWidget);
export { SmallHeadingWidget };
let HeadingWidget = class HeadingWidget extends WidgetNode {
    get tag() {
        return 'h2';
    }
    ;
    static get style() {
        return {
            fontSize: `xx-large`
        };
    }
};
HeadingWidget = __decorate([
    Mountable(),
    Composable()
], HeadingWidget);
export { HeadingWidget };
let LargeHeadingWidget = class LargeHeadingWidget extends WidgetNode {
    get tag() {
        return 'h1';
    }
    ;
    static get style() {
        return {
            fontSize: `xxx-large`
        };
    }
};
LargeHeadingWidget = __decorate([
    Mountable(),
    Composable()
], LargeHeadingWidget);
export { LargeHeadingWidget };
export function SmallHeading(declaration) {
    return new SmallHeadingWidget(declaration);
}
export function Heading(declaration) {
    return new HeadingWidget(declaration);
}
export function LargeHeading(declaration) {
    return new LargeHeadingWidget(declaration);
}
