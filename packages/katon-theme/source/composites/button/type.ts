import type {IWidgetNode} from "@protorians/widgets";
import {LayerVariant} from "@widgetui/core";

export type KatonButtonProps = {
    variant?: LayerVariant;
    outline?: boolean;
    before?: IWidgetNode<any, any>;
    after?: IWidgetNode<any, any>;
}