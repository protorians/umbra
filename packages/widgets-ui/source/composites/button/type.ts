import type {IWidgetNode} from "@protorians/widgets";
import {LayerVariant} from "../../enums.js";

export type ThemeButtonProps = {
    variant?: LayerVariant;
    outline?: boolean;
    before?: IWidgetNode<any, any>;
    after?: IWidgetNode<any, any>;
}