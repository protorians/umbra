import type {
    IState,
    IStatePayload,
    IStateCallable,
    IWidgetNode,
    IAttributes, IPrimitive, IStateWatcher,
} from "../types/index.js";
import {WidgetBuilder, WidgetNode} from "../widget-node.js";
import {type ISignalController, Signal} from "@protorians/core";

function createMarker<T>(widget: IWidgetNode<any, any>, data: IPrimitive | IWidgetNode<any, any> | T): Text | HTMLElement {
    if (typeof data === "object" && data instanceof WidgetNode) {
        if (widget.context) WidgetBuilder(data, widget.context)
        return data.element;
    }
    return document.createTextNode(`${typeof data === 'undefined' ? '' : data?.toString()}`);
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

    watch(callable: IStateCallable<T>): IStateWatcher<T> {
        return new StateWidgetWatcher(this, callable);
    }

    bind<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>): this {
        let marker = createMarker<T>(widget, this.value);
        this.effect((state) => {
            const newMarker = createMarker<T>(widget, state);
            marker.replaceWith(newMarker)
            marker = newMarker
        })
        widget.content(marker);
        return this;
    }

}


export class StateWidgetWatcher<T> {

    constructor(
        public readonly state: IState<T>,
        public readonly callable: IStateCallable<T>
    ) {
    }

    bind<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>): this {
        const initial = this.callable(this.state.value)
        let marker = createMarker<T>(widget, initial);

        this.state.effect((state) => {
            const newMarker = createMarker<T>(widget, this.callable(state as T));
            marker.replaceWith(newMarker)
            marker = newMarker
        })
        widget.content(marker);
        return this;
    }

}