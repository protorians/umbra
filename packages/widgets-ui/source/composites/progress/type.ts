import type {IState, IWidgetNode} from "@protorians/widgets";
import {LayerVariant} from "../../enums.js";


export interface ThemeProgressPayload {
    color: IState<LayerVariant>;
    percent: IState<number>;
    widget?: IWidgetNode<any, any>;
    root?: IWidgetNode<any, any>;
}

export type ThemeProgressProps = {
    initiate?: (payload: ThemeProgressPayload) => void;
    variant?: LayerVariant;
    size?: number | string;
    outline?: boolean;
}