import Result_ from "postcss/lib/result";
import Root_ from "postcss/lib/root";
import { IConfigurator, ICssApplierCompilator } from "../types/index.js";
export declare class CompilateCssApplier implements ICssApplierCompilator {
    readonly configurer: IConfigurator;
    protected _processor: Result_<Root_> | undefined;
    protected _computed: Set<string>;
    protected _injectBefore: Set<string>;
    protected _injectAfter: Set<string>;
    constructor(configurer: IConfigurator);
    get configs(): IConfigurator;
    get compilated(): string;
    initialize(): this;
    parse(source: string, id?: string): Promise<this>;
    compilates(): this;
}
