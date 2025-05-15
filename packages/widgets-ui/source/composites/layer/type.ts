import {LayerVariant} from "../../enums.js";
import {ILayerGradient} from "../../types/index.js";


export type ThemeLayerProps = {
    variant?: LayerVariant;
    outline?: boolean;
    blurred?: boolean | ILayerGradient[];
}