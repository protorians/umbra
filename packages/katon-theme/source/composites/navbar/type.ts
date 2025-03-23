import {LayerVariant} from "@widgetui/core";
import {IWidgetNode} from "@protorians/widgets";

export type KatonNavbarProps = {
    variant?: LayerVariant;
    fixed?: boolean;
    children: IWidgetNode<HTMLButtonElement, any>[]
}