import {IAttributes, IStyleDeclaration, IWidgetNode} from "../types/index.js";
import {resolveAlignment, resolveAlignmentProperty, resolveDirection} from "./constant.js";
import {Aligning, AligningDirection, AligningProperty} from "../enums.js";


export function widgetAligningDirectionFeature<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>): Partial<IStyleDeclaration> {
  const styling: Partial<IStyleDeclaration> = {}

  if (widget.props.features?.direction) {
    styling.flexDirection = `${resolveDirection(widget.props.features.direction as AligningDirection) || 'column'}`;
  }

  return styling;
}

export function widgetAligningFeature<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>, properties: AligningProperty[]): Partial<IStyleDeclaration> {
  const styling: Partial<IStyleDeclaration> = {}

  properties.forEach(property => {
    const prop = resolveAlignmentProperty(property) as (keyof IStyleDeclaration | undefined)

    if (widget.props.features?.align && prop) {
      styling[prop] = `${resolveAlignment(widget.props.features.align as Aligning) || 'flex-start'}`;
    }
  })

  return styling;
}
