import {AligningDirection, type IWidgetNode} from "@protorians/widgets";

export type ThemeViewOptions = {
    title?: string;
    direction?: AligningDirection;
    helmet?: IWidgetNode<any, any>;
    navbar?: IWidgetNode<any, any>;
    bottomNavbar?: IWidgetNode<any, any>;
    footer?: IWidgetNode<any, any>;
    scrollable?: boolean;
}