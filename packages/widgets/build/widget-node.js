import { Environment, MetricRandom, Signal, TextUtility, TreatmentQueueStatus, } from "@protorians/core";
import { ObjectElevation, WidgetsNativeProperty } from "./enums.js";
import { Widgets } from "./widgets.js";
import { StyleWidget } from "./style.js";
import { SpectraElement } from "@protorians/spectra";
export const WidgetNativeProperties = Object.values(WidgetsNativeProperty);
export class ContextWidget {
    widget;
    root;
    props;
    state;
    engine;
    constructor(widget, props, state) {
        this.widget = widget;
        this.props = props || {};
        this.state = state || {};
    }
}
export class WidgetNode {
    element;
    _fingerprint;
    _isConnected = false;
    _reference;
    _tag = 'div';
    _attributes = {};
    _props = {};
    _signal;
    _locked = false;
    _context = undefined;
    _stylesheet = undefined;
    _mounted = false;
    constructor(declaration) {
        this.extractProperties(declaration);
        this.element = Environment.Client
            ? document.createElement(this.tag)
            : new SpectraElement(this.tag);
        this._fingerprint = `${MetricRandom.CreateAlpha(6).join('')}-${MetricRandom.Create(10).join('')}`;
        this._signal = new Signal.Stack;
        this.mount(() => this._isConnected = true);
    }
    static get style() {
        return undefined;
    }
    static get attributes() {
        return undefined;
    }
    static get children() {
        return undefined;
    }
    static mount(widget) {
        return widget;
    }
    static unmount(widget) {
        return widget;
    }
    get tag() {
        return this._tag;
    }
    get kind() {
        return 'view';
    }
    get fingerprint() {
        return this._fingerprint;
    }
    get isConnected() {
        return this._isConnected || ((Environment.Client && this.clientElement) ? this.clientElement.isConnected : false);
    }
    get clientElement() {
        return Environment.Client ? this.element || undefined : undefined;
    }
    get serverElement() {
        return Environment.Client ? undefined : this.element || undefined;
    }
    get children() {
        return this._props.children;
    }
    get attributes() {
        return this._attributes;
    }
    get props() {
        return this._props;
    }
    get datasets() {
        const dataset = {};
        const entries = Environment.Client
            ? Object.entries(this.clientElement?.dataset || {})
            : [...this.serverElement?.blueprint.attributes.entries() || []]
                .filter(x => x.toString().startsWith('data-'));
        for (const [key, value] of entries)
            dataset[TextUtility.camelCase(key)] = value;
        return dataset;
    }
    get reference() {
        return this._reference || undefined;
    }
    useReference(ref) {
        this._reference = ref;
        this._reference.attach(this);
        return this;
    }
    get locked() {
        return this._locked;
    }
    set locked(value) {
        this._locked = value;
        if (this._locked)
            this.lock();
        else
            this.unlock();
    }
    get signal() {
        return this._signal;
    }
    get measure() {
        return {
            x: 0,
            y: 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0,
            ...(Environment.Client ? this.clientElement?.getBoundingClientRect().toJSON() : {}),
        };
    }
    get stylesheet() {
        this._stylesheet = this._stylesheet || (new StyleWidget()).bind(this);
        return this._stylesheet;
    }
    get context() {
        return this._context;
    }
    useContext(context) {
        this._context = context;
        return this;
    }
    construct(callback) {
        this._signal.listen('construct', callback);
        return this;
    }
    mount(callback) {
        this._signal.listen('mount', payload => {
            if (!this._mounted) {
                this._mounted = true;
                return callback(payload);
            }
        });
        return this;
    }
    unmount(callback) {
        this._signal.listen('unmount', payload => {
            if (this._mounted) {
                this._mounted = false;
                return callback(payload);
            }
        });
        return this;
    }
    ready(callback) {
        if (!this._isConnected && this.context?.root) {
            callback({
                root: this.context?.root,
                widget: this,
                payload: this,
            });
        }
        else
            this.signal.listen('mount', (payload) => {
                callback(payload);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    before(callback) {
        this._signal.listen('before', callback);
        return this;
    }
    after(callback) {
        this._signal.listen('after', callback);
        return this;
    }
    get(state) {
        return Environment.Client ? (this.clientElement && typeof this.clientElement[state] !== "undefined" ? this.clientElement[state] : undefined) : undefined;
    }
    set(state) {
        if (Environment.Client && this.clientElement)
            this.clientElement[state] = state;
        return this;
    }
    clear() {
        if (this._context) {
            this._context?.engine?.clear(this);
        }
        if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.clear(this);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    remove() {
        if (this._context)
            this._context?.engine?.remove(this);
        if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.remove(this);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    enable() {
        if (this._context)
            this._context.engine?.enable(this);
        else if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.enable(this);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    disable() {
        if (this._context)
            this._context.engine?.disable(this);
        else if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.disable(this);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    lock() {
        if (this._context)
            this._context.engine?.lock(this);
        else if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.lock(this);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    focus() {
        if (this._context)
            this._context.engine?.focus(this);
        else if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.focus(this);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    blur() {
        if (this._context)
            this._context.engine?.blur(this);
        else if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.blur(this);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    unlock() {
        if (this._context)
            this._context.engine?.unlock(this);
        else if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.unlock(this);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    trigger(type) {
        if (this._context)
            this._context.engine?.trigger(this, type);
        else if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.trigger(this, type);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    stase(state) {
        if (this._context)
            this._context.engine?.stase(this, state);
        else if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.stase(this, state);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    computedStyle(token) {
        return this.context?.engine?.computedStyle(this, token);
    }
    hide() {
        if (this._context)
            this._context.engine?.hide(this);
        else if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.hide(this);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    show(display) {
        if (this._context)
            this._context.engine?.show(this, display);
        else if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.show(this, display);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    toggle(option) {
        if (this._context)
            this._context.engine?.toggle(this, option);
        else if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.toggle(this, option);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    elevate(elevation) {
        this
            .stylesheet
            .merge({ zIndex: elevation?.toString() || ObjectElevation.None })
            .sync();
        return this;
    }
    data(dataset) {
        if (this._context)
            this._context.engine?.data(this, dataset);
        else if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.data(this, dataset);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    attribute(attributes) {
        if (this._context)
            this._context.engine?.attribute(this, attributes);
        else if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.attribute(this, attributes);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    attributeLess(attributes) {
        if (this._context)
            this._context.engine?.attributeLess(this, attributes);
        else if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.attributeLess(this, attributes);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    style(declaration) {
        this.stylesheet.merge(declaration).sync();
        return this;
    }
    className(token) {
        if (this._context)
            this._context.engine?.className(this, token);
        else if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.className(this, token);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    removeClassName(token) {
        if (this._context)
            this._context.engine?.removeClassName(this, token);
        else if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.removeClassName(this, token);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    replaceClassName(oldToken, token) {
        if (this._context)
            this._context.engine?.replaceClassName(this, oldToken, token);
        else if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.replaceClassName(this, oldToken, token);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    clearClassName() {
        if (this._context)
            this._context.engine?.clearClassName(this);
        else if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.clearClassName(this);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    value(data) {
        if (this._context)
            this._context.engine?.value(this, data);
        else if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.value(this, data);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    html(code) {
        if (this._context)
            this._context.engine?.html(this, code);
        else if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.html(this, code);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    content(children) {
        if (this._context)
            this._context.engine?.content(this, children);
        else if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.content(this, children);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    listen(type, callback, options = false) {
        if (this._context)
            this._context.engine?.listen(this, type, callback, options);
        else if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.listen(this, type, callback, options);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    on(type, callback) {
        if (this._context)
            this._context.engine?.on(this, type, callback);
        else if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.on(this, type, callback);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    detachEvent(type) {
        if (this._context)
            this._context.engine?.detachEvent(this, type);
        else if (!this._context)
            this._signal.listen('mount', () => {
                this._context?.engine?.detachEvent(this, type);
                return TreatmentQueueStatus.SnapOut;
            });
        return this;
    }
    clone() {
        return new this.constructor(structuredClone({ ...this.props, ...this.attributes }));
    }
    append(children) {
        if (Array.isArray(children))
            children.forEach(child => this.element?.append(child));
        else if (children instanceof WidgetNode) {
            this.element?.append(children.element);
            children.useContext(this._context);
        }
        return this;
    }
    prepend(children) {
        if (Array.isArray(children))
            children.forEach(child => this.element?.prepend(child));
        else if (children instanceof WidgetNode) {
            this.element?.prepend(children.element);
            children.useContext(this._context);
        }
        return this;
    }
    callable(callable) {
        if (Environment.Client && this.clientElement && callable.client)
            callable.client(this.clientElement);
        if (!Environment.Client && this.serverElement && callable.server)
            callable.server(this.serverElement);
        return this;
    }
    extractProperties(properties) {
        properties = properties || this._props || {};
        const _attributes = {};
        const _props = {};
        properties.children = properties.children || this.constructor.children;
        Object.keys(properties)
            .forEach((key) => {
            if (!WidgetNativeProperties.includes(key))
                _attributes[key] = properties[key];
            else
                _props[key] = properties[key];
        });
        this._attributes = { ...(this.constructor.attributes || {}), ..._attributes };
        this._props = _props;
        return this;
    }
}
export function WidgetBuilder(widget, context) {
    const engine = ((Environment.Client) ? Widgets.Engine.client(widget) : Widgets.Engine.server(widget));
    context.engine = engine;
    return engine.render(widget, context);
}
