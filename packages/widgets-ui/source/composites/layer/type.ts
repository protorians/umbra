import {LayerVariant} from "../../enums.js";
import {ILayerGradient} from "../../types/index.js";
import {IStyleSheet} from "@protorians/widgets";


export interface ThemeLayerStyles {
    widget?: IStyleSheet;
    back?: IStyleSheet;
    fore?: IStyleSheet;
}

export type ThemeLayerOptions = {
    variant?: LayerVariant;
    outline?: boolean;
    blurred?: boolean | ILayerGradient[];
    styles?: ThemeLayerStyles;
}