import {IChildren, IStyleSheet, IWidgetNode} from "@protorians/widgets";
import {LayerVariant} from "../../enums.js";


export interface IThemeCardOptions {
    variant?: LayerVariant;
    outline?: boolean;
    helmet?: IWidgetNode<any, any>;
    actions?: IWidgetNode<any, any>;
    footer?: IChildren<any>;
    children: IChildren<any>;
    styles?: IThemeCardStyles;
}


export interface IThemeCardStyles {
    widget?: IStyleSheet;
    helmet?: IStyleSheet;
    actions?: IStyleSheet;
    children?: IStyleSheet;
    footer?: IStyleSheet;
}