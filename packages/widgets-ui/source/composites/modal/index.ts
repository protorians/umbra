import {declarationExplodes, type IChildren, type ICommonAttributes, type IWidgetDeclaration} from "@protorians/widgets";
import {IModalOptions, ModalKit} from "../../kits/index.js";

export function ThemeModal(
    declarations: Omit<IWidgetDeclaration<HTMLElement, Partial<IModalOptions> & ICommonAttributes>, 'children'>
): IChildren<any> {

    const {extended} = declarationExplodes<Omit<IWidgetDeclaration<HTMLElement, Partial<IModalOptions> & ICommonAttributes>, 'children'>, IModalOptions>(
        declarations, [
            'scoped',
            'trigger',
            'children',
            'locked',
            'blurred',
            'animateIn',
            'animateOut',
            'ariaTitle',
            'ariaDescription',
            'position',
            'type'
        ]
    );

    return ModalKit.callable((): IModalOptions => ({...extended}))
}