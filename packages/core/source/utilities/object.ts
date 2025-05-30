import type {
    ICoreAttributesMap,
    ICoreAttributesMapValues,
    IObjectToString,
    IQuadrilateral,
    QuadrilateralArray
} from "../types";
import {NumberUtility} from "./number";
import {TextUtility} from "./text";

export namespace ObjectUtility {

    import unCamelCase = TextUtility.unCamelCase;

    export function purge<T extends Object>(obj: T): T {
        const output = {} as T;
        for (let key in obj) {
            key = unCamelCase(key) as Extract<keyof T, string>;
            if (!obj.hasOwnProperty(key)) {
                output[key] = obj[key];
            }
        }
        return output;
    }

    export function update<T>(original: T, newer?: Partial<T> | undefined): T {

        if (newer) {
            Object.entries(newer).forEach(({0: name, 1: parameter}) =>
                original[name as keyof T] = parameter as T[keyof T]
            )
        }

        return original;
    }


    export function attributesValues(value: ICoreAttributesMapValues) {
        return (typeof value == 'object' && value) ? JSON.stringify(value) : value;
    }

    export function attributes<T extends ICoreAttributesMap>(
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
                        ...ObjectUtility.attributes(value, `${nms}${name}`, separator)
                    }
                }
            } else if (typeof value != 'undefined') {
                const k = `${nms}${name}`
                output[k as keyof T] = `${attributesValues(value)}` as T[keyof T];
            }
        })

        return output;
    }


    export function toString(payload: object, c?: IObjectToString) {
        c = c || {};

        return Object.entries(payload)
            .map(({0: name, 1: value}) =>
                `${c?.start || ''}${name}${c?.eq || ':'}${value}${c?.end || ''}`
            )
            .join(c?.joiner || '')
    }

    export function clear<T extends Object>(target: T) {
        const refactor: T = target
        Object.entries(target).forEach(([value, index]) => {
            if (NumberUtility.isNumber(index)) {
                refactor[index] = value;
            }
        })
        return refactor;
    }

    export function syncObjectArray<T extends Object, P>(target: T, provider: P[]) {
        target = ObjectUtility.clear(target);
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


    export function unWrap<T>(
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


    export function randomWithin<T>(provider: T[]): T | undefined {
        return (provider.length > 1) ? provider[Math.floor(Math.random() * provider.length)] : undefined;
    }

    export function clone<T>(target: T): T {
        return structuredClone(target);
    }

    export function omit<T>(target: T, keys: (string | number)[]): T {
        const accumulate: T = {...target};
        const provider = typeof target === "object"
            ? (Array.isArray(target) ? target.entries() : Object.entries(target || {}))
            : undefined;

        if (provider)
            for (const [key, value] of provider)
                (!keys.includes(key)) ? accumulate[key] = value : void (0);

        return accumulate;
    }
}