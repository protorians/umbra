import type {
    IEngine,
    IAttributes,
    IWidgetNode,
    IStateStack,
    IContext,
    IPropStack,
    IChildrenSupported,
    IChildren,
    IGlobalEventMap,
    IEventListeners,
    ICallable,
    IGlobalAttributes,
    IStyleDeclaration,
    IGlobalEventPayload,
    IGlobalEventCallableMap,
    IStringToken,
    IPrimitive,
    ISignalableCallbackMap,
    IWidgetSignalMap,
    IStyleSheetDeclarations
} from "../types/index.js";
import {ContextWidget, WidgetNode} from "../widget-node.js";
import {StateWidget} from "../hooks/index.js";
import {Environment, type ISignalStackCallable, TreatmentQueueStatus, unCamelCase} from "@protorians/core";
import {ToggleOption, WidgetElevation} from "../enums.js";
import {Mockup} from "../mockup.js";

export class Manticore<E extends HTMLElement, A extends IAttributes> implements IEngine<E, A> {
    get element(): E | undefined {
        return this.widget.element as E;
    }

    constructor(
        protected widget: IWidgetNode<E, A>
    ) {
    }

    // construct(widget: IWidgetNode<E, A>, callback: ICallable<E, A, undefined>): this {
    //     widget.signal.listen('construct', callback)
    //     return this;
    // }
    //
    // mount(widget: IWidgetNode<E, A>, callback: ICallable<E, A, undefined>): this {
    //     widget.signal.listen('mount', callback)
    //     return this;
    // }
    //
    // unmount(widget: IWidgetNode<E, A>, callback: ICallable<E, A, undefined>): this {
    //     widget.signal.listen('unmount', callback)
    //     return this;
    // }
    //
    // before(widget: IWidgetNode<E, A>, callback: ICallable<E, A, undefined>): this {
    //     widget.signal.listen('before', callback)
    //     return this;
    // }
    //
    // after(widget: IWidgetNode<E, A>, callback: ICallable<E, A, undefined>): this {
    //     widget.signal.listen('after', callback)
    //     return this;
    // }

    clear(widget: IWidgetNode<E, A>,): this {
        if (widget.element) {
            Mockup.Context(
                widget.element, {
                    client: (element) => element.innerHTML = '',
                    server: (sheet) => sheet.html = '',
                })
        }
        widget.signal.dispatch('clear', {root: this.widget, widget, payload: undefined}, widget.signal);
        return this;
    }

    remove(widget: IWidgetNode<E, A>,): this {
        if (widget.element)
            Mockup.Context(
                widget.element, {
                    client: (element) => element.remove(),
                    server: (sheet) => sheet.remove(),
                })

        widget.signal.dispatch('remove', {root: this.widget, widget, payload: undefined}, widget.signal);
        return this;
    }

    enable(widget: IWidgetNode<E, A>,): this {
        widget.stylesheet.remove('opacity');
        widget.signal.dispatch('enable', {root: this.widget, widget, payload: undefined}, widget.signal);
        return this;
    }

    disable(widget: IWidgetNode<E, A>,): this {
        widget.stylesheet.update('opacity', '.3');
        widget.signal.dispatch('disable', {root: this.widget, widget, payload: undefined}, widget.signal);
        return this;
    }

    lock(widget: IWidgetNode<E, A>,): this {
        widget.locked = true;
        widget.disable();
        widget.signal.dispatch('lock', {root: this.widget, widget, payload: undefined}, widget.signal);
        return this;
    }

    unlock(widget: IWidgetNode<E, A>,): this {
        widget.locked = false;
        widget.enable();
        widget.signal.dispatch('unlock', {root: this.widget, widget, payload: undefined}, widget.signal);
        return this;
    }

    trigger(widget: IWidgetNode<E, A>, type: keyof IGlobalEventMap): this {
        if (widget.locked) return this;

        if (widget.element)
            Mockup.Context(
                widget.element, {
                    client: (element) => {
                        if (typeof element['on' + type] == 'function') {
                            const ev = new Event(type);
                            element['on' + type].call(this, ev);
                            widget.signal.dispatch('trigger', {
                                root: this.widget,
                                widget,
                                payload: {type, event: ev}
                            }, widget.signal);
                        }
                    },
                    server: () => void (0),
                })

        return this;
    }

    computedStyle(widget: IWidgetNode<E, A>, token: keyof IStyleDeclaration): string | undefined {

        if (widget.element)
            return Mockup.Context(
                widget.element, {
                    client: (element) =>
                        element.style[token] ||
                        getComputedStyle(element).getPropertyValue(token as string)
                        || undefined,
                    server: () => undefined,
                }
            )

        return undefined
    }

    hide(widget: IWidgetNode<E, A>,): this {
        if (widget.locked) return this;

        if (widget.element) {
            Mockup.Context(
                widget.element, {
                    client: (element) =>
                        element.style.display = 'none',
                    server: () => void (0),
                }
            )
            this.attributeLess(widget, {ariaDisabled: "true",})
        }

        widget.signal.dispatch('hide', {root: this.widget, widget, payload: undefined}, widget.signal);
        return this;
    }

    show(widget: IWidgetNode<E, A>,): this {
        if (widget.locked) return this;

        if (widget.element) {
            Mockup.Context(
                widget.element, {
                    client: (element) =>
                        element.style.removeProperty('display'),
                    server: () => void (0),
                }
            )
            this.attributeLess(widget, {ariaDisabled: undefined,})
        }
        widget.signal.dispatch('show', {root: this.widget, widget, payload: undefined}, widget.signal);
        return this;
    }

    toggle(widget: IWidgetNode<E, A>, option?: ToggleOption): this {
        if (widget.locked) return this;

        switch (option) {

            case ToggleOption.Visibility:
                if (widget.locked) widget.unlock();
                else widget.lock();
                break;

            case ToggleOption.Activity:
                break;

            case ToggleOption.Interactivity:
                widget.locked = !widget.locked;
                break;

            case ToggleOption.Stase:
                widget.attributeLess({
                    inert: true,
                })
                break;

            default:
                const display = widget.computedStyle('display')
                if (display?.toLowerCase() == 'none') widget.show()
                else widget.hide()
                break;

        }

        widget.signal.dispatch('toggle', {root: this.widget, widget, payload: option}, widget.signal);
        return this
    }

    data(widget: IWidgetNode<E, A>, dataset: IGlobalAttributes): this {
        if (widget.locked) return this;
        if (widget.element)
            Mockup.Context(
                widget.element, {
                    any: (element) =>
                        Object.keys(dataset || {})
                            .forEach(key => element.dataset ? element.dataset[key] = `${dataset[key]}` : void (0)),
                }
            );

        widget.signal.dispatch('data', {root: this.widget, widget, payload: dataset}, widget);
        return this;
    }

    attribute(widget: IWidgetNode<E, A>, attributes: Partial<A>): this {
        if (widget.locked) return this;
        this.attributeLess(widget, attributes as IGlobalAttributes);
        return this;
    }

    attributeLess(widget: IWidgetNode<E, A>, attributes: IGlobalAttributes): this {
        if (widget.locked) return this;
        if (widget.element)
            Mockup.Context(
                widget.element, {
                    client: (element) => {
                        Object.keys(attributes || {}).forEach(
                            key =>
                                (typeof attributes[key] !== "undefined")
                                    ? element.setAttribute(unCamelCase(key), `${attributes[key]?.toString()}`)
                                    : element.removeAttribute(unCamelCase(key))
                        )
                    },
                    server: (sheet) => {
                        Object.keys(attributes || {}).forEach(key =>
                            (typeof attributes[key] !== "undefined") ? sheet.attributes[unCamelCase(key)] = `${attributes[key]?.toString()}` : void (0))
                    }
                }
            );

        widget.signal.dispatch('attribute', {root: this.widget, widget, payload: attributes}, widget.signal);
        return this;
    }

    content(widget: IWidgetNode<E, A>, children: IChildren<IChildrenSupported>): this {
        if (widget.locked) return this;
        if (typeof children !== 'undefined') {
            if (Array.isArray(children)) {
                children.forEach(child => this.content(widget, child));
            } else if (children instanceof WidgetNode) {
                this.render(children, this.widget.context || new ContextWidget(widget))
                widget.mockup?.append(children.element);
                children.useContext(this.widget.context || widget.context);
                requestAnimationFrame(() => {
                    children.signal.dispatch('mount', {
                        root: this.widget,
                        widget: children,
                        payload: widget
                    }, children.signal);
                })
            } else if (children instanceof Promise) {
                children.then(child => this.content(widget, child));
            } else if (typeof children === 'function') {
                this.content(widget, children({
                    root: this.widget,
                    widget: widget,
                    payload: undefined,
                }))
            } else if (
                children instanceof HTMLElement ||
                children instanceof DocumentFragment ||
                children instanceof Text
            ) {
                widget.mockup?.append(children);
            } else if (children instanceof StateWidget) {
                children.bind(widget)
            } else if (typeof children === 'string' || typeof children === 'number') {
                widget.mockup?.append(document.createTextNode(`${children}`))
            }
        }

        return this;
    }

    style(widget: IWidgetNode<E, A>, declaration: IStyleSheetDeclarations): this {
        if (widget.locked) return this;
        Object.keys(declaration || {}).forEach(key => widget.stylesheet.update(key as keyof IStyleSheetDeclarations, declaration[key]));
        widget.signal.dispatch('style', {root: this.widget, widget, payload: declaration}, widget.signal);
        return this;
    }

    className(widget: IWidgetNode<E, A>, token: IStringToken): this {
        if (widget.locked) return this;
        (Array.isArray(token) ? token : token.split(' '))
            .forEach((t) => {
                if (t.trim().length > 0) {
                    if (Environment.Client) widget.element?.classList.add(t);
                    else widget.mockup?.className.add(t);
                }
            });
        widget.signal.dispatch('className', {root: this.widget, widget, payload: token}, widget.signal);
        return this;
    }

