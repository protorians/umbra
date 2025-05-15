import {IWidgetNode, ObjectFit} from "@protorians/widgets";



export interface ThemeAspectRatioProps{
    ratio?: number;
    fit?: ObjectFit;
    children: IWidgetNode<any, any>;
}