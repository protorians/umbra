import {Composable, Mountable} from "../decorators.js";
import {WidgetNode} from "../widget-node.js";
import type {ISpanAttributes, IStyleSheetDeclarations, IWidgetDeclaration} from "../types/index.js";


/**
 * @description Sub Title Widget
 */
@Mountable()
@Composable()
export class SubTitleWidget extends WidgetNode<HTMLSpanElement, ISpanAttributes> {
  get tag(): string {
    return 'span'
  };

  static get style(): IStyleSheetDeclarations {
    return {
      fontSize: `x-large`
    }
  }
}

/**
 * @description Title Widget
 */
@Mountable()
@Composable()
export class TitleWidget extends WidgetNode<HTMLSpanElement, ISpanAttributes> {
  get tag(): string {
    return 'span'
  };

  static get style(): IStyleSheetDeclarations {
    return {
      fontSize: `xx-large`
    }
  }
}

/**
 * @description Huge Title Widget
 */
@Mountable()
@Composable()
export class HugeTitleWidget extends WidgetNode<HTMLSpanElement, ISpanAttributes> {
  get tag(): string {
    return 'span'
  };

  static get style(): IStyleSheetDeclarations {
    return {
      fontSize: `xxx-large`
    }
  }
}

/**
 * @description Construct's Function of `SubTitleWidget`
 * @param declaration
 * @constructor
 */
export function SubTitle(declaration: IWidgetDeclaration<HTMLElement, ISpanAttributes>): SubTitleWidget {
  return new SubTitleWidget(declaration)
}

/**
 * @description Construct's Function of `TitleWidget`
 * @param declaration
 * @constructor
 */
export function Title(declaration: IWidgetDeclaration<HTMLElement, ISpanAttributes>): TitleWidget {
  return new TitleWidget(declaration)
}

/**
 * @description Construct's Function of `HugeTitleWidget`
 * @param declaration
 * @constructor
 */
export function HugeTitle(declaration: IWidgetDeclaration<HTMLElement, ISpanAttributes>): HugeTitleWidget {
  return new HugeTitleWidget(declaration)
}
