import {AbsoluteUnit, RelativeUnit} from "../enums.js";
import {IWidgetNode} from "./index.js";

export interface IStyleAliasDictionary {
    [key: string]: Array<keyof CSSStyleDeclaration>;
}

// export type IStyleAutoSizingPropertiesDictionary = {
//     [key in keyof CSSStyleDeclaration]: boolean;
// }

export type IStyleSupportedValue = object | string | number | undefined

export type IStyleExtendedDeclaration = {
    'paddingX': IStyleSupportedValue;
    'paddingY': IStyleSupportedValue;
    'marginX': IStyleSupportedValue;
    'marginY': IStyleSupportedValue;
}

export type IStyleDeclaration = {
    [K in (keyof CSSStyleDeclaration | keyof IStyleExtendedDeclaration)]: IStyleSupportedValue;
}

export type IStyleSettings = {
    bytes: number;
    unit: AbsoluteUnit | RelativeUnit;
    spacing?: string | number;
    corner?: string | number;
}

export type IStyleOptions = {
    attach?: boolean;
    lock?: boolean;
    fingerprint?: string;
}

// export type IStyleDeclarationController = ISignalController<Partial<IStyleDeclaration>>

// export type IStyleCascadeCallable = (fingerprint: string, computed: string) => void
//
// export interface IStyleCascades {
//     [K: string]: IStyleDeclarationController | undefined
// }
//
// export interface IStyleCascadesDeclarations {
//     [K: string]: Partial<IStyleDeclaration> | undefined
// }
//
// export interface IStyleCascadesComputed {
//     [K: string]: string
// }
//
// export interface IStyleCascadesAttaches {
//     [K: string]: HTMLStyleElement | undefined;
// }


// export type IStyleSheetInlineDeclaration = {
//     [K in keyof IStyleDeclaration]: IStyleDeclaration[K]
// }

// export type IStyleSheetCascadeDeclaration = {
//     [K: string]: IStyleSheet | string;
// }

export type IStyleSheetCascade = {
    [K: string]: IStyleSheet | string | null | undefined
};

export type IStyleSheetPropertyKey = `--${string}`

export type IStyleSheetDeclarations = Partial<IStyleDeclaration> | IStyleSheetCascade;

export interface IStyleSheet {
    declarations: IStyleSheetDeclarations;
    readonly options: IStyleOptions;

    get repository(): HTMLStyleElement | undefined;

    get rules(): string;

    get selector(): string;

    clear(): this;

    parse(declaration: IStyleSheetDeclarations | undefined, selector?: string): string | undefined;

    merge(declarations: IStyleSheetDeclarations | IStyleSheet | undefined): this

    sync(declarations?: IStyleSheetDeclarations): this;

    bind(widget: IWidgetNode<any, any>): this

    remove<K extends keyof IStyleSheetDeclarations>(key: K | K[]): this

    update<K extends keyof IStyleSheetDeclarations>(key: K, value: IStyleSheetDeclarations[K]): this

    associate(declarations: IStyleSheetDeclarations): this;

    associated(declarations: IStyleSheetDeclarations): IStyleSheet | undefined;

    unassociate(declarations: IStyleSheetDeclarations): this;
}


// export interface IStyle {
//     get fingerprint(): string | undefined;
//
//     get options(): IStyleOptions;
//
//     get declaration(): Partial<IStyleDeclaration>;
//
//     bind(widget: IWidgetNode<any, any>): Partial<IStyleDeclaration> | HTMLStyleElement | undefined;
//
//     upgrade(): this;
//
//     update(property: keyof IStyleDeclaration, value: IStyleSupportedValue): this;
//
//     merge(style: IStyle, enforce?: boolean): this;
//
//     remove(properties: (keyof IStyleDeclaration)[]): this;
//
//     clear(): this;
//
//     detach(): void;
// }
