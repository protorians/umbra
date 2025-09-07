import { type ICapabilityInstance } from "@protorians/core";
import { LayerVariant } from "../../enums.js";
import { type IWidgetNode } from "@protorians/widgets";
export type IThemeBadgeValue = string | number;
export interface IThemeBadgeOptions {
    variant?: LayerVariant;
    value?: IThemeBadgeValue;
    floating?: boolean;
    children: IWidgetNode<any, any>;
}
export interface IThemeBadgeMethods {
    set: IThemeBadgeValue;
    increment: undefined;
    decrement: undefined;
}
export interface IThemeBadgeProperties {
    curent: IThemeBadgeValue;
}
export type IThemeBadge = ICapabilityInstance<IThemeBadgeMethods> & IThemeBadgeProperties;
