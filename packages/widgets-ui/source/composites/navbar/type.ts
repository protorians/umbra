import {IWidgetNode} from "@protorians/widgets";
import {LayerVariant} from "../../enums.js";

export type ThemeNavbarOptions = {
    variant?: LayerVariant;
    fixed?: boolean;
    children: IWidgetNode<HTMLElement, any>[]
}