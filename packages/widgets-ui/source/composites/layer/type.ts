import {LayerVariant} from "../../enums.js";
import {ILayerGradient} from "../../types/index.js";


export type ThemeLayerOptions = {
    variant?: LayerVariant;
    outline?: boolean;
    blurred?: boolean | ILayerGradient[];
}