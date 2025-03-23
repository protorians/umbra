import type {IState, IWidgetNode} from "@protorians/widgets";
import {LayerVariant} from "@widgetui/core";


export interface KatonProgressPayload {
    color: IState<LayerVariant>;
    percent: IState<number>;
    widget?: IWidgetNode<any, any>;
    root?: IWidgetNode<any, any>;
}

export type KatonProgressProps = {
    initiate?: (payload: KatonProgressPayload) => void;
    variant?: LayerVariant;
    size?: number | string;
    outline?: boolean;
}