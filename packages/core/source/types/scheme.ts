export type ISchemeChildren = ISchemeChild[]

export type ISchemeTypeMap = {
    "match": RegExp,
    "string": string,
    "number": number,
    "bigint": bigint,
    "boolean": boolean,
    "object": object,
    "symbol": symbol,
    "function": Function,
    "null": null,
    "undefined": undefined,
};

export type ISchemeType = ISchemeTypeMap[keyof ISchemeTypeMap];

export type ISchemeRequired = boolean;

export type ISchemeScore = number;

export type ISchemeCharLength = number;

export interface ISchemeProps {
    type: ISchemeType;
    required?: ISchemeRequired;
    score?: ISchemeScore;
    children?: ISchemeChildren;
    min?: ISchemeCharLength;
    max?: ISchemeCharLength;
    match?: RegExp;
}

export type ISchemeError = {
    type: keyof ISchemeProps;
    message: string;
}


export interface ISchematic {
    validate(input: any): boolean;
}

export interface ISchemeChild extends ISchematic {
    get structure(): ISchemeProps;

    get errors(): ISchemeError[];

    get getFirstError(): ISchemeError | undefined;

    get getLastError(): ISchemeError | undefined;

    get score(): ISchemeScore;

    get total(): ISchemeScore;

    get isValid(): boolean;

    type(value: ISchemeType): this;

    required(value: boolean): this;

    children(value: ISchemeChildren): this;

    min(value: ISchemeCharLength): this;

    max(value: ISchemeCharLength): this;

    match(value: RegExp): this;
}

