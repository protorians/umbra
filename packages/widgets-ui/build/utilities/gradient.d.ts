import { ILayerGradient } from "../types/gradient.js";
export declare function createLayerGradient({ color, position, animated, radius, opacity, duration, }: ILayerGradient): import("@protorians/widgets").WidgetNode<HTMLElement, import("@protorians/widgets").ICommonAttributes>;
export declare function createMultipleLayerGradient(layers?: ILayerGradient[]): import("@protorians/widgets").WidgetNode<HTMLElement, import("@protorians/widgets").ICommonAttributes>[];
