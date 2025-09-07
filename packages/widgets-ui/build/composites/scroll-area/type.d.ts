import { AligningDirection, type IWidgetNode } from "@protorians/widgets";
export type ThemeScrollAreaOptions = {
    size?: number | string;
    direction?: AligningDirection;
    hideScroll?: boolean;
    children?: IWidgetNode<any, any>[];
};
