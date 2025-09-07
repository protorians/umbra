import { WidgetNode } from "./widget-node.js";
import { Environment } from "@protorians/core";
export function propsValue(data) {
    try {
        return JSON.parse(data);
    }
    catch (e) {
    }
    return data;
}
export function extractProps(provider) {
    const props = {};
    const element = provider instanceof WidgetNode ? (provider.element) : provider;
    if (Environment.Client) {
        Object.values(element?.attributes).forEach(attrib => {
            props[attrib.name] = propsValue(attrib.value);
        });
    }
    else {
        Object.entries(element.attributes).forEach(([key, value]) => {
            props[key] = propsValue(value);
        });
    }
    return props;
}
