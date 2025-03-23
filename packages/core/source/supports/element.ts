import {IUiTarget} from "../types";

export function $ui<T extends HTMLElement>(target: IUiTarget<T>, scope?: Document | HTMLElement): T[] {
    return typeof target === 'string' ? Array.from((scope || document).querySelectorAll<T>(target)) : (Array.isArray(target) ? target : [target]);
}