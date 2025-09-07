import { $ui, ObjectUtility, TextUtility } from "@protorians/core";
import { createAnimetric, createAnimetricGroup } from "./engine.js";
var snapSequence = TextUtility.snapSequence;
var parseSequence = TextUtility.parseSequence;
var unWrap = ObjectUtility.unWrap;
export function createSlimSequence(targets, property, from, to, forwarding = false) {
    const _from = unWrap((Array.isArray(from) ? from : [from]).map(n => [...n.toString().matchAll(/-?\d+(\.\d+)?/g)].map(x => x[0] * 1)));
    const _to = unWrap((Array.isArray(to) ? to : [to]).map(n => [...n.toString().matchAll(/-?\d+(\.\d+)?/g)].map(x => x[0] * 1)));
    const sequence = snapSequence(/-?\d+(\.\d+)?/g, to.toString());
    const initial = [];
    if (!forwarding) {
        for (const target of $ui(targets)) {
            if (target.style[property] && typeof target.style[property] !== "function")
                initial.push(target.style[property]);
        }
    }
    const instance = createAnimetric()
        .from(..._from)
        .to(..._to)
        .callable(({ frames }) => {
        for (const target of $ui(targets)) {
            target.style[property] = parseSequence(sequence, frames);
        }
    });
    instance.signal.listen("complete", () => {
        if (!forwarding)
            $ui(targets).forEach((target, index) => {
                target.style[property] = initial[index];
            });
    });
    return instance;
}
export function createSlimSequences(target, from, to, forwarding = false) {
    const timelines = [];
    for (const property of Object.keys(to)) {
        const _to = to[property];
        const _from = typeof from[property] == "undefined" ? _to : from[property];
        timelines.push(createSlimSequence(target, property, _from, _to, forwarding));
    }
    return timelines;
}
export function slimetric(target, options) {
    options.from = options.from || {};
    options.parallel = typeof options.parallel === "undefined" ? true : options.parallel;
    return createAnimetricGroup(createSlimSequences(target, options.from, options.to, options.forwarding), options);
}
