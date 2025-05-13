import {IWidgetNode} from "@protorians/widgets";
import {LayerVariant} from "../../enums.js";

export type ThemeNavbarProps = {
    variant?: LayerVariant;
    fixed?: boolean;
    children: IWidgetNode<HTMLButtonElement, any>[]
}