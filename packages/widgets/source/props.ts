import type {IAttributes, IPropStack, IWidgetNode} from "./types/index.js";
import {WidgetNode} from "./widget-node.js";
import {Environment} from "@protorians/core";
import {ISpectraElement} from "@protorians/spectra";


export function propsValue(data: any) {

    try {
        return JSON.parse(data);
    } catch (e) {
    }
    return data;
}


export function extractProps<P extends IPropStack>(provider: IWidgetNode<any, any> | HTMLElement): P {
    const props: P = {} as P
    const element: HTMLElement | ISpectraElement = provider instanceof WidgetNode ? (provider.element) : provider

    if (Environment.Client) {
        Object.values(element?.attributes as NamedNodeMap).forEach(attrib => {
            props[attrib.name as keyof P] = propsValue(attrib.value) as P[keyof P];
        })
    } else {
        Object.entries(element.attributes as IAttributes).forEach(([key, value]) => {
            props[key as keyof P] = propsValue(value) as P[keyof P];
        })
    }

    return props;
}