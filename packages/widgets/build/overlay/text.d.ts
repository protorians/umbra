import { WidgetNode } from "../widget-node.js";
import type { IItalicAttributes, ILinkAttributes, ISpanAttributes, IStrongAttributes, IStyleSheetDeclarations, IWidgetDeclaration } from "../types/index.js";
export declare class LinkWidget extends WidgetNode<HTMLAnchorElement, ILinkAttributes> {
    get tag(): string;
    get kind(): string;
}
export declare class StrongTextWidget extends WidgetNode<HTMLElement, IStrongAttributes> {
    get tag(): string;
    get kind(): string;
}
export declare class ItalicTextWidget extends WidgetNode<HTMLElement, IItalicAttributes> {
    get tag(): string;
    get kind(): string;
}
export declare class SmallerTextWidget extends WidgetNode<HTMLSpanElement, ISpanAttributes> {
    get tag(): string;
    get kind(): string;
    static get style(): IStyleSheetDeclarations;
}
export declare class SmallTextWidget extends WidgetNode<HTMLSpanElement, ISpanAttributes> {
    get tag(): string;
    get kind(): string;
    static get style(): IStyleSheetDeclarations;
}
export declare class TextWidget extends WidgetNode<HTMLSpanElement, ISpanAttributes> {
    get tag(): string;
    get kind(): string;
}
export declare class LargeTextWidget extends WidgetNode<HTMLSpanElement, ISpanAttributes> {
    get tag(): string;
    get kind(): string;
    static get style(): IStyleSheetDeclarations;
}
export declare class LargerTextWidget extends WidgetNode<HTMLSpanElement, ISpanAttributes> {
    get tag(): string;
    get kind(): string;
    static get style(): IStyleSheetDeclarations;
}
export declare function Link(declaration: IWidgetDeclaration<HTMLAnchorElement, ILinkAttributes>): LinkWidget;
export declare function SmallerText(declaration: IWidgetDeclaration<HTMLElement, ISpanAttributes>): SmallerTextWidget;
export declare function SmallText(declaration: IWidgetDeclaration<HTMLSpanElement, ISpanAttributes>): SmallTextWidget;
export declare function Text(declaration: IWidgetDeclaration<HTMLSpanElement, ISpanAttributes>): TextWidget;
export declare function Span(declaration: IWidgetDeclaration<HTMLSpanElement, ISpanAttributes>): TextWidget;
export declare function LargeText(declaration: IWidgetDeclaration<HTMLSpanElement, ISpanAttributes>): LargeTextWidget;
export declare function LargerText(declaration: IWidgetDeclaration<HTMLSpanElement, ISpanAttributes>): LargerTextWidget;
export declare function StrongText(declaration: IWidgetDeclaration<HTMLElement, IStrongAttributes>): StrongTextWidget;
export declare function ItalicText(declaration: Omit<IWidgetDeclaration<HTMLElement, IItalicAttributes>, 'children'>): ItalicTextWidget;
