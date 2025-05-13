import {
    declarationExplodes,
    IChildren,
    ICommonAttributes,
    IWidgetDeclaration,
} from "@protorians/widgets";
import {ThemeAlertDialogProps} from "./type.js";
import {ThemeDialog} from "../dialog/index.js";
import {ITheme} from "../../types/index.js";
import {IModal} from "../../kits/index.js";


export function ThemeAlertDialog(
    theme: ITheme,
    declarations: IWidgetDeclaration<HTMLElement, ICommonAttributes & ThemeAlertDialogProps>
): IChildren<any> {

    const {extended} = declarationExplodes<IWidgetDeclaration<HTMLElement, ICommonAttributes & ThemeAlertDialogProps>, ThemeAlertDialogProps>(
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
                ...Object.values(extended.actions || {}).map((action) => {
                    return theme.Button({
                        variant: extended.variant,
                        onPress: () => {
                            dialog.close();
                            action.callable(dialog);
                        },
                        children: action.trigger || ('Close'),
                    })
                }),
            ]
        }
    })
}