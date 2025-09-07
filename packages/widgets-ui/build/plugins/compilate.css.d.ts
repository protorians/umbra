import { IConfigurator, ICssApplierCompilator, ICssVariablesCompilator, ISynchronizable } from "../types/index.js";
export declare class CompilateCss implements ISynchronizable {
    readonly configurer: IConfigurator;
    protected _id: string | undefined;
    protected _source: string | undefined;
    protected _computed: Set<string>;
    protected _variables: ICssVariablesCompilator;
    protected _applier: ICssApplierCompilator;
    constructor(configurer: IConfigurator);
    get id(): string | undefined;
    get source(): string | undefined;
    get compilated(): string;
    parse(source: string, id?: string): Promise<this>;
    compilates(): this;
}
