import type {
    IAttributes, IContext,
    IPrimitive,
    IState,
    IStateCallable,
    IStatePayload,
    IStateWatcher,
    IWidgetNode,
} from "../types/index.js";
import {WidgetBuilder, WidgetNode} from "../widget-node.js";
import {type ISignalController, Signal} from "@protorians/core";

function createMarker<T>(widget: IWidgetNode<any, any>, data: IPrimitive | IWidgetNode<any, any> | T): Text | HTMLElement {
    if (typeof data === "object" && data instanceof WidgetNode) {
        if (widget.context) {
            WidgetBuilder(data, widget.context)
        }
        return data.element;
    } else if (typeof data === "object" && Array.isArray(data)) {
        data.forEach((w) => {
            if (w instanceof WidgetNode && widget.context && !w.context) WidgetBuilder(w, widget.context)
        })
        return document.createTextNode('');
    }

    return document.createTextNode(`${typeof data === 'undefined' ? '' : data?.toString()}`);
}


function mountWidgetState<T>(
    widget: IWidgetNode<any, any>,
    state: T,
    context: IContext<any, any>
) {
    if (state instanceof WidgetNode) {
        state.signal.dispatch('mount', {
            root: context.root || widget.context?.root || widget,
            widget: state,
            payload: state
        })
        return true;
    }
    return false;
}


function updateMarkerFromArray<T>(
    widget: IWidgetNode<any, any>,
    state: T,
    marker?: Text | HTMLElement,
): Text | HTMLElement {

    const context = (widget.context?.root?.context || widget.context) as IContext<any, any>;
    const newMarker = createMarker<T>(widget, state);
    if (marker) marker.replaceWith(newMarker)

    if (Array.isArray(state)) {
        newMarker.before(...state.map(item => item instanceof WidgetNode ? item.element : item));
        for (const item of state) mountWidgetState(widget, item, context)
    } else if (state instanceof WidgetNode) {
        mountWidgetState(widget, state, context)
    }

    return newMarker;
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
        let marker = updateMarkerFromArray<T>(widget, this.value);
        let old: T | undefined;
        this.effect((state) => {
            StateWidget.prune(old)
            marker = updateMarkerFromArray<T>(widget, state, marker,)
            old = state;
        })
        widget.content(marker);
        return this;
    }

    prune(data?: T): this {
        StateWidget.prune(data)
        return this;
    }

    static prune<D>(data?: D): typeof this {
        if (Array.isArray(data)) {
            data.forEach((w) => (w instanceof WidgetNode) ? w.remove() : void (0))
        } else if (data instanceof WidgetNode) {
            data.remove();
        }
        return this
    }

}


export class StateWidgetWatcher<T> {

    constructor(
        public readonly state: IState<T>,
        public readonly callable: IStateCallable<T>
    ) {
    }

    bind<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>): this {
        const value = this.callable(this.state.value)
        let marker = updateMarkerFromArray<T>(widget, value);
        let old: T | undefined;
        this.state.effect((state) => {
            StateWidget.prune(old)
            marker = updateMarkerFromArray<T>(widget, state as T, marker)
            old = state;
        })
        widget.content(marker);
        return this;
    }

}