var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Composable, Mountable } from "../decorators.js";
import { WidgetNode } from "../widget-node.js";
let LinkWidget = class LinkWidget extends WidgetNode {
    get tag() {
        return 'a';
    }
    ;
    get kind() {
        return 'text';
    }
};
LinkWidget = __decorate([
    Mountable(),
    Composable()
], LinkWidget);
export { LinkWidget };
let StrongTextWidget = class StrongTextWidget extends WidgetNode {
    get tag() {
        return 'strong';
    }
    ;
    get kind() {
        return 'text';
    }
};
StrongTextWidget = __decorate([
    Mountable(),
    Composable()
], StrongTextWidget);
export { StrongTextWidget };
let ItalicTextWidget = class ItalicTextWidget extends WidgetNode {
    get tag() {
        return 'i';
    }
    ;
    get kind() {
        return 'text';
    }
};
ItalicTextWidget = __decorate([
    Mountable(),
    Composable()
], ItalicTextWidget);
export { ItalicTextWidget };
let SmallerTextWidget = class SmallerTextWidget extends WidgetNode {
    get tag() {
        return 'span';
    }
    ;
    get kind() {
        return 'text';
    }
    static get style() {
        return {
            fontSize: `smaller`
        };
    }
};
SmallerTextWidget = __decorate([
    Mountable(),
    Composable()
], SmallerTextWidget);
export { SmallerTextWidget };
let SmallTextWidget = class SmallTextWidget extends WidgetNode {
    get tag() {
        return 'span';
    }
    ;
    get kind() {
        return 'text';
    }
    static get style() {
        return {
            fontSize: `small`
        };
    }
};
SmallTextWidget = __decorate([
    Mountable(),
    Composable()
], SmallTextWidget);
export { SmallTextWidget };
let TextWidget = class TextWidget extends WidgetNode {
    get tag() {
        return 'span';
    }
    ;
    get kind() {
        return 'text';
    }
};
TextWidget = __decorate([
    Mountable(),
    Composable()
], TextWidget);
export { TextWidget };
let LargeTextWidget = class LargeTextWidget extends WidgetNode {
    get tag() {
        return 'span';
    }
    ;
    get kind() {
        return 'text';
    }
    static get style() {
        return {
            fontSize: `large`
        };
    }
};
LargeTextWidget = __decorate([
    Mountable(),
    Composable()
], LargeTextWidget);
export { LargeTextWidget };
let LargerTextWidget = class LargerTextWidget extends WidgetNode {
    get tag() {
        return 'span';
    }
    ;
    get kind() {
        return 'text';
    }
    static get style() {
        return {
            fontSize: `larger`
        };
    }
};
LargerTextWidget = __decorate([
    Mountable(),
    Composable()
], LargerTextWidget);
export { LargerTextWidget };
export function Link(declaration) {
    return new LinkWidget(declaration);
}
export function SmallerText(declaration) {
    return new SmallerTextWidget(declaration);
}
export function SmallText(declaration) {
    return new SmallTextWidget(declaration);
}
export function Text(declaration) {
    return new TextWidget(declaration);
}
export function Span(declaration) {
    return new TextWidget(declaration);
}
export function LargeText(declaration) {
    return new LargeTextWidget(declaration);
}
export function LargerText(declaration) {
    return new LargerTextWidget(declaration);
}
export function StrongText(declaration) {
    return new StrongTextWidget(declaration);
}
export function ItalicText(declaration) {
    return new ItalicTextWidget({ ...declaration, children: undefined });
}
