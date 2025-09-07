import { IAnimateGroupProps, IAnimateProps, IAttributes, IWidgetNode } from "../types/index.js";
export declare function Animate<E extends HTMLElement, A extends IAttributes>({ children, frame, from, to, duration, decimal, delay, ease, infinite }: IAnimateProps<E, A>): IWidgetNode<E, A>;
export declare function AnimateGroup({ children, frame, from, to, duration, decimal, delay, ease, infinite }: IAnimateGroupProps): IWidgetNode<any, any>[];
