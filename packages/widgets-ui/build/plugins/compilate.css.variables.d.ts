import { IConfiguratorVariablesData, IConfiguratorCompilateOptions, ICompilateProviderCallable, IConfigurator, ICssVariablesCompilator, IConfiguratorVariablesKeys } from "../types/index.js";
import Result_ from "postcss/lib/result";
import Root_ from "postcss/lib/root";
export declare class CompilateCssVariables implements ICssVariablesCompilator {
    readonly configurer: IConfigurator;
    protected _processor: Result_<Root_> | undefined;
    protected _computed: Set<string>;
    protected _injectBefore: Set<string>;
    protected _injectAfter: Set<string>;
    get compilated(): string;
    constructor(configurer: IConfigurator);
    get configs(): IConfigurator;
    inject(selector: string, content: string, priority?: boolean, layer?: IConfiguratorVariablesKeys): this;
    parse(source: string, id?: string): Promise<this>;
    parseVariables(section: string): IConfiguratorVariablesData;
    protected providerCallable<T extends Record<string, any>>(provider: T, name: string, data: string | ICompilateProviderCallable<T>): string;
    protected compilateVariables<T extends Record<string, any>>({ layer, provider, global, specific, callable }: IConfiguratorCompilateOptions<T>): this;
    protected compilateThemeVariables(): this;
    protected compilateCoreVariables(): this;
    protected compilateKitVariables(): this;
    protected compilateBaseVariables(): this;
    protected compilateComponentsVariables(): this;
    protected compilateUtilitiesVariables(): this;
    protected compilateLayoutVariables(): this;
    initialize(): this;
    compilates(): this;
}
