import { ISchemeCharLength, ISchemeChild, ISchemeChildren, ISchemeError, ISchemeProps, ISchemeScore, ISchemeType, ISchematic } from "../types/index.js";
export declare class SchemeChild implements ISchemeChild {
    protected _structure: ISchemeProps;
    protected _score: ISchemeScore;
    protected _total: ISchemeScore;
    protected _errors: ISchemeError[];
    constructor();
    protected upScore(): this;
    protected downScore(): this;
    get structure(): ISchemeProps;
    get errors(): ISchemeError[];
    get getFirstError(): ISchemeError | undefined;
    get getLastError(): ISchemeError | undefined;
    get score(): ISchemeScore;
    get total(): ISchemeScore;
    get isValid(): boolean;
    condition(condition: boolean): boolean;
    type(value: ISchemeType): this;
    required(value: boolean): this;
    children(value: ISchemeChildren): this;
    min(value: ISchemeCharLength): this;
    max(value: ISchemeCharLength): this;
    match(value: RegExp): this;
    validate(input: any): boolean;
}
export declare class Scheme implements ISchematic {
    readonly scheme: ISchemeChild;
    constructor(scheme: ISchemeChild);
    validate(data: any): boolean;
}
