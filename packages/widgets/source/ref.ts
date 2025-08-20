import type {IAttributes, IRef, IWidgetNode} from "./types/index.js";


export class RefWidget<E extends HTMLElement, A extends IAttributes> implements IRef<E, A> {

    protected widget: IWidgetNode<E, A> | undefined;

    get current(): IWidgetNode<E, A> | undefined {
        return this.widget;
    }

    attach(widget: IWidgetNode<E, A>): this {
        if (typeof this.widget !== 'undefined') return this;
        this.widget = widget;
        return this;
    }

    detach(): void {
        if (typeof this.widget === 'undefined') return;
        this.widget = undefined;
    }
}

export function createRef<E extends HTMLElement, A extends IAttributes>(): IRef<E, A> {
    return new RefWidget<E, A>();
}