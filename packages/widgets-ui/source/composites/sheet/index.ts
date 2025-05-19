import {
    declarationExplodes,
    EdgePosition,
    FloatPosition,
    IChildren,
    ICommonAttributes,
    IWidgetDeclaration, PopupType
} from "@protorians/widgets";
import {ThemeSheetOptions} from "./type.js";
import {IModal, IModalOptions, ModalKit} from "../../kits/index.js";
import {convertToArrayPosition} from "../../utilities/index.js";


export function ThemeSheet(
    declarations: IWidgetDeclaration<HTMLElement, Partial<ThemeSheetOptions> & ICommonAttributes>
): IChildren<any> {

    const {extended} = declarationExplodes<IWidgetDeclaration<HTMLElement, Partial<ThemeSheetOptions> & ICommonAttributes>, ThemeSheetOptions>(
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
            'alignment',
            'type'
        ]
    )

    return ModalKit.callable((modal: IModal): IModalOptions => {
        return {
            children: (extended.children && typeof extended.children == 'function') ? extended.children(modal) : extended.children!,
            trigger: (extended.trigger && typeof extended.trigger == 'function') ? extended.trigger(modal) : extended.trigger!,
            scoped: extended.scoped,
            locked: extended.locked,
            blurred: extended.blurred,
            animateIn: extended.animateIn,
            animateOut: extended.animateOut,
            ariaTitle: extended.ariaTitle,
            ariaDescription: extended.ariaDescription,
            type: PopupType.Menu,
            position: convertToArrayPosition(
                extended.position || FloatPosition.Bottom,
                extended.alignment || EdgePosition.Center
            ),
        }
    })
}