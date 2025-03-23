import type {ICommonAttributes, IWidgetDeclaration} from "../types/index.js";
import {WidgetNode} from "../widget-node.js";
import {Composable, Mountable} from "../decorators.js";


/**
 * @description Section Widget
 */
@Mountable()
@Composable()
export class SectionWidget extends WidgetNode<HTMLElement, ICommonAttributes> {
    get tag(): string {
        return 'section'
    };
}


/**
 * @description AsideFrame Widget
 */
@Mountable()
@Composable()
export class AsideFrameWidget extends WidgetNode<HTMLElement, ICommonAttributes> {
    get tag(): string {
        return 'aside'
    };
}


/**
 * @description HeaderFrame Widget
 */
@Mountable()
@Composable()
export class HeaderFrameWidget extends WidgetNode<HTMLElement, ICommonAttributes> {
    get tag(): string {
        return 'header'
    };
}


/**
 * @description FooterFrame Widget
 */
@Mountable()
@Composable()
export class FooterFrameWidget extends WidgetNode<HTMLElement, ICommonAttributes> {
    get tag(): string {
        return 'footer'
    };
}


/**
 * @description MainFrame Widget
 */
@Mountable()
@Composable()
export class MainFrameWidget extends WidgetNode<HTMLElement, ICommonAttributes> {
    get tag(): string {
        return 'main'
    };
}

/**
 * @description Construct's Function of `WidgetNode`
 * @param declaration
 * @constructor
 */
export function Layer(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes>): WidgetNode<HTMLElement, ICommonAttributes> {
    return new WidgetNode(declaration)
}

/**
 * @description Construct's Function of `SectionWidget`
 * @param declaration
 * @constructor
 */
export function Section(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes>): SectionWidget {
    return new SectionWidget(declaration)
}

/**
 * @description Construct's Function of `MainFrameWidget`
 * @param declaration
 * @constructor
 */
export function MainFrame(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes>): MainFrameWidget {
    return new MainFrameWidget(declaration)
}

/**
 * @description Construct's Function of `HeaderFrameWidget`
 * @param declaration
 * @constructor
 */
export function HeaderFrame(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes>): HeaderFrameWidget {
    return new HeaderFrameWidget(declaration)
}

/**
 * @description Construct's Function of `FooterFrameWidget`
 * @param declaration
 * @constructor
 */
export function FooterFrame(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes>): FooterFrameWidget {
    return new FooterFrameWidget(declaration)
}

/**
 * @description Construct's Function of `AsideFrameWidget`
 * @param declaration
 * @constructor
 */
export function AsideFrame(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes>): AsideFrameWidget {
    return new AsideFrameWidget(declaration)
}