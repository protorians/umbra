import { Environment } from "./environment.js";
export var Callable;
(function (Callable) {
    function safe(fn, args) {
        if (Environment.Client)
            return requestAnimationFrame(() => fn(...(args || [])));
        else
            return setTimeout(() => fn(...(args || [])), 60);
    }
    Callable.safe = safe;
    function every(fn, args, timeout) {
        return setInterval(() => fn(...(args || [])), timeout || 60);
    }
    Callable.every = every;
    function delay(fn, args, timeout) {
        return setTimeout(() => fn(...(args || [])), timeout || 60);
    }
    Callable.delay = delay;
})(Callable || (Callable = {}));
