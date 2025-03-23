import { Environment } from "./environment";

export namespace Callable {
    export function safe<T extends []>(fn: Function, args?: T): number | NodeJS.Timer {
        if(Environment.Client) return requestAnimationFrame(() => fn(...(args || [])));
        else return setTimeout(() => fn(...(args || [])), 60);
    }

    export function every<T extends []>(fn: Function, args?: T, timeout?: number): number | NodeJS.Timer {
        return setInterval(() => fn(...(args || [])), timeout || 60);
    }

    export function delay<T extends []>(fn: Function, args?: T, timeout?: number): number | NodeJS.Timer {
        return setTimeout(() => fn(...(args || [])), timeout || 60);
    }
}