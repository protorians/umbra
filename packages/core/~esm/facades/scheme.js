import { SchemeChild } from "../supports/index.js";
export function stringScheme(initial) {
    return (new SchemeChild())
        .type(String(initial || ""))
        .required(true);
}
export function numberScheme(initial) {
    return (new SchemeChild())
        .type(Number(initial || ""))
        .required(true);
}
export function bigintScheme(initial) {
    return (new SchemeChild())
        .type(BigInt(initial || ""))
        .required(true);
}
export function booleanScheme(initial) {
    return (new SchemeChild())
        .type(Boolean(initial || ""))
        .required(true);
}
export function objectScheme(initial) {
    return (new SchemeChild())
        .type(initial || Object())
        .required(true);
}
export function functionScheme(initial) {
    return (new SchemeChild())
        .type(initial || Function())
        .required(true);
}
export function nullableScheme() {
    return (new SchemeChild())
        .type(null)
        .required(true);
}
