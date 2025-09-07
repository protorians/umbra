import { ExcavatorType } from "./enums.js";
import { ICompilator, IExcavator } from "../types/index.js";
export declare class Excavator implements IExcavator {
    readonly code: string;
    readonly id?: string | undefined;
    static WIDGET_REGEX: RegExp;
    static HTML_REGEX: RegExp;
    static QUOTES_ONLY: RegExp;
    static RUNNER_EXTENSIONS: string[];
    protected _matches: RegExpExecArray[];
    protected _artifacts: string[];
    protected static _artifacts: string[];
    static set artifacts(artifacts: string[]);
    static get artifacts(): string[];
    get matches(): RegExpExecArray[];
    get artifacts(): string[];
    get extension(): string;
    get accepted(): boolean;
    get type(): ExcavatorType;
    constructor(code: string, id?: string | undefined);
    syntaxExtracting(code: string): RegExpExecArray[];
    parse(): this;
    make(compilator: ICompilator): this;
}
