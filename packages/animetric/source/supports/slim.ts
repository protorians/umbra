import {$ui, type IUiTarget, ObjectUtility, TextUtility} from "@protorians/core";
import type {IAnimetric, IAnimetricSequence, IAnimetricSlimOptions} from "../types";
import {createAnimetric, createAnimetricGroup} from "./engine";
import snapSequence = TextUtility.snapSequence;
import unWrap = ObjectUtility.unWrap;


export function createSlimSequence<T extends HTMLElement>(
    targets: IUiTarget<T>,
    property: keyof CSSStyleDeclaration,
    from: number,
    to: number
): IAnimetric {
    const _from = unWrap<number>((Array.isArray(from) ? from : [from]).map(n => [...n.toString().matchAll(/-?\d+(\.\d+)?/g)].map(x => (x[0] as any) * 1)));
    const _to = unWrap<number>((Array.isArray(to) ? to : [to]).map(n => [...n.toString().matchAll(/-?\d+(\.\d+)?/g)].map(x => (x[0] as any) * 1)));
    const sequence = snapSequence(/-?\d+(\.\d+)?/g, to.toString());

    return createAnimetric()
        .from(..._from)
        .to(..._to)
        .callable(({frames}) => {
            for (const target of $ui(targets)) {
                // @ts-ignore
                target.style[property] = parseSequence(sequence, frames);
            }
        })
}


export function createSlimSequences<T extends HTMLElement>(
    target: IUiTarget<T>,
    from: Partial<IAnimetricSequence>,
    to: Partial<IAnimetricSequence>,
): IAnimetric[] {
    const timelines: IAnimetric[] = [];
    for (const property of Object.keys(to)) {
        const _to = to[property];
        const _from = typeof from[property] == 'undefined' ? _to : from[property];
        timelines.push(createSlimSequence(target, property as keyof CSSStyleDeclaration, _from, _to))
    }
    return timelines;
}

export function slimetric<T extends HTMLElement>(target: IUiTarget<T>, options: IAnimetricSlimOptions) {
    options.from = options.from || {};
    options.parallel = typeof options.parallel === 'undefined' ? true : options.parallel;
    return createAnimetricGroup(createSlimSequences(target, options.from, options.to), options)
}
