import {IWidgetNode} from "@protorians/widgets";
import {IModal, IModalOptions} from "../../kits/index.js";
import {LayerVariant} from "../../enums.js";


export interface IThemeAlertAction {
    trigger: IWidgetNode<any, any>;
    callable: (dialog: IModal) => void;
}

export interface ThemeAlertProps extends Partial<Omit<IModalOptions, 'favicon' | 'position' | 'locked' | 'blurred' | 'type'>> {
    variant?: LayerVariant;
    icon?: IWidgetNode<any, any>;
    title?: string;
    actions?: IThemeAlertAction;
}