import {Composable, Mountable} from "../decorators.js";
import type {
  IAttributes,
  IColumnAttributes,
  ICommonAttributes,
  IRowAttributes,
  IWidgetDeclaration,
  IWidgetNode
} from "../types/index.js";
import {WidgetNode} from "../widget-node.js";
import {widgetAligningDirectionFeature, widgetAligningFeature,} from "../helpers/index.js";
import {AligningProperty} from "../enums.js";
import {Widget} from "../collections.js";


/**
 * @description Flexible Widget
 */
@Mountable()
@Composable()
export class StackWidget extends WidgetNode<HTMLElement, ICommonAttributes> {
  get tag(): string {
    return 'div'
  };

  static mount<E extends HTMLElement, A extends IAttributes>(
    widget: IWidgetNode<E, A>
  ): IWidgetNode<E, A> | undefined {
    widget.style({
      display: 'flex',
      ...widgetAligningDirectionFeature(widget),
      ...widgetAligningFeature(widget, [
        AligningProperty.AlignItems,
        AligningProperty.JustifyContent,
      ]),
    })
    return widget;
  }
}

/**
 * @description Row flexible Widget
 */
@Mountable()
@Composable(Widget, 'Stack')
export class RowStackWidget extends WidgetNode<HTMLHeadElement, IRowAttributes> {
  get tag(): string {
    return 'div'
  };

  static mount<E extends HTMLElement, A extends IAttributes>(
    widget: IWidgetNode<E, A>
  ): IWidgetNode<E, A> | undefined {
    widget.style({
      display: 'flex',
      flexDirection: 'row',
      ...widgetAligningFeature(widget, [
        AligningProperty.JustifyContent,
      ]),
    })
    return widget;
  }
}

/**
 * @description Column flexible Widget
 */
@Mountable()
@Composable(Widget, 'Stack')
export class ColumnStackWidget extends WidgetNode<HTMLHeadElement, IColumnAttributes> {
  get tag(): string {
    return 'div'
  };

  static mount<E extends HTMLElement, A extends IAttributes>(
    widget: IWidgetNode<E, A>
  ): IWidgetNode<E, A> | undefined {
    widget.style({
      display: 'flex',
      flexDirection: 'column',
      ...widgetAligningFeature(widget, [
        AligningProperty.AlignItems,
      ]),
    })
    return widget;
  }
}

/**
 * @description Construct's Function of `StackWidget`
 * @param declaration
 * @constructor
 */
export function Stack(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes>): StackWidget {
  return new StackWidget(declaration)
}

/**
 * @description Construct's Function of `RowStackWidget`
 * @param declaration
 * @constructor
 */
export function Row(declaration: IWidgetDeclaration<HTMLElement, IRowAttributes>): RowStackWidget {
  return new RowStackWidget(declaration)
}

/**
 * @description Construct's Function of `ColumnStackWidget`
 * @param declaration
 * @constructor
 */
export function Column(declaration: IWidgetDeclaration<HTMLElement, IColumnAttributes>): ColumnStackWidget {
  return new ColumnStackWidget(declaration)
}

