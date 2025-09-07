import type { IButtonAttributes, IButtonAttributesBase, IWidgetDeclaration } from "../types/index.js";
import { WidgetNode } from "../widget-node.js";
export declare class ButtonWidget extends WidgetNode<HTMLButtonElement, IButtonAttributes> {
    get tag(): string;
}
export declare function Button(declaration: IWidgetDeclaration<HTMLButtonElement, IButtonAttributes & IButtonAttributesBase>): ButtonWidget;
