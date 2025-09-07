"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringScheme = stringScheme;
exports.numberScheme = numberScheme;
exports.bigintScheme = bigintScheme;
exports.booleanScheme = booleanScheme;
exports.objectScheme = objectScheme;
exports.functionScheme = functionScheme;
exports.nullableScheme = nullableScheme;
const supports_1 = require("../supports");
function stringScheme(initial) {
    return (new supports_1.SchemeChild())
        .type(String(initial || ''))
        .required(true);
}
function numberScheme(initial) {
    return (new supports_1.SchemeChild())
        .type(Number(initial || ''))
        .required(true);
}
function bigintScheme(initial) {
    return (new supports_1.SchemeChild())
        .type(BigInt(initial || ''))
        .required(true);
}
function booleanScheme(initial) {
    return (new supports_1.SchemeChild())
        .type(Boolean(initial || ''))
        .required(true);
}
function objectScheme(initial) {
    return (new supports_1.SchemeChild())
        .type(initial || Object())
        .required(true);
}
function functionScheme(initial) {
    return (new supports_1.SchemeChild())
        .type(initial || Function())
        .required(true);
}
function nullableScheme() {
    return (new supports_1.SchemeChild())
        .type(null)
        .required(true);
}
