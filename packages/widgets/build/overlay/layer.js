var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { WidgetNode } from "../widget-node.js";
import { Composable, Mountable } from "../decorators.js";
let SectionWidget = class SectionWidget extends WidgetNode {
    get tag() {
        return 'section';
    }
    ;
};
SectionWidget = __decorate([
    Mountable(),
    Composable()
], SectionWidget);
export { SectionWidget };
let AsideFrameWidget = class AsideFrameWidget extends WidgetNode {
    get tag() {
        return 'aside';
    }
    ;
};
AsideFrameWidget = __decorate([
    Mountable(),
    Composable()
], AsideFrameWidget);
export { AsideFrameWidget };
let HeaderFrameWidget = class HeaderFrameWidget extends WidgetNode {
    get tag() {
        return 'header';
    }
    ;
};
HeaderFrameWidget = __decorate([
    Mountable(),
    Composable()
], HeaderFrameWidget);
export { HeaderFrameWidget };
let NavbarWidget = class NavbarWidget extends WidgetNode {
    get tag() {
        return 'navbar';
    }
    ;
};
NavbarWidget = __decorate([
    Mountable(),
    Composable()
], NavbarWidget);
export { NavbarWidget };
let FooterFrameWidget = class FooterFrameWidget extends WidgetNode {
    get tag() {
        return 'footer';
    }
    ;
};
FooterFrameWidget = __decorate([
    Mountable(),
    Composable()
], FooterFrameWidget);
export { FooterFrameWidget };
let MainFrameWidget = class MainFrameWidget extends WidgetNode {
    get tag() {
        return 'main';
    }
    ;
};
MainFrameWidget = __decorate([
    Mountable(),
    Composable()
], MainFrameWidget);
export { MainFrameWidget };
export function Layer(declaration) {
    return new WidgetNode(declaration);
}
export function Section(declaration) {
    return new SectionWidget(declaration);
}
export function MainWidget(declaration) {
    return new MainFrameWidget(declaration);
}
export function HeaderWidget(declaration) {
    return new HeaderFrameWidget(declaration);
}
export function FooterWidget(declaration) {
    return new FooterFrameWidget(declaration);
}
export function AsideWidget(declaration) {
    return new AsideFrameWidget(declaration);
}
export function Navbar(declaration) {
    return new NavbarWidget(declaration);
}
