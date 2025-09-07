import { IStyleSheet, IWidgetNode } from "@protorians/widgets";
export interface IThemeBreadcrumbOptions {
    items: IThemeBreadcrumbItem[];
    separator?: (position: number) => IWidgetNode<any, any>;
    ellipsis?: (items: IThemeBreadcrumbItem[]) => IWidgetNode<any, any>;
    display?: number;
    styles?: IThemeBreadcrumbStyles;
}
export interface IThemeBreadcrumbStyles {
    widget?: IStyleSheet;
    wrapper?: IStyleSheet;
    item?: IStyleSheet;
}
export interface IThemeBreadcrumbItem {
    icon?: IWidgetNode<any, any>;
    children?: IWidgetNode<any, any>;
}
