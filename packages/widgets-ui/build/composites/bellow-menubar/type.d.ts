import { AligningDirection, IStyleSheet, IWidgetNode } from "@protorians/widgets";
import { LayerVariant } from "../../enums.js";
export interface ThemeBellowMenuBarStyles {
    widget?: IStyleSheet;
    item?: IStyleSheet;
}
export type ThemeBellowMenuBarOptions = {
    variant?: LayerVariant;
    direction?: AligningDirection;
    fixed?: boolean;
    start?: IWidgetNode<any, any>;
    end?: IWidgetNode<any, any>;
    children: IWidgetNode<HTMLElement, any>[];
    styles?: ThemeBellowMenuBarStyles;
};
