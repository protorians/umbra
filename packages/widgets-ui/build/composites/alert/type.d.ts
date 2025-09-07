import { AligningDirection, IChildren, IWidgetNode } from "@protorians/widgets";
import { LayerVariant } from "../../enums.js";
import { IAnimetricSlimOptions } from "@protorians/animetric";
import { IThemeAction } from "../../types/action.js";
import { ICapabilityInstance } from "@protorians/core";
import { AlertStatus } from "./enum.js";
export interface ThemeAlertOptions {
    variant?: LayerVariant;
    closer?: boolean;
    collapsible?: boolean;
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
export interface IThemeAlertMethods {
    show: IThemeAlert;
    hide: IThemeAlert;
    destroy: IThemeAlert;
    toggle: IThemeAlert;
    expand: IThemeAlert;
    collapse: IThemeAlert;
}
export type IThemeAlertProperties = {
    status: AlertStatus;
};
export type IThemeAlert = ICapabilityInstance<IThemeAlertMethods> & IThemeAlertProperties;
