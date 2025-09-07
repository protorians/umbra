import { IWidgetNode } from "@protorians/widgets";
import { IModal, IModalOptions } from "../../kits/index.js";
import { LayerVariant } from "../../enums.js";
import { IThemeAction } from "../../types/action.js";
export interface IThemeAlertDialogAction extends IThemeAction<IModal> {
}
export interface IThemeAlertDialogActions {
    accept: IThemeAlertDialogAction;
    refuse: IThemeAlertDialogAction;
}
export interface ThemeAlertDialogOptions extends Partial<Omit<IModalOptions, 'favicon' | 'position' | 'locked' | 'blurred' | 'type'>> {
    variant?: LayerVariant;
    icon?: IWidgetNode<any, any>;
    title?: string;
    actions?: IThemeAlertDialogActions;
}
