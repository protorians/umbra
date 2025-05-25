import type {IWidgetNode} from "@protorians/widgets";
import {LayerVariant} from "../../enums.js";

export type ThemeButtonOptions = {
    variant?: LayerVariant;
    outline?: boolean;
    before?: IWidgetNode<any, any>;
    after?: IWidgetNode<any, any>;
}