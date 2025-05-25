import type {IButtonAttributes, IButtonAttributesBase, IWidgetDeclaration} from "../types/index.js";
import {WidgetNode} from "../widget-node.js";
import {Composable, Mountable} from "../decorators.js";
import {declarationExplodes} from "../helpers/index.js";


/**
 * @description Button Widget
 */
@Mountable()
@Composable()
export class ButtonWidget extends WidgetNode<HTMLButtonElement, IButtonAttributes> {
    get tag(): string {
        return 'button'
    };
}

/**
 * @description Construct's Function of `ButtonWidget`
 * @param declaration
 * @constructor
 */
export function Button(declaration: IWidgetDeclaration<HTMLButtonElement, IButtonAttributes & IButtonAttributesBase>): ButtonWidget {

    const props = declarationExplodes<
        IWidgetDeclaration<HTMLButtonElement, IButtonAttributes & IButtonAttributesBase>,
        IButtonAttributesBase
    >(declaration, ['onPress', 'onPressStart', 'onPressEnd',])

    props.declaration.listen = {
        ...props.declaration.listen,
        click: props.extended?.onPress,
    }

    if (props.extended.onPressStart) props.declaration.listen.mousedown = props.extended.onPressStart;
    if (props.extended.onPressEnd) props.declaration.listen.mouseup = props.extended.onPressEnd;

    return new ButtonWidget(props.declaration as IWidgetDeclaration<HTMLButtonElement, IButtonAttributes>)
}
