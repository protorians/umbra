import type { IAnimetricOptions, IAnimetricPayload } from "@protorians/animetric";
import { IWidgetNode } from "./widget.js";
import { IAttributes } from "./attributes.js";
export type IAnimatePayload<E extends HTMLElement, A extends IAttributes> = IAnimetricPayload & {
    children: IWidgetNode<E, A>;
};
export type IAnimateGroupPayload = IAnimetricPayload & {
    children: IWidgetNode<any, any>[];
};
export type IAnimateCallable<E extends HTMLElement, A extends IAttributes> = (payload: IAnimatePayload<E, A>) => void;
export type IAnimateGroupCallable = (payload: IAnimateGroupPayload) => void;
export type IAnimateProps<E extends HTMLElement, A extends IAttributes> = Partial<IAnimetricOptions> & {
    frame: IAnimateCallable<E, A>;
    children: IWidgetNode<E, A>;
};
export type IAnimateGroupProps = Partial<IAnimetricOptions> & {
    frame: IAnimateGroupCallable;
    children: IWidgetNode<any, any>[];
};
