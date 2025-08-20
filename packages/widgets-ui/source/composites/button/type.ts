import {IWidgetNode, ObjectSize} from "@protorians/widgets";
import {LayerVariant} from "../../enums.js";

export type ThemeButtonOptions = {
    variant?: LayerVariant;
    size?: ObjectSize,
    outline?: boolean;
    before?: IWidgetNode<any, any>;
    after?: IWidgetNode<any, any>;
}