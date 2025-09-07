import { WidgetException } from "./errors/index.js";
import { StateWidget } from "./hooks/index.js";
export class Views {
}
export class ViewWidget {
    static _instance;
    static _widget;
    static _default_configs = {
        stateless: true,
        main: undefined,
        bootstrapper: undefined,
        defuser: undefined,
        properties: [],
        states: [],
        options: {},
    };
    static _configs = new Map();
    static props = {};
    static states = {};
    static get instance() {
        return this._instance;
    }
    static get widget() {
        return this._widget;
    }
    static _getConfigs() {
        return this._configs.get(this.name);
    }
    static subscribe(value) {
        this._instance = value;
        return this;
    }
    static bootstrap(payload) {
        const configs = this._getConfigs();
        if (typeof configs !== 'object')
            return;
        if (typeof configs.bootstrapper === 'undefined')
            return;
        if (this._instance && typeof this._instance[configs.bootstrapper] !== 'function')
            return;
        if (this._instance)
            this._instance[configs.bootstrapper].apply(this._instance, [payload]);
    }
    static defuse(payload) {
        const configs = this.constructor._getConfigs();
        if (typeof configs !== 'object')
            return;
        if (typeof configs.defuser === 'undefined')
            return;
        if (this._instance && typeof this._instance[configs.defuser] !== 'function')
            return;
        if (this._instance)
            this._instance[configs.defuser].apply(this._instance, [payload]);
    }
    static construct(props) {
        const configs = this._getConfigs();
        if (configs && !configs.main)
            throw (new WidgetException('Not View Main implemented')).show();
        let instance = (configs && !configs.stateless
            ? (this._instance || new this())
            : new this());
        if (configs && typeof configs.main !== 'undefined' && typeof instance[configs.main] !== 'function')
            throw (new WidgetException(`${configs.main} is not a function`)).show();
        if (configs && configs.properties) {
            configs.properties.forEach(name => {
                if (!instance)
                    return;
                if (typeof instance[name] === 'undefined' || typeof instance[name] === 'function')
                    return;
                Object.defineProperty(this.props, name, {
                    writable: false,
                    value: instance[name],
                });
            });
        }
        if (configs && configs.states && !configs.stateless) {
            configs.states.forEach(name => {
                if (!instance)
                    return;
                if (typeof instance[name] === 'undefined')
                    return;
                if (!(instance[name] instanceof StateWidget))
                    return;
                if (name in this.states)
                    Object.defineProperty(this.states, name, {
                        writable: false,
                        value: instance[name],
                    });
            });
        }
        this._widget = configs && typeof configs.main !== 'undefined'
            ? instance[configs.main].apply(instance, [props || {}])
            : undefined;
        this._widget?.attributeLess({ ariaCurrent: "page" });
        this._widget?.signal.listen('mount', (context) => this.bootstrap(context));
        this._widget?.signal.listen('unmount', (payload) => {
            this.defuse.apply(instance, [payload]);
            if (configs && configs.stateless) {
                this._widget?.clear();
                instance = undefined;
            }
        });
        return this._widget;
    }
    constructor() {
        this.constructor.subscribe(this);
    }
}
export class StatefulView extends ViewWidget {
    static _default_configs = {
        stateless: false,
        main: undefined,
        bootstrapper: undefined,
        defuser: undefined,
        properties: [],
        states: [],
        options: {},
    };
}
export class StatelessView extends ViewWidget {
    static _default_configs = {
        stateless: true,
        main: undefined,
        bootstrapper: undefined,
        defuser: undefined,
        properties: [],
        states: [],
        options: {},
    };
}
