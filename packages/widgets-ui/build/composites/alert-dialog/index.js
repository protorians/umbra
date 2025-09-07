import { ThemeDialog } from "../dialog/index.js";
export function ThemeAlertDialog(theme, declarations) {
    return ThemeDialog(theme, {
        ...declarations,
        trigger: declarations.trigger,
        children: declarations.children,
        actions: (dialog) => {
            return [
                ...Object.values(declarations.actions || {}).map((action) => {
                    return action.trigger.listen('click', () => {
                        dialog.close();
                        action.callable(dialog);
                    });
                }),
            ];
        }
    });
}
