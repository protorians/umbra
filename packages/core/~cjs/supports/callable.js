"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Callable = void 0;
const environment_1 = require("./environment");
var Callable;
(function (Callable) {
    function safe(fn, args) {
        if (environment_1.Environment.Client)
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
})(Callable || (exports.Callable = Callable = {}));
