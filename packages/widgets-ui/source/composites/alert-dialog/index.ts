import {type IChildren,} from "@protorians/widgets";
import {IThemeAlertDialogAction, ThemeAlertDialogProps} from "./type.js";
import {ThemeDialog} from "../dialog/index.js";
import {type ITheme} from "../../types/index.js";
import {IModal} from "../../kits/index.js";


export function ThemeAlertDialog(
    theme: ITheme,
    declarations: ThemeAlertDialogProps
): IChildren<any> {

    return ThemeDialog(theme, {
        ...declarations,
        trigger: declarations.trigger,
        children: declarations.children,
        actions: (dialog: IModal) => {
            return [
                ...(Object.values(declarations.actions || {}) as IThemeAlertDialogAction[]).map((action) => {
                    return action.trigger.listen('click', () => {
                        dialog.close();
                        action.callable(dialog);
                    })
                }),
            ]
        }
    })
}