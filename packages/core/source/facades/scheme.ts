import {SchemeChild} from "../supports";
import {ISchemeChild} from "../types";

export function stringScheme(initial?: string): ISchemeChild {
    return (new SchemeChild())
        .type(String(initial || ''))
        .required(true)
}

export function numberScheme(initial?: number): ISchemeChild {
    return (new SchemeChild())
        .type(Number(initial || ''))
        .required(true)
}

export function bigintScheme(initial?: number): ISchemeChild {
    return (new SchemeChild())
        .type(BigInt(initial || ''))
        .required(true)
}

export function booleanScheme(initial?: boolean): ISchemeChild {
    return (new SchemeChild())
        .type(Boolean(initial || ''))
        .required(true)
}

export function objectScheme(initial?: object): ISchemeChild {
    return (new SchemeChild())
        .type(initial || Object())
        .required(true)
}

export function functionScheme(initial?: Function): ISchemeChild {
    return (new SchemeChild())
        .type(initial || Function())
        .required(true)
}

export function nullableScheme(): ISchemeChild {
    return (new SchemeChild())
        .type(null)
        .required(true)
}
