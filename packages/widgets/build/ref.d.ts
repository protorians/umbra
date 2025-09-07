import type { IAttributes, IRef, IWidgetNode } from "./types/index.js";
export declare class RefWidget<E extends HTMLElement, A extends IAttributes> implements IRef<E, A> {
    protected widget: IWidgetNode<E, A> | undefined;
    get current(): IWidgetNode<E, A> | undefined;
    attach(widget: IWidgetNode<E, A>): this;
    detach(): void;
}
export declare function createRef<E extends HTMLElement, A extends IAttributes>(): IRef<E, A>;
