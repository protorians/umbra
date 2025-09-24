import {IDynamicParametersBag} from "@protorians/parameters-bag";


export type IStyleStrictSupportedValue = string | number;
export type IStyleSupportedValue = object | IStyleStrictSupportedValue;

export type IStyleExtendedDeclaration = {
    'paddingX': IStyleSupportedValue;
    'paddingY': IStyleSupportedValue;
    'marginX': IStyleSupportedValue;
    'marginY': IStyleSupportedValue;
}

export type IStyleDeclaration = {
    [K in (keyof CSSStyleDeclaration | keyof IStyleExtendedDeclaration)]: IStyleSupportedValue;
}

// export type IStyleStrictDeclaration = {
//     [K in (keyof CSSStyleDeclaration | keyof IStyleExtendedDeclaration)]: IStyleStrictSupportedValue;
// }

export interface IStyleParameterBag extends IDynamicParametersBag<IStyleDeclaration> {

}
