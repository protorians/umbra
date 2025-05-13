import {IWidgetNode} from "@protorians/widgets";
import {IThemeAlertAction} from "../alert/type.js";
import {IModalOptions} from "../../kits/index.js";
import {LayerVariant} from "../../enums.js";


export interface IThemeAlertDialogActions {
    accept: IThemeAlertAction;
    refuse: IThemeAlertAction;
}

export interface ThemeAlertDialogProps extends Partial<Omit<IModalOptions, 'favicon' | 'position' | 'locked' | 'blurred' | 'type'>> {
    variant?: LayerVariant;
    icon?: IWidgetNode<any, any>;
    title?: string;
    actions?: IThemeAlertDialogActions;
}