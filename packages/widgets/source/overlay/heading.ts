import {Composable, Mountable} from "../decorators.js";
import {WidgetNode} from "../widget-node.js";
import type {IHeadingAttributes, IStyleSheetDeclarations, IWidgetDeclaration} from "../types/index.js";

/**
 * @description Heading Widget
 */
@Mountable()
@Composable()
export class SmallHeadingWidget extends WidgetNode<HTMLHeadElement, IHeadingAttributes> {
    get tag(): string {
        return 'h3'
    };
    static get style(): IStyleSheetDeclarations {
        return {
            fontSize: `x-large`
        }
    }
}

/**
 * @description Large Heading Widget
 */
@Mountable()
@Composable()
export class HeadingWidget extends WidgetNode<HTMLHeadElement, IHeadingAttributes> {
    get tag(): string {
        return 'h2'
    };
    static get style(): IStyleSheetDeclarations {
        return {
            fontSize: `xx-large`
        }
    }
}

/**
 * @description Larger Heading Widget
 */
@Mountable()
@Composable()
export class LargeHeadingWidget extends WidgetNode<HTMLHeadElement, IHeadingAttributes> {
    get tag(): string {
        return 'h1'
    };
    static get style(): IStyleSheetDeclarations {
        return {
            fontSize: `xxx-large`
        }
    }
}

/**
 * @description Construct's Function of `SmallHeadingWidget`
 * @param declaration
 * @constructor
 */
export function SmallHeading(declaration: IWidgetDeclaration<HTMLElement, IHeadingAttributes>): SmallHeadingWidget {
    return new SmallHeadingWidget(declaration)
}

/**
 * @description Construct's Function of `HeadingWidget`
 * @param declaration
 * @constructor
 */
export function Heading(declaration: IWidgetDeclaration<HTMLElement, IHeadingAttributes>): HeadingWidget {
    return new HeadingWidget(declaration)
}

/**
 * @description Construct's Function of `LargerHeadingWidget`
 * @param declaration
 * @constructor
 */
export function LargeHeading(declaration: IWidgetDeclaration<HTMLElement, IHeadingAttributes>): LargeHeadingWidget {
    return new LargeHeadingWidget(declaration)
}
