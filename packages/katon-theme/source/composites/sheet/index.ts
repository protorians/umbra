import {
    declarationExplodes,
    EdgePosition,
    FloatPosition,
    IChildren,
    ICommonAttributes,
    IWidgetDeclaration
} from "@protorians/widgets";
import {IModal} from "@widgetui/core";
import {ModalKit} from "@widgetui/core/kits";
import {convertToArrayPosition} from "../../common/position-converter.js";
import {KatonSheetProps} from "./type.js";


export function KatonSheet(
    declarations: Omit<IWidgetDeclaration<HTMLElement, Partial<KatonSheetProps> & ICommonAttributes>, 'children'>
): IChildren<any> {

    const {
        // declaration,
        extended
    } = declarationExplodes<Omit<IWidgetDeclaration<HTMLElement, Partial<KatonSheetProps> & ICommonAttributes>, 'children'>, KatonSheetProps>(
        declarations, ['scope', 'trigger', 'fore', 'back', 'locked', 'blurred', 'animate', 'animateOut', 'ariaTitle', 'ariaDescription', 'position', 'alignment', 'type']
    )

    return ModalKit
        .begin<IModal>()
        .trigger(extended.trigger)
        .scope(extended.scope)
        .fore(extended.fore)
        .back(extended.back)
        .locked(extended.locked)
        .blurred(extended.blurred)
        .animate(extended.animate)
        .animateOut(extended.animateOut)
        .ariaTitle(extended.ariaTitle)
        .ariaDescription(extended.ariaDescription)
        .position(
            convertToArrayPosition(
                extended.position || FloatPosition.Bottom,
                extended.alignment || EdgePosition.Center
            )
        )
        .type(extended.type)
        .commit
}