import { WidgetException } from "./errors/index.js";
import { createState } from "./state.js";
import { Signal } from "@protorians/core";
export class Kit {
    _options;
    _states = {};
    _status = createState(false);
    _structured = {};
    signal;
    static _default_configs = {
        structures: [],
    };
    static _configs = new Map();
    static _getConfigs() {
        const id = this.name;
        return this._configs.get(id);
    }
    static begin(options) {
        return (new this(options));
    }
    static callable(callable) {
        const kit = this.begin({});
        const options = callable(kit);
        return kit.setOptions(options).commit;
    }
    initialize() {
        Object.entries(this._options || {}).forEach(([key, value]) => this._states[key] = createState(value || undefined)
            .effect((state) => this.signal.dispatch('effect', state)));
        this._status.effect((state) => this.signal.dispatch('status', state));
        return this;
    }
    push(instance) {
        const configs = this.constructor._getConfigs();
        return (context) => {
            if (!configs?.main)
                throw (new WidgetException('No bootstrapper found')).show();
            instance = instance || this;
            const bootstrapper = typeof instance[configs.main] === 'function' ? instance[configs.main].apply(instance, [context]) : undefined;
            if (!bootstrapper)
                throw (new WidgetException('The bootstrapper is not a function')).show();
            if (typeof bootstrapper == 'function') {
                return bootstrapper;
            }
            bootstrapper.signal.listen('mount', () => instance.signal.dispatch('mount', context));
            bootstrapper.signal.listen('unmount', () => instance.signal.dispatch('unmount', context));
            this.layouts.widget = bootstrapper;
            return bootstrapper;
        };
    }
    get status() {
        return this._status.value;
    }
    get rollback() {
        return this.constructor.begin();
    }
    get commit() {
        return this.push(this);
    }
    get states() {
        return this._states;
    }
    get options() {
        return this._options;
    }
    get structures() {
        const configs = this.constructor._getConfigs();
        const _static = this.constructor;
        const layouts = {};
        if (configs && configs.structures) {
            configs.structures = configs?.structures || [];
            for (const name of configs.structures) {
                const composite = _static[name] || this[name] || undefined;
                if (typeof composite !== 'function') {
                    throw (new WidgetException(`Kit.${name} must be a function.`)).show();
                }
                layouts[name] = composite.bind(this);
            }
        }
        return layouts;
    }
    get layouts() {
        return this._structured;
    }
    constructor(_options = {}) {
        this._options = _options;
        this.signal = new Signal.Stack();
        this.initialize();
    }
    exposeLayout(key, widget) {
        this._structured[key] = (this._structured[key] || widget);
        return this;
    }
    setOptions(options) {
        this._options = options;
        for (const value of Object.values(this._options || {})) {
            if (value instanceof KitRef) {
                value.bind(this);
            }
        }
        return this.initialize();
    }
    updated(callable) {
        this.signal.listen('effect', () => callable(this));
        return this;
    }
    mounted(callable) {
        this.signal.listen('mount', callable);
        return this;
    }
    unmounted(callable) {
        this.signal.listen('unmount', callable);
        return this;
    }
    synchronize() {
        return this;
    }
    structure(name) {
        const _static = this.constructor;
        if (typeof _static[name] !== 'function')
            throw (new WidgetException(`Kit.${name.toString()} must be a function.`)).show();
        return _static[name];
    }
}
export class KitRef {
    _current = undefined;
    get current() {
        return this._current;
    }
    bind(kit) {
        this._current = kit;
        return this;
    }
}
export function createKitRef() {
    return new KitRef();
}
