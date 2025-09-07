import { NumberUtility } from "./number.js";
import { TextUtility } from "./text.js";
export var ObjectUtility;
(function (ObjectUtility) {
    var unCamelCase = TextUtility.unCamelCase;
    function purge(obj) {
        if (Array.isArray(obj)) {
            const output = [];
            for (const entry of obj) {
                if (!output.includes(entry)) {
                    output.push(entry);
                }
            }
            return output;
        }
        else {
            const output = {};
            for (let key in obj) {
                key = unCamelCase(key);
                if (!obj.hasOwnProperty(key)) {
                    output[key] = obj[key];
                }
            }
            return output;
        }
    }
    ObjectUtility.purge = purge;
    function update(original, newer) {
        if (newer) {
            Object.entries(newer).forEach(({ 0: name, 1: parameter }) => original[name] = parameter);
        }
        return original;
    }
    ObjectUtility.update = update;
    function attributesValues(value) {
        return (typeof value == "object" && value) ? JSON.stringify(value) : value;
    }
    ObjectUtility.attributesValues = attributesValues;
    function attributes(attributes, ns, separator) {
        const nms = (typeof ns != "undefined" ? `${ns}${separator || "-"}` : "");
        let output = {};
        Object.entries(attributes).map(({ 0: name, 1: value }) => {
            if (typeof value == "object" && value) {
                if (Array.isArray(value)) {
                    const k = `${nms}${name}`;
                    output[k] = `${attributesValues(value)}`;
                }
                else {
                    output = Object.assign(Object.assign({}, output), ObjectUtility.attributes(value, `${nms}${name}`, separator));
                }
            }
            else if (typeof value != "undefined") {
                const k = `${nms}${name}`;
                output[k] = `${attributesValues(value)}`;
            }
        });
        return output;
    }
    ObjectUtility.attributes = attributes;
    function toString(payload, c) {
        c = c || {};
        return Object.entries(payload)
            .map(({ 0: name, 1: value }) => `${(c === null || c === void 0 ? void 0 : c.start) || ""}${name}${(c === null || c === void 0 ? void 0 : c.eq) || ":"}${value}${(c === null || c === void 0 ? void 0 : c.end) || ""}`)
            .join((c === null || c === void 0 ? void 0 : c.joiner) || "");
    }
    ObjectUtility.toString = toString;
    function clear(target) {
        const refactor = target;
        Object.entries(target).forEach(([value, index]) => {
            if (NumberUtility.isNumber(index)) {
                refactor[index] = value;
            }
        });
        return refactor;
    }
    ObjectUtility.clear = clear;
    function syncObjectArray(target, provider) {
        target = ObjectUtility.clear(target);
        provider.forEach((value, index) => {
            target[index] = value;
        });
        return target;
    }
    ObjectUtility.syncObjectArray = syncObjectArray;
    function quadrilateral(provider) {
        let value = {};
        if (!provider.length) {
        }
        else if (provider.length === 1) {
            value = {
                top: provider[0],
                right: provider[0],
                bottom: provider[0],
                left: provider[0],
            };
        }
        else if (provider.length === 2) {
            value = {
                top: provider[0],
                right: provider[1],
                bottom: provider[0],
                left: provider[1],
            };
        }
        else if (provider.length === 3) {
            value = {
                top: provider[0],
                right: provider[1],
                bottom: provider[0],
            };
        }
        else if (provider.length === 4) {
            value = {
                top: provider[0],
                right: provider[1],
                bottom: provider[2],
                left: provider[3],
            };
        }
        return value;
    }
    ObjectUtility.quadrilateral = quadrilateral;
    function toNested(obj, nestedPath) {
        return nestedPath.split(".")
            .reduce((acc, key) => acc && acc[key], obj);
    }
    ObjectUtility.toNested = toNested;
    function unWrap(input) {
        const result = [];
        function deep(value) {
            if (Array.isArray(value)) {
                value.forEach(deep);
            }
            else if (typeof value === "object" && value !== null) {
                Object.values(value).forEach(deep);
            }
            else {
                result.push(value);
            }
        }
        deep(input);
        return result;
    }
    ObjectUtility.unWrap = unWrap;
    function randomWithin(provider) {
        return (provider.length > 1) ? provider[Math.floor(Math.random() * provider.length)] : undefined;
    }
    ObjectUtility.randomWithin = randomWithin;
    function clone(target) {
        return structuredClone(target);
    }
    ObjectUtility.clone = clone;
    function omit(target, keys) {
        const accumulate = Object.assign({}, target);
        const provider = typeof target === "object"
            ? (Array.isArray(target) ? target.entries() : Object.entries(target || {}))
            : undefined;
        if (provider)
            for (const [key, value] of provider)
                (!keys.includes(key)) ? accumulate[key] = value : void (0);
        return accumulate;
    }
    ObjectUtility.omit = omit;
    function previous(array, from, loop = false) {
        return (from)
            ? array[array.indexOf(from) - 1] || (loop ? array[0] || null : null)
            : array[0] || null;
    }
    ObjectUtility.previous = previous;
    function next(array, from, loop = false) {
        return (from)
            ? array[array.indexOf(from) + 1] || (loop ? array[0] || null : null)
            : array[0] || null;
    }
    ObjectUtility.next = next;
    function refactor(array, from, to) {
        const refactor = [];
        to = to || array.length;
        for (let i = 0; i < array.length; i++) {
            if (from <= i && to >= i) {
                refactor.push(array[i]);
            }
        }
        return refactor;
    }
    ObjectUtility.refactor = refactor;
})(ObjectUtility || (ObjectUtility = {}));
