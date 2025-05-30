import type {
    IComponentCallable,
    IComponentElement,
    IWidgetNode,
    IComponentConstruct,
    IPropStack,
    IStateStack
} from "./types/index.js";
import {WidgetException} from "./errors/index.js";
import {WidgetBuilder, ContextWidget} from "./widget-node.js";
import {extractProps} from "./props.js";
import {Environment, TextUtility} from "@protorians/core";
import {ISpectraElement} from "@protorians/spectra";


export type IComponentInstances = {
    [key: string]: typeof HTMLElement;
}

export class Components {
    static instances: IComponentInstances = {};
}

export function Component(
    identifier: string,
    callable: IComponentCallable,
): typeof HTMLElement | ISpectraElement | undefined {
    const name: string = TextUtility.unCamelCase(TextUtility.lcFirstLetter(identifier));

    if (!name.includes('-')) {
        throw (new WidgetException('Component names must have at least one capital letter after the first character.')).show()
    } else if (typeof Components.instances[identifier] !== "undefined") {
        return Components.instances[identifier] as typeof HTMLElement;
    } else if (Environment.Client && !customElements.get(name) && !Components.instances[identifier]) {

        Components.instances[identifier] = class extends HTMLElement implements IComponentElement {

            protected widget: IWidgetNode<any, any> | undefined;

            connectedCallback() {
                this.widget = callable(this);
                if (!this.widget) throw new WidgetException("Component must be used with a DOM element");
                if (!this.widget.children) this.widget.html(this.innerHTML)
                this.widget.signal.dispatch('mount', {
                    root: this.widget,
                    widget: this.widget,
                    payload: this.widget
                }, this.widget);
                this.replaceWith(this.widget.element as HTMLElement)
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

        }

        customElements.define(name, Components.instances[identifier])
        return Components.instances[identifier] as typeof HTMLElement;
    }

    return undefined;
}

export function Mount<P extends IPropStack, S extends IStateStack>(
    identifier: string,
    construct: IComponentConstruct<P, S>
) {
    return Component(identifier, (target) => {
        const states = {} as S;
        const props = extractProps<P>(target);
        const widget = construct({props, states})
        const context = new ContextWidget<P, S>(widget, props, states)
        context.root = widget;
        WidgetBuilder(widget, context);
        return widget;
    })

}