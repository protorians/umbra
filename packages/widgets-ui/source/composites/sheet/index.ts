import {
    declarationExplodes,
    EdgePosition,
    FloatPosition,
    IChildren,
    ICommonAttributes,
    IWidgetDeclaration, PopupType
} from "@protorians/widgets";
import {ThemeSheetOptions} from "./type.js";
import {IModalOptions, ModalKit} from "../../kits/index.js";
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

    return ModalKit.callable((): IModalOptions => {
        return {
            children: extended.children!,
            trigger: extended.trigger!,
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