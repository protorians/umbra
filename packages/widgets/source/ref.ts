import type {IAttributes, IRef, IWidgetNode} from "./types/index.js";
import {WidgetException} from "./errors/index.js";


export class RefWidget<E extends HTMLElement, A extends IAttributes> implements IRef<E, A> {

    protected widget: IWidgetNode<E, A> | undefined;

    get current(): IWidgetNode<E, A> | undefined {
        return this.widget;
    }

    attach(widget: IWidgetNode<E, A>): this {
        if (typeof this.widget !== 'undefined')
            throw (new WidgetException('Thee reference is already defined')).show()
        this.widget = widget;
        return this;
    }

    detach(): void {
        if (typeof this.widget === 'undefined')
            throw (new WidgetException('The reference is not defined')).show()
        this.widget = undefined;
    }
}

export function createRef<E extends HTMLElement, A extends IAttributes>() {
    return new RefWidget<E, A>();
}