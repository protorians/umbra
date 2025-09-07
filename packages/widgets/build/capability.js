import { WidgetException } from "./errors/index.js";
export class WidgetCapability {
    name;
    callable;
    target;
    constructor(name, callable) {
        this.name = name;
        this.callable = callable;
    }
    on(widget) {
        this.target = widget;
        return this;
    }
    make(payload) {
        if (this.target && this.target.context && this.target.context.root) {
            return this.callable({
                root: this.target.context.root,
                widget: this.target,
                payload
            });
        }
    }
}
export function createWidgetCapability(name, callable) {
    return new WidgetCapability(name, callable);
}
export class Capabilities {
    _scheme = {};
    get scheme() {
        return this._scheme;
    }
    attach(capability) {
        const name = capability.name;
        if (typeof this._scheme[name] !== 'undefined') {
            throw (new WidgetException(`This capability is already attached`)).show();
        }
        this._scheme[name] = capability;
        return this;
    }
    override(capability) {
        const name = capability.name;
        this._scheme[name] = capability;
        return this;
    }
    detach(name) {
        if (typeof this._scheme[name] === 'undefined') {
            throw (new WidgetException(`This capability is not attached`)).show();
        }
        this._scheme[name] = undefined;
        return this;
    }
    capability(name) {
        return (this._scheme[name] || undefined);
    }
    has(name) {
        return typeof this._scheme[name] !== 'undefined';
    }
}
export function createWidgetCapabilities() {
    return new Capabilities;
}
