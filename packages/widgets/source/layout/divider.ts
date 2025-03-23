import {IAttributes, ICommonAttributes, IStyleDeclaration, IWidgetDeclaration, IWidgetNode} from "../types/index.js";
import {WidgetNode} from "../widget-node.js";
import {Composable, Mountable} from "../decorators.js";
import {AligningDirection} from "../enums.js";

/**
 * @description Strong Text Widget
 */
@Mountable()
@Composable()
export class DividerWidget extends WidgetNode<HTMLElement, ICommonAttributes> {
  get tag(): string {
    return 'div'
  };

  static mount<E extends HTMLElement, A extends IAttributes>(
    widget: IWidgetNode<E, A>
  ): IWidgetNode<E, A> | undefined {

    const size = widget.props.features?.size || 1;
    const direction = widget.props.features?.direction || AligningDirection.Row;

    if (size && (typeof size == 'string' || typeof size == 'number') && direction) {
      const style: Partial<IStyleDeclaration> = {}

      if (direction == AligningDirection.Column) style.height = size;
      else style.width = size;

      widget.style(style);
    }

    return widget;
  }
}


/**
 * @description Construct's Function of `DividerWidget`
 * @param declaration
 * @constructor
 */
export function Divider(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes>): DividerWidget {
  return new DividerWidget(declaration)
}

