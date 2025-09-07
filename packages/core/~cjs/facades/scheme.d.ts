import { ISchemeChild } from "../types/index.js";
export declare function stringScheme(initial?: string): ISchemeChild;
export declare function numberScheme(initial?: number): ISchemeChild;
export declare function bigintScheme(initial?: number): ISchemeChild;
export declare function booleanScheme(initial?: boolean): ISchemeChild;
export declare function objectScheme(initial?: object): ISchemeChild;
export declare function functionScheme(initial?: Function): ISchemeChild;
export declare function nullableScheme(): ISchemeChild;
