import { AligningDirection, IWidgetNode } from "@protorians/widgets";
import { LayerVariant } from "../../enums.js";
export type ThemeMenubarOptions = {
    variant?: LayerVariant;
    direction?: AligningDirection;
    fixed?: boolean;
    start?: IWidgetNode<any, any>;
    end?: IWidgetNode<any, any>;
    children: IWidgetNode<HTMLElement, any>[];
};
