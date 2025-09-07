import { WidgetNode } from "../widget-node.js";
import type { ISpanAttributes, IStyleSheetDeclarations, IWidgetDeclaration } from "../types/index.js";
export declare class SubTitleWidget extends WidgetNode<HTMLSpanElement, ISpanAttributes> {
    get tag(): string;
    static get style(): IStyleSheetDeclarations;
}
export declare class TitleWidget extends WidgetNode<HTMLSpanElement, ISpanAttributes> {
    get tag(): string;
    static get style(): IStyleSheetDeclarations;
}
export declare class HugeTitleWidget extends WidgetNode<HTMLSpanElement, ISpanAttributes> {
    get tag(): string;
    static get style(): IStyleSheetDeclarations;
}
export declare function SubTitle(declaration: IWidgetDeclaration<HTMLElement, ISpanAttributes>): SubTitleWidget;
export declare function Title(declaration: IWidgetDeclaration<HTMLElement, ISpanAttributes>): TitleWidget;
export declare function HugeTitle(declaration: IWidgetDeclaration<HTMLElement, ISpanAttributes>): HugeTitleWidget;
