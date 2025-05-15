import {AligningDirection, IChildren, IWidgetNode} from "@protorians/widgets";
import {LayerVariant} from "../../enums.js";
import {IAnimetricSlimOptions} from "@protorians/animetric";
import {IThemeAction} from "../../types/action.js";
import {ICapabilityInstance} from "@protorians/core";
import {AlertState} from "./enum.js";


export interface ThemeAlertProps {
    variant?: LayerVariant;
    outline?: boolean;
    closer?: boolean;
    collapsable?: boolean;
    collapseSize?: number;
    direction?: AligningDirection;
    icon?: IWidgetNode<any, any>;
    helmet?: IWidgetNode<any, any>;
    children?: IChildren<any>;
    animateIn?: IAnimetricSlimOptions;
    animateOut?: IAnimetricSlimOptions;
    actions?: IThemeAction<IThemeAlert>[];
    mounted?: (alerte: IThemeAlert) => void;
    unmounted?: (alerte: IThemeAlert) => void;
}

export interface IThemeAlertCapability {
    show: IThemeAlert;
    hide: IThemeAlert;
    destroy: IThemeAlert;
    toggle: IThemeAlert;
    expand: IThemeAlert;
    collapse: IThemeAlert;
}

export type IThemeAlertExtended = {
    state: AlertState;
}
export type IThemeAlert = ICapabilityInstance<IThemeAlertCapability> & IThemeAlertExtended