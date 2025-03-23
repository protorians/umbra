import type {
  IFormAttributes,
  IInputAttributes,
  ILabelAttributes, IOptionAttributes, IOptionGroupAttributes,
  ISelectAttributes,
  ITextareaAttributes,
  IWidgetDeclaration
} from "../types/index.js";
import {WidgetNode} from "../widget-node.js";
import {Composable, Mountable} from "../decorators.js";


/**
 * @description Label Input Widget
 */
@Mountable()
@Composable()
export class FormWidget extends WidgetNode<HTMLFormElement, IFormAttributes> {
  get tag(): string {
    return 'form'
  };
}

/**
 * @description Label Input Widget
 */
@Mountable()
@Composable()
export class LabelWidget extends WidgetNode<HTMLLabelElement, ILabelAttributes> {
  get tag(): string {
    return 'label'
  };
}

/**
 * @description Text Input Widget
 */
@Mountable()
@Composable()
export class InputWidget extends WidgetNode<HTMLInputElement, IInputAttributes> {
  get tag(): string {
    return 'input'
  };
}


/**
 * @description Input Area Widget
 */
@Mountable()
@Composable()
export class InputAreaWidget extends WidgetNode<HTMLTextAreaElement, ITextareaAttributes> {
  get tag(): string {
    return 'textarea'
  };
}

/**
 * @description Select Input Widget
 */
@Mountable()
@Composable()
export class SelectWidget extends WidgetNode<HTMLSelectElement, ISelectAttributes> {
  get tag(): string {
    return 'select'
  };
}

/**
 * @description Option Input Widget
 */
@Mountable()
@Composable()
export class OptionWidget extends WidgetNode<HTMLOptionElement, IOptionAttributes> {
  get tag(): string {
    return 'option'
  };
}

/**
 * @description Construct's Function of `OptionWidget`
 * @param declaration
 * @constructor
 */
export function Option(declaration: IWidgetDeclaration<HTMLOptionElement, IOptionAttributes>): OptionWidget {
  return new OptionWidget(declaration)
}

/**
 * @description Option Input Widget
 */
@Mountable()
@Composable()
export class OptionGroupWidget extends WidgetNode<HTMLOptGroupElement, IOptionGroupAttributes> {
  get tag(): string {
    return 'optgroup'
  };
}

/**
 * @description Construct's Function of `FormWidget`
 * @param declaration
 * @constructor
 */
export function Form(declaration: IWidgetDeclaration<HTMLFormElement, IFormAttributes>): FormWidget {
  return new FormWidget(declaration)
}

/**
 * @description Construct's Function of `LabelWidget`
 * @param declaration
 * @constructor
 */
export function Label(declaration: IWidgetDeclaration<HTMLLabelElement, ILabelAttributes>): LabelWidget {
  return new LabelWidget(declaration)
}

/**
 * @description Construct's Function of `InputWidget`
 * @param declaration
 * @constructor
 */
export function Input(declaration: Omit<IWidgetDeclaration<HTMLInputElement, IInputAttributes>, 'children'>): InputWidget {
  return new InputWidget({...declaration, children: undefined})
}

/**
 * @description Construct's Function of `InputAreaWidget`
 * @param declaration
 * @constructor
 */
export function InputArea(declaration: IWidgetDeclaration<HTMLTextAreaElement, ITextareaAttributes>): InputAreaWidget {
  return new InputAreaWidget(declaration)
}

/**
 * @description Construct's Function of `SelectWidget`
 * @param declaration
 * @constructor
 */
export function Select(declaration: IWidgetDeclaration<HTMLSelectElement, ISelectAttributes>): SelectWidget {
  return new SelectWidget(declaration)
}

/**
 * @description Construct's Function of `OptionGroupWidget`
 * @param declaration
 * @constructor
 */
export function OptionGroup(declaration: IWidgetDeclaration<HTMLOptGroupElement, IOptionGroupAttributes>): OptionGroupWidget {
  return new OptionGroupWidget(declaration)
}
