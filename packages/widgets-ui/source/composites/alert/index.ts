import {
    declarationExplodes,
    IChildren,
    ICommonAttributes,
    IWidgetDeclaration,
} from "@protorians/widgets";
import {ThemeAlertProps} from "./type.js";
import {ThemeDialog} from "../dialog/index.js";
import {ITheme} from "../../types/index.js";
import {IModal} from "../../kits/index.js";


export function ThemeAlert(
    theme: ITheme,
    declarations: IWidgetDeclaration<HTMLElement, ICommonAttributes & ThemeAlertProps>
): IChildren<any> {

    const {extended} = declarationExplodes<IWidgetDeclaration<HTMLElement, ICommonAttributes & ThemeAlertProps>, ThemeAlertProps>(
        declarations, [
            'variant',
            'scoped',
            'trigger',
            'children',
            'ariaTitle',
            'ariaDescription',
            'opened',
            'icon',
            'actions',
            'title',
            'animateIn',
            'animateOut'
        ]
    );

    return ThemeDialog(theme, {
        ...extended,
        trigger: extended.trigger,
        children: extended.children,
        actions: (dialog: IModal) => {
            return [
                theme.Button({
                    variant: extended.variant,
                    onPress: () => {
                        dialog.close();
                        extended.actions?.callable(dialog);
                    },
                    children: extended.actions?.trigger || ('Close'),
                }),
            ]
        }
    })
}