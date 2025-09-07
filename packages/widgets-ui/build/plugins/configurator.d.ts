import { IConfigurator, IConfiguratorVariables, IConfiguratorVariablePayload, IConfiguratorVariablesKeys, IConfiguratorVariablesData } from "../types/index.js";
import Result_ from "postcss/lib/result";
import Root_ from "postcss/lib/root";
export declare class Configurator implements IConfigurator {
    static instance: IConfigurator | undefined;
    protected _processor: Result_<Root_> | undefined;
    protected _variables: IConfiguratorVariables;
    get processor(): Result_<Root_> | undefined;
    get variables(): IConfiguratorVariables;
    constructor();
    setVariables(section: IConfiguratorVariablesKeys, value: IConfiguratorVariablesData): this;
    removeVariables(section: IConfiguratorVariablesKeys): this;
    unwrapVariables(): Record<string, string>;
    findVariables(index: string): IConfiguratorVariablePayload[];
    getVariable(layer: string, section: string, key: string): string | undefined;
    getColor(layer: string, section: string, key: string): string | undefined;
    initialize(): this;
}
