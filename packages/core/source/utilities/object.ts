import type {
    ICoreAttributesMap,
    ICoreAttributesMapValues,
    IObjectToString,
    IQuadrilateral,
    QuadrilateralArray
} from "../types";
import {isNumber} from "./number";
import {unCamelCase} from "./text";

export function purgeObject<T extends Object>(obj: T): T {
    const output = {} as T;
    for (let key in obj) {
        key = unCamelCase(key) as Extract<keyof T, string>;
        if (!obj.hasOwnProperty(key)) {
            output[key] = obj[key];
        }
    }
    return output;
}

export function updateObject<T>(
    originalObject: T,
    parameters?: Partial<T> | undefined
) {

    if (parameters) {
        Object.entries(parameters).forEach(({0: name, 1: parameter}) =>
            originalObject[name as keyof T] = parameter as T[keyof T]
        )
    }

    return originalObject;
}


export function attributesValues(value: ICoreAttributesMapValues) {
    let parsed = value;

    if (typeof value == 'object' && value) {
        parsed = JSON.stringify(value)
    }

    return parsed;
}

export function attributesObject<T extends ICoreAttributesMap>(
    attributes: ICoreAttributesMap,
    ns?: string | undefined,
    separator?: string | undefined
): T {
    const nms = (typeof ns != 'undefined' ? `${ns}${separator || '-'}` : '');
    let output: T = {} as T

    Object.entries(attributes).map(({0: name, 1: value}) => {
        if (typeof value == 'object' && value) {
            if (Array.isArray(value)) {
                const k = `${nms}${name}` as keyof T
                output[k] = `${attributesValues(value)}` as T[keyof T];
            } else {
                output = {
                    ...output,
                    ...attributesObject(value, `${nms}${name}`, separator)
                }
            }
        } else if (typeof value != 'undefined') {
            const k = `${nms}${name}`
            output[k as keyof T] = `${attributesValues(value)}` as T[keyof T];
        }
    })

    return output;
}


export function objectToString(payload: object, c?: IObjectToString) {
    c = c || {};

    return Object.entries(payload)
        .map(({0: name, 1: value}) =>
            `${c?.start || ''}${name}${c?.eq || ':'}${value}${c?.end || ''}`
        )
        .join(c?.joiner || '')
}

export function clearObjectArray<T extends Object>(target: T) {
    const refactor: T = target
    Object.entries(target).forEach(([value, index]) => {
        if (isNumber(index)) {
            refactor[index] = value;
        }
    })
    return refactor;
}

export function syncObjectArray<T extends Object, P>(target: T, provider: P[]) {
    target = clearObjectArray(target);
    provider.forEach((value, index) => {
        target[index] = value;
    })
    return target;
}

export function quadrilateral<T>(provider: QuadrilateralArray<T>[]): IQuadrilateral<QuadrilateralArray<T>> {
    let value: IQuadrilateral<QuadrilateralArray<T>> = {}

    if (!provider.length) {
    } else if (provider.length === 1) {
        value = {
            top: provider[0],
            right: provider[0],
            bottom: provider[0],
            left: provider[0],
        }
    } else if (provider.length === 2) {
        value = {
            top: provider[0],
            right: provider[1],
            bottom: provider[0],
            left: provider[1],
        }
    } else if (provider.length === 3) {
        value = {
            top: provider[0],
            right: provider[1],
            bottom: provider[0],
        }
    } else if (provider.length === 4) {
        value = {
            top: provider[0],
            right: provider[1],
            bottom: provider[2],
            left: provider[3],
        }
    }

    return value
}


export function toNested<T>(obj: T, nestedPath: string): any {
    return nestedPath.split('.')
        .reduce((acc, key) => acc && acc[key], obj);
}


export function deepMerge<T>(
    input: any,
): T[] {
    const result: T[] = [];

    function deep(value: T) {
        if (Array.isArray(value)) {
            value.forEach(deep);
        } else if (typeof value === "object" && value !== null) {
            Object.values(value).forEach(deep);
        } else {
            result.push(value);
        }
    }

    deep(input);
    return result;
}


export function destroyInstance<T>(instance: T | null | undefined): undefined {
    instance = null;
    instance = undefined;
    return instance;
}
