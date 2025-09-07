"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreAppearance = void 0;
exports.CoreAppearanceProps = CoreAppearanceProps;
exports.CoreAppearanceValues = CoreAppearanceValues;
const metric_1 = require("./metric");
const event_dispatcher_1 = require("./event-dispatcher");
const utilities_1 = require("../utilities");
var unCamelCase = utilities_1.TextUtility.unCamelCase;
function CoreAppearanceProps(name, value) {
    const keys = [];
    const parsed = {};
    switch (name) {
        case 'paddingVertical':
            keys.push('paddingTop');
            keys.push('paddingBottom');
            break;
        case 'paddingHorizontal':
            keys.push('paddingLeft');
            keys.push('paddingRight');
            break;
        case 'marginVertical':
            keys.push('marginTop');
            keys.push('marginBottom');
            break;
        case 'marginHorizontal':
            keys.push('marginLeft');
            keys.push('marginRight');
            break;
        default:
            keys.push(name);
            break;
    }
    keys.forEach(key => {
        parsed[unCamelCase(key)] = CoreAppearanceValues(value);
    });
    return parsed;
}
function CoreAppearanceValues(value) {
    if (typeof value == 'number') {
        return `${value}`;
    }
    return value;
}
class CoreAppearance {
    constructor() {
        this.emitter = new event_dispatcher_1.EventDispatcher();
        this.properties = {};
        this.instance = document.createElement('style');
        this.uid = `${metric_1.MetricRandom.CreateAlpha(4).join('')}-${metric_1.MetricRandom.Create(12).join('')}`;
    }
    sheet(stylesheet) {
        const styleSheet = [];
        Object.entries(stylesheet).forEach(({ 0: name, 1: props }) => {
            const properties = {};
            const selector = (name.includes('&'))
                ? name.replace(new RegExp('&', 'g'), `.${this.uid}`)
                : `.${this.uid} ${name}`;
            const data = this.insertProperties(properties, props);
            styleSheet[styleSheet.length] = `${selector}{ ${utilities_1.ObjectUtility.toString(data, { joiner: '; ' })} }`;
        });
        this.instance.innerHTML = styleSheet.join(' ');
        this.mountImmediat();
        return this;
    }
    inject(code) {
        this.instance.innerHTML = typeof code != 'string'
            ? code.join(' ')
            : code;
        this.mountImmediat();
        return this;
    }
    insertProperties(properties, data) {
        Object.entries(data).forEach(({ 0: name, 1: value }) => {
            Object.entries(CoreAppearanceProps(name, value)).forEach(({ 0: key, 1: data }) => properties[key] = data);
        });
        this.emitter.dispatch('insertProperties', properties);
        return properties;
    }
    removeProperties(properties, payload) {
        Object.values(payload).forEach(name => {
            Object.entries(CoreAppearanceProps(name, undefined)).forEach(({ 0: key }) => properties[key] = undefined);
        });
        this.emitter.dispatch('removeProperties', properties);
        return properties;
    }
    set(properties) {
        this.insertProperties(this.properties, properties);
        this.emitter.dispatch('set', properties);
        return this.sync();
    }
    unset(properties) {
        this.removeProperties(this.properties, properties);
        this.emitter.dispatch('unset', properties);
        return this.sync();
    }
    mount() {
        const length = Object.values(this.properties).length;
        if (!this.instance.isConnected && length) {
            this.mountImmediat();
        }
        return this;
    }
    mountImmediat() {
        let head = document.querySelector('head');
        if (!head) {
            head = document.createElement('head');
            document.documentElement.append(head);
        }
        head.append(this.instance);
        this.emitter.dispatch('mount', this);
        return this;
    }
    destroy() {
        this.instance.remove();
        this.emitter.dispatch('destroy', undefined);
        return this;
    }
    sync() {
        const rendering = [];
        Object.entries(this.properties).forEach(({ 0: name, 1: value }) => {
            if (typeof value == 'string' || typeof value == 'number') {
                rendering[rendering.length] = `${unCamelCase(name)} : ${value}`;
            }
        });
        this.instance.innerHTML = `.${this.uid}{ ${rendering.join(';')} }`;
        this.emitter.dispatch('sync', this);
        this.mount();
        return this;
    }
}
exports.CoreAppearance = CoreAppearance;
