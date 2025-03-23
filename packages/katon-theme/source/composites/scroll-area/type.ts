import {AligningDirection, type IWidgetNode} from "@protorians/widgets";

export type KatonScrollAreaProps = {
    size?: number | string;
    direction?: AligningDirection;
    hideScroll?: boolean;
    children?: IWidgetNode<any, any>[];
}