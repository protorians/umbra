import {WidgetNode} from "../widget-node.js";
import {Composable, Mountable} from "../decorators.js";
import type {IAttributes, IGridAttributes, IWidgetDeclaration, IWidgetNode} from "../types/index.js";
import {declarationExplodes} from "../helpers/index.js";
import {Style} from "../style.js";

/**
 * @description Grid Widget
 */
@Mountable()
@Composable()
export class GridWidget extends WidgetNode<HTMLElement, IGridAttributes> {
    get tag(): string {
        return 'div'
    };

    static mount<E extends HTMLElement, A extends IAttributes>(
        widget: IWidgetNode<E, A>
    ): IWidgetNode<E, A> | undefined {
        widget.style({display: 'grid',})
        return widget;
    }
}


/**
 * @description Construct's Function of `GridWidget`
 * @param declarations
 * @constructor
 */
export function Grid(declarations: IWidgetDeclaration<HTMLElement, IGridAttributes>): GridWidget {
    const {
        declaration,
        extended
    } = declarationExplodes<IWidgetDeclaration<HTMLElement, IGridAttributes>, IGridAttributes>(declarations, [
        'grid',
        'area',
        'column',
        'columnStart',
        'columnEnd',
        'row',
        'rowStart',
        'rowEnd',
        'template',
        'templateRows',
        'templateColumns',
        'templateAreas',
        'gap',
        'autoRows',
        'autoColumns',
        'autoFlow',
    ]);

    declaration.style = Style({}).merge(declaration.style || {}).merge({...extended})
    return new GridWidget(declaration);
}
