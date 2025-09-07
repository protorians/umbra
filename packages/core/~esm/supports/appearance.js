import { MetricRandom } from "./metric.js";
import { EventDispatcher } from "./event-dispatcher.js";
import { ObjectUtility, TextUtility } from "../utilities/index.js";
var unCamelCase = TextUtility.unCamelCase;
export function CoreAppearanceProps(name, value) {
    const keys = [];
    const parsed = {};
    switch (name) {
        case "paddingVertical":
            keys.push("paddingTop");
            keys.push("paddingBottom");
            break;
        case "paddingHorizontal":
            keys.push("paddingLeft");
            keys.push("paddingRight");
            break;
        case "marginVertical":
            keys.push("marginTop");
            keys.push("marginBottom");
            break;
        case "marginHorizontal":
            keys.push("marginLeft");
            keys.push("marginRight");
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
export function CoreAppearanceValues(value) {
    if (typeof value == "number") {
        return `${value}`;
    }
    return value;
}
export class CoreAppearance {
    constructor() {
        this.emitter = new EventDispatcher();
        this.properties = {};
        this.instance = document.createElement("style");
        this.uid = `${MetricRandom.CreateAlpha(4).join("")}-${MetricRandom.Create(12).join("")}`;
    }
    sheet(stylesheet) {
        const styleSheet = [];
        Object.entries(stylesheet).forEach(({ 0: name, 1: props }) => {
            const properties = {};
            const selector = (name.includes("&"))
                ? name.replace(new RegExp("&", "g"), `.${this.uid}`)
                : `.${this.uid} ${name}`;
            const data = this.insertProperties(properties, props);
            styleSheet[styleSheet.length] = `${selector}{ ${ObjectUtility.toString(data, { joiner: "; " })} }`;
        });
        this.instance.innerHTML = styleSheet.join(" ");
        this.mountImmediat();
        return this;
    }
    inject(code) {
        this.instance.innerHTML = typeof code != "string"
            ? code.join(" ")
            : code;
        this.mountImmediat();
        return this;
    }
    insertProperties(properties, data) {
        Object.entries(data).forEach(({ 0: name, 1: value }) => {
            Object.entries(CoreAppearanceProps(name, value)).forEach(({ 0: key, 1: data }) => properties[key] = data);
        });
        this.emitter.dispatch("insertProperties", properties);
        return properties;
    }
    removeProperties(properties, payload) {
        Object.values(payload).forEach(name => {
            Object.entries(CoreAppearanceProps(name, undefined)).forEach(({ 0: key }) => properties[key] = undefined);
        });
        this.emitter.dispatch("removeProperties", properties);
        return properties;
    }
    set(properties) {
        this.insertProperties(this.properties, properties);
        this.emitter.dispatch("set", properties);
        return this.sync();
    }
    unset(properties) {
        this.removeProperties(this.properties, properties);
        this.emitter.dispatch("unset", properties);
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
        let head = document.querySelector("head");
        if (!head) {
            head = document.createElement("head");
            document.documentElement.append(head);
        }
        head.append(this.instance);
        this.emitter.dispatch("mount", this);
        return this;
    }
    destroy() {
        this.instance.remove();
        this.emitter.dispatch("destroy", undefined);
        return this;
    }
    sync() {
        const rendering = [];
        Object.entries(this.properties).forEach(({ 0: name, 1: value }) => {
            if (typeof value == "string" || typeof value == "number") {
                rendering[rendering.length] = `${unCamelCase(name)} : ${value}`;
            }
        });
        this.instance.innerHTML = `.${this.uid}{ ${rendering.join(";")} }`;
        this.emitter.dispatch("sync", this);
        this.mount();
        return this;
    }
}
