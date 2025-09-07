import { AligningDirection, IStyleSheet, type IWidgetNode } from "@protorians/widgets";
export interface IThemeViewStyles {
    widget?: IStyleSheet;
    helmet?: IStyleSheet;
    navbar?: IStyleSheet;
    main?: IStyleSheet;
    bottomNavbar?: IStyleSheet;
    footer?: IStyleSheet;
}
export type ThemeViewOptions = {
    title?: string;
    direction?: AligningDirection;
    helmet?: IWidgetNode<any, any>;
    navbar?: IWidgetNode<any, any>;
    bottomNavbar?: IWidgetNode<any, any>;
    footer?: IWidgetNode<any, any>;
    scrollable?: boolean;
    styles?: IThemeViewStyles;
};
