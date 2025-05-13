import {AligningDirection, type IWidgetNode} from "@protorians/widgets";

export type ThemeScrollAreaProps = {
    size?: number | string;
    direction?: AligningDirection;
    hideScroll?: boolean;
    children?: IWidgetNode<any, any>[];
}