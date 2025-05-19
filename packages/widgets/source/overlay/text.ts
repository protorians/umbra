import {Composable, Mountable} from "../decorators.js";
import {WidgetNode} from "../widget-node.js";
import type {
    IItalicAttributes,
    ILinkAttributes,
    ISpanAttributes,
    IStrongAttributes,
    IStyleSheetDeclarations,
    IWidgetDeclaration
} from "../types/index.js";

/**
 * @description Link Widget
 */
@Mountable()
@Composable()
export class LinkWidget extends WidgetNode<HTMLAnchorElement, ILinkAttributes> {
    get tag(): string {
        return 'a'
    };
}

/**
 * @description Strong Text Widget
 */
@Mountable()
@Composable()
export class StrongTextWidget extends WidgetNode<HTMLElement, IStrongAttributes> {
    get tag(): string {
        return 'strong'
    };
}

/**
 * @description Italic Text Widget
 */
@Mountable()
@Composable()
export class ItalicTextWidget extends WidgetNode<HTMLElement, IItalicAttributes> {
    get tag(): string {
        return 'i'
    };
}

/**
 * @description Smaller Text Widget
 */
@Mountable()
@Composable()
export class SmallerTextWidget extends WidgetNode<HTMLSpanElement, ISpanAttributes> {
    get tag(): string {
        return 'span'
    };

    static get style(): IStyleSheetDeclarations {
        return {
            fontSize: `smaller`
        }
    }
}

/**
 * @description Small Text Widget
 */
@Mountable()
@Composable()
export class SmallTextWidget extends WidgetNode<HTMLSpanElement, ISpanAttributes> {
    get tag(): string {
        return 'span'
    };

    static get style(): IStyleSheetDeclarations {
        return {
            fontSize: `small`
        }
    }
}

/**
 * @description Text Widget
 */
@Mountable()
@Composable()
export class TextWidget extends WidgetNode<HTMLSpanElement, ISpanAttributes> {
    get tag(): string {
        return 'span'
    };

    static get style(): IStyleSheetDeclarations {
        return {
            fontSize: `medium`
        }
    }
}

/**
 * @description Large Text Widget
 */
@Mountable()
@Composable()
export class LargeTextWidget extends WidgetNode<HTMLSpanElement, ISpanAttributes> {
    get tag(): string {
        return 'span'
    };

    static get style(): IStyleSheetDeclarations {
        return {
            fontSize: `large`
        }
    }
}

/**
 * @description Larger Text Widget
 */
@Mountable()
@Composable()
export class LargerTextWidget extends WidgetNode<HTMLSpanElement, ISpanAttributes> {
    get tag(): string {
        return 'span'
    };

    static get style(): IStyleSheetDeclarations {
        return {
            fontSize: `larger`
        }
    }
}


/**
 * @description Construct's Function of `LinkWidget`
 * @param declaration
 * @constructor
 */
export function Link(declaration: IWidgetDeclaration<HTMLAnchorElement, ILinkAttributes>): LinkWidget {
    return new LinkWidget(declaration)
}


/**
 * @description Construct's Function of `SmallerTextWidget`
 * @param declaration
 * @constructor
 */
export function SmallerText(declaration: IWidgetDeclaration<HTMLElement, ISpanAttributes>): SmallerTextWidget {
    return new SmallerTextWidget(declaration)
}

/**
 * @description Construct's Function of `SmallTextWidget`
 * @param declaration
 * @constructor
 */
export function SmallText(declaration: IWidgetDeclaration<HTMLSpanElement, ISpanAttributes>): SmallTextWidget {
    return new SmallTextWidget(declaration)
}

/**
 * @description Construct's Function of `TextWidget`
 * @param declaration
 * @constructor
 */
export function Text(declaration: IWidgetDeclaration<HTMLSpanElement, ISpanAttributes>): TextWidget {
    return new TextWidget(declaration)
}

/**
 * @description Construct's Function of `LargeTextWidget`
 * @param declaration
 * @constructor
 */
export function LargeText(declaration: IWidgetDeclaration<HTMLSpanElement, ISpanAttributes>): LargeTextWidget {
    return new LargeTextWidget(declaration)
}

/**
 * @description Construct's Function of `LargerTextWidget`
 * @param declaration
 * @constructor
 */
export function LargerText(declaration: IWidgetDeclaration<HTMLSpanElement, ISpanAttributes>): LargerTextWidget {
    return new LargerTextWidget(declaration)
}

/**
 * @description Construct's Function of `StrongTextWidget`
 * @param declaration
 * @constructor
 */
export function StrongText(declaration: IWidgetDeclaration<HTMLElement, IStrongAttributes>): StrongTextWidget {
    return new StrongTextWidget(declaration)
}

/**
 * @description Construct's Function of `ItalicTextWidget`
 * @param declaration
 * @constructor
 */
export function ItalicText(declaration: Omit<IWidgetDeclaration<HTMLElement, IItalicAttributes>, 'children'>): ItalicTextWidget {
    return new ItalicTextWidget({...declaration, children: undefined})
}
