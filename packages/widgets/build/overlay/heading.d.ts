import { WidgetNode } from "../widget-node.js";
import type { IHeadingAttributes, IStyleSheetDeclarations, IWidgetDeclaration } from "../types/index.js";
export declare class SmallHeadingWidget extends WidgetNode<HTMLHeadElement, IHeadingAttributes> {
    get tag(): string;
    static get style(): IStyleSheetDeclarations;
}
export declare class HeadingWidget extends WidgetNode<HTMLHeadElement, IHeadingAttributes> {
    get tag(): string;
    static get style(): IStyleSheetDeclarations;
}
export declare class LargeHeadingWidget extends WidgetNode<HTMLHeadElement, IHeadingAttributes> {
    get tag(): string;
    static get style(): IStyleSheetDeclarations;
}
export declare function SmallHeading(declaration: IWidgetDeclaration<HTMLElement, IHeadingAttributes>): SmallHeadingWidget;
export declare function Heading(declaration: IWidgetDeclaration<HTMLElement, IHeadingAttributes>): HeadingWidget;
export declare function LargeHeading(declaration: IWidgetDeclaration<HTMLElement, IHeadingAttributes>): LargeHeadingWidget;
