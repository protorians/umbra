import { WidgetBuilder, WidgetNode } from "../widget-node.js";
import { Signal } from "@protorians/core";
function createMarker(widget, data) {
    if (typeof data === "object" && data instanceof WidgetNode) {
        if (widget.context)
            WidgetBuilder(data, widget.context);
        return data.element;
    }
    else if (typeof data === "object" && Array.isArray(data)) {
        const marker = document.createTextNode('');
        data.forEach((w) => {
            if (w instanceof WidgetNode && widget.context && !w.context) {
                WidgetBuilder(w, widget.context);
            }
            else if (typeof w === 'function' && widget.context && !w.context) {
                WidgetBuilder(w(widget.context), widget.context);
            }
        });
        return marker;
    }
    return document.createTextNode(`${typeof data === 'undefined' ? '' : data?.toString()}`);
}
function mountWidgetState(widget, state, context) {
    if (state instanceof WidgetNode) {
        state.signal.dispatch('mount', {
            root: context.root || widget.context?.root || widget,
            widget: state,
            payload: state
        });
        return true;
    }
    return false;
}
function updateMarkerFromArray(widget, state, marker) {
    const context = (widget.context?.root?.context || widget.context);
    const newMarker = createMarker(widget, state);
    if (marker)
        marker.replaceWith(newMarker);
    if (Array.isArray(state)) {
        for (let item of state) {
            if (typeof item === 'function')
                item = item(widget.context);
            mountWidgetState(widget, item, context);
        }
    }
    else if (state instanceof WidgetNode) {
        mountWidgetState(widget, state, context);
    }
    return newMarker;
}
export class StateWidget {
    initial;
    controller;
    payload;
    constructor(initial) {
        this.initial = initial;
        this.payload = { data: initial };
        this.controller = new Signal.Controller(this.payload);
        this.effect((state) => this.payload.data = state);
    }
    get value() {
        return this.controller.current.data;
    }
    set(value) {
        this.controller.current.data = value;
        return this;
    }
    reset() {
        this.controller.current.data = this.initial;
        return this;
    }
    effect(callable) {
        this.controller.effect(({ value }) => callable(value));
        return this;
    }
    watch(callable) {
        return new StateWidgetWatcher(this, callable);
    }
    bind(widget) {
        let marker = updateMarkerFromArray(widget, this.value);
        let old;
        this.effect((state) => {
            StateWidget.prune(old);
            marker = updateMarkerFromArray(widget, state, marker);
            old = state;
        });
        widget.content(marker);
        return this;
    }
    prune(data) {
        StateWidget.prune(data);
        return this;
    }
    static prune(data) {
        if (Array.isArray(data)) {
            data.forEach((w) => (w instanceof WidgetNode) ? w.remove() : void (0));
        }
        else if (data instanceof WidgetNode) {
            data.remove();
        }
        return this;
    }
}
export function appendState(widget, marker, value) {
    if (Array.isArray(value)) {
        marker.before(...value.map(item => {
            if (typeof item === 'function' && widget.context)
                item = WidgetBuilder(item(widget.context), widget.context);
            return item instanceof WidgetNode ? item.element : item;
        }));
    }
}
export class StateWidgetWatcher {
    state;
    callable;
    constructor(state, callable) {
        this.state = state;
        this.callable = callable;
    }
    bind(widget) {
        const value = this.callable(this.state.value);
        let marker = updateMarkerFromArray(widget, value);
        let old;
        this.state.effect((state) => {
            StateWidget.prune(old);
            const value = this.callable(state);
            marker = updateMarkerFromArray(widget, value, marker);
            appendState(widget, marker, value);
            old = state;
        });
        widget.content(marker);
        appendState(widget, marker, value);
        return this;
    }
}
