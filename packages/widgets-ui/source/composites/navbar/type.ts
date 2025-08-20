import type {AligningDirection, ICallablePayload, IStyleSheet, IWidgetNode} from "@protorians/widgets";
import type {IThemeAction} from "../../types/action.js";


export interface ThemeNavbarStyles {
    widget?: IStyleSheet;
    item?: IStyleSheet;
}

export interface ThemeNavbarIndicator {
    default?: IWidgetNode<HTMLElement, any>;
    up?: IWidgetNode<HTMLElement, any>;
    down?: IWidgetNode<HTMLElement, any>;
    left?: IWidgetNode<HTMLElement, any>;
    right?: IWidgetNode<HTMLElement, any>;
}

export interface ThemeNavbarChild extends IThemeAction<ICallablePayload<HTMLElement, any, any>> {
    icon?: IWidgetNode<HTMLElement, any>;
    children?: ThemeNavbarChild[];
}

export type ThemeNavbarOptions = {
    direction?: AligningDirection;
    indicators?: ThemeNavbarIndicator;
    styles?:ThemeNavbarStyles;
    separator?: IWidgetNode<HTMLElement, any>;
    children: ThemeNavbarChild[];
}