import type { IFormAttributes, IInputAttributes, ILabelAttributes, IOptionAttributes, IOptionGroupAttributes, ISelectAttributes, ITextareaAttributes, IWidgetDeclaration } from "../types/index.js";
import { WidgetNode } from "../widget-node.js";
export declare class FormWidget extends WidgetNode<HTMLFormElement, IFormAttributes> {
    get tag(): string;
}
export declare class LabelWidget extends WidgetNode<HTMLLabelElement, ILabelAttributes> {
    get tag(): string;
    get kind(): string;
}
export declare class InputWidget extends WidgetNode<HTMLInputElement, IInputAttributes> {
    get tag(): string;
    get kind(): string;
}
export declare class InputAreaWidget extends WidgetNode<HTMLTextAreaElement, ITextareaAttributes> {
    get tag(): string;
    get kind(): string;
}
export declare class SelectWidget extends WidgetNode<HTMLSelectElement, ISelectAttributes> {
    get tag(): string;
    get kind(): string;
}
export declare class OptionWidget extends WidgetNode<HTMLOptionElement, IOptionAttributes> {
    get tag(): string;
    get kind(): string;
}
export declare function Option(declaration: Omit<IWidgetDeclaration<HTMLOptionElement, IOptionAttributes>, 'children'>): OptionWidget;
export declare class OptionGroupWidget extends WidgetNode<HTMLOptGroupElement, IOptionGroupAttributes> {
    get tag(): string;
}
export declare function Form(declaration: IWidgetDeclaration<HTMLFormElement, IFormAttributes>): FormWidget;
export declare function Label(declaration: IWidgetDeclaration<HTMLLabelElement, ILabelAttributes>): LabelWidget;
export declare function Input(declaration: Omit<IWidgetDeclaration<HTMLInputElement, IInputAttributes>, 'children'>): InputWidget;
export declare function InputArea(declaration: IWidgetDeclaration<HTMLTextAreaElement, ITextareaAttributes>): InputAreaWidget;
export declare function Select(declaration: IWidgetDeclaration<HTMLSelectElement, ISelectAttributes>): SelectWidget;
export declare function OptionGroup(declaration: IWidgetDeclaration<HTMLOptGroupElement, IOptionGroupAttributes>): OptionGroupWidget;