    value(widget: IWidgetNode<E, A>, data: IPrimitive): this {
        if (widget.locked) return this;
        if (widget.mockup) {
            widget.mockup.value = data;
            widget.signal.dispatch('value', {root: this.widget, widget, payload: data}, widget.signal);
        }
        return this;
    }

    html(widget: IWidgetNode<E, A>, data: string): this {
        if (widget.locked) return this;
        if (widget.mockup) {
            widget.mockup.html = data;
            widget.signal.dispatch('html', {root: this.widget, widget, payload: data}, widget);
        }
        return this;
    }

    listens(
        widget: IWidgetNode<E, A>,
        listeners: Partial<IEventListeners<E, A>>
    ): this {
        if (widget.locked) return this;
        Object.entries(listeners)
            .forEach(([type, callable]) => {
                this.listen(widget, type as keyof IGlobalEventMap, ({payload}) =>
                    callable({root: this.widget, widget, payload: payload as any}))
            })

        return this;
    }

    listen<T extends keyof IGlobalEventMap>(
        widget: IWidgetNode<E, A>,
        type: T,
        callback: ICallable<E, A, IGlobalEventPayload<T>>,
        options?: boolean | AddEventListenerOptions,
    ): this {
        if (widget.locked) return this;
        if (Environment.Client) {
            (widget.element as HTMLElement)?.addEventListener(type, ev => {
                if (widget.locked) return;
                const payload = {type, event: ev}
                const r = callback({root: this.widget, widget: widget, payload})
                widget.signal.dispatch('listen', {root: this.widget, widget, payload}, widget.signal);
                if (r === TreatmentQueueStatus.Cancel) ev.stopPropagation()
                if (r === TreatmentQueueStatus.Exit) ev.stopImmediatePropagation()
            }, options)
        }
        return this;
    }


    ons(
        widget: IWidgetNode<E, A>,
        listeners: Partial<IGlobalEventCallableMap<E, A>>
    ): this {
        if (widget.locked) return this;
        Object.entries(listeners)
            .forEach(([type, callable]) =>
                this.on(widget, type as keyof IGlobalEventMap, callable as any))

        return this;
    }

    on<T extends keyof IGlobalEventMap>(
        widget: IWidgetNode<E, A>,
        type: T,
        callback: ICallable<E, A, IGlobalEventPayload<T>> | null
    ): this {
        if (Environment.Client && widget.element) {
            widget.element['on' + type] = callback ? ev => {
                if (widget.locked) return;
                const payload = {type, event: ev};
                const returned = callback({root: this.widget, widget, payload})
                widget.signal.dispatch('on', {root: this.widget, widget, payload}, widget.signal);
                if (returned === TreatmentQueueStatus.Cancel) ev.stopPropagation()
                if (returned === TreatmentQueueStatus.Exit) ev.stopImmediatePropagation()
            } : null;
        }
        return this;
    }

    signals(widget: IWidgetNode<E, A>, signals: Partial<ISignalableCallbackMap<E, A>>): this {
        Object.entries(signals)
            .forEach(([key, callable]) =>
                widget.signal.listen(key as keyof IWidgetSignalMap<E, A>, callable as ISignalStackCallable<any>)
            )
        return this;
    }

    stase(widget: IWidgetNode<E, A>, state: boolean): this {
        this.attributeLess(widget, {inert: state,})
        return this
    }

    elevate(widget: IWidgetNode<E, A>, elevation: WidgetElevation): this {
        widget.elevate(elevation);
        return this
    }

    render<P extends IPropStack, S extends IStateStack>(widget: IWidgetNode<E, A>, context: IContext<P, S>): E | undefined {
        context.root = this.widget.context?.root || widget;
        widget
            .useContext(context)
            .stylesheet
            .merge((widget.constructor as typeof WidgetNode<E, A>).style || {})

        widget.signal
            .listen('mount', () => {
                (widget.constructor as typeof WidgetNode<E, A>).mount(widget);
            })
            .listen('unmount', () => {
                (widget.constructor as typeof WidgetNode<E, A>).unmount(widget);
            })


        if (widget.props.signal) this.signals(widget, widget.props.signal)

        if (widget.props.ref) widget.props.ref.attach(widget)

        if (widget.props.style) widget.stylesheet.bind(widget);

        if (widget.children) this.content(widget, widget.children);

        if (widget.attributes) this.attribute(widget, widget.attributes)

        if (widget.props.className) this.className(widget, widget.props.className);

        if (widget.props.listen) this.listens(widget, widget.props.listen);

        if (widget.props.on) this.ons(widget, widget.props.on)

        if (widget.props.data) this.data(widget, widget.props.data)

        if (widget.props.stase) this.stase(widget, widget.props.stase)

        if (widget.props.elevate) this.elevate(widget, widget.props.elevate)

        widget.signal.dispatch('construct', {root: context.root || widget, widget, payload: undefined}, widget.signal)

        return this.element;
    }
}