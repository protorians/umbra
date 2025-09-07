import { WidgetException } from "./errors/index.js";
import { WidgetBuilder, ContextWidget } from "./widget-node.js";
import { extractProps } from "./props.js";
import { Environment, TextUtility } from "@protorians/core";
export class Components {
    static instances = {};
}
export function Component(identifier, callable) {
    const name = TextUtility.unCamelCase(TextUtility.lcFirstLetter(identifier));
    if (!name.includes('-')) {
        throw (new WidgetException('Component names must have at least one capital letter after the first character.')).show();
    }
    else if (typeof Components.instances[identifier] !== "undefined") {
        return Components.instances[identifier];
    }
    else if (Environment.Client && !customElements.get(name) && !Components.instances[identifier]) {
        Components.instances[identifier] = class extends HTMLElement {
            widget;
            connectedCallback() {
                this.widget = callable(this);
                if (!this.widget)
                    throw new WidgetException("Component must be used with a DOM element");
                if (!this.widget.children)
                    this.widget.html(this.innerHTML);
                this.widget.signal.dispatch('mount', {
                    root: this.widget,
                    widget: this.widget,
                    payload: this.widget
                }, this.widget);
                this.replaceWith(this.widget.element);
            }
            disconnectedCallback() {
                this.widget?.signal.dispatch('unmount', {
                    root: this.widget,
                    widget: this.widget,
                    payload: undefined
                }, this.widget);
            }
            adoptedCallback() {
                this.widget?.signal.dispatch('adopted', {
                    root: this.widget,
                    widget: this.widget,
                    payload: undefined
                }, this.widget);
            }
        };
        customElements.define(name, Components.instances[identifier]);
        return Components.instances[identifier];
    }
    return undefined;
}
export function Mount(identifier, construct) {
    return Component(identifier, (target) => {
        const states = {};
        const props = extractProps(target);
        const widget = construct({ props, states });
        const context = new ContextWidget(widget, props, states);
        context.root = widget;
        WidgetBuilder(widget, context);
        return widget;
    });
}
