import {IWidgetNode, ObjectFit} from "@protorians/widgets";


export interface ThemeAspectRatioOptions {
    ratio?: number;
    fit?: ObjectFit;
    children: IWidgetNode<any, any>;
}