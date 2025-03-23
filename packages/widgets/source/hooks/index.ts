import type {
    IState,
    IStatePayload,
    IStateCallable,
    IWidgetNode,
    IAttributes, IPrimitive,
} from "../types/index.js";
import {WidgetNode} from "../widget-node.js";
import {type ISignalController, Signal} from "@protorians/core";

function createMarker<T>(data: IPrimitive | IWidgetNode<any, any> | T): Text | HTMLElement {
    if (typeof data === "object" && data instanceof WidgetNode) {
        return data.element;
    }
    return document.createTextNode(`${data || '&nbsp;'}`);
}

export class StateWidget<T> implements IState<T> {

    protected controller: ISignalController<IStatePayload<T>>;
    protected payload: IStatePayload<T>;

    constructor(
        protected readonly initial: T
    ) {
        this.payload = {data: initial}
        this.controller = new Signal.Controller(this.payload);
        this.effect((state) => this.payload.data = state)
    }

    get value(): T {
        return this.controller.current.data;
    }

    set(value: T): this {
        this.controller.current.data = value;
        return this
    }

    reset(): this {
        this.controller.current.data = this.initial;
        return this;
    }

    effect(callable: IStateCallable<T>): this {
        this.controller.effect(({value}) => callable(value))
        return this;
    }

    bind<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>): this {
        let marker = createMarker<T>(this.value);

        widget.content(marker);
        this.effect((state) => {
            const newMarker = createMarker<T>(state);

            console.warn('State', this.value, state, newMarker, marker)

            marker.replaceWith(newMarker)
            marker = newMarker
        })
        return this;
    }

}
