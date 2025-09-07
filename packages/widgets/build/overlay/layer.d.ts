import type { ICommonAttributes, IWidgetDeclaration } from "../types/index.js";
import { WidgetNode } from "../widget-node.js";
export declare class SectionWidget extends WidgetNode<HTMLElement, ICommonAttributes> {
    get tag(): string;
}
export declare class AsideFrameWidget extends WidgetNode<HTMLElement, ICommonAttributes> {
    get tag(): string;
}
export declare class HeaderFrameWidget extends WidgetNode<HTMLElement, ICommonAttributes> {
    get tag(): string;
}
export declare class NavbarWidget extends WidgetNode<HTMLElement, ICommonAttributes> {
    get tag(): string;
}
export declare class FooterFrameWidget extends WidgetNode<HTMLElement, ICommonAttributes> {
    get tag(): string;
}
export declare class MainFrameWidget extends WidgetNode<HTMLElement, ICommonAttributes> {
    get tag(): string;
}
export declare function Layer(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes>): WidgetNode<HTMLElement, ICommonAttributes>;
export declare function Section(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes>): SectionWidget;
export declare function MainWidget(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes>): MainFrameWidget;
export declare function HeaderWidget(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes>): HeaderFrameWidget;
export declare function FooterWidget(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes>): FooterFrameWidget;
export declare function AsideWidget(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes>): AsideFrameWidget;
export declare function Navbar(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes>): NavbarWidget;
