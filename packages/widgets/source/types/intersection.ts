import {ICallable, IWidgetNode} from "./widget.js";
import {IAttributes} from "./attributes.js";
import { IntersectionDetector } from "../enums.js";

export interface IntersectionProps<E extends HTMLElement, A extends IAttributes> {
    children: IWidgetNode<E, A>;
    threshold?: number;
    root?: IWidgetNode<any, any>;
    rootMargin?: string;
    detector?: IntersectionDetector;
    release?: ICallable<E, A, undefined>;
    unrelease?: ICallable<E, A, undefined>;
}