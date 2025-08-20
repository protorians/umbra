import {ComputeType, RuleType} from "../enums.js";
import {ExcavatorType} from "../plugins/enums.js";
import Result_ from "postcss/lib/result";
import Root_ from "postcss/lib/root";

export type IRuleValue = string | number | undefined;

export interface IRuleActionable {
    callable: IRuleCallable;
}

export type IRuleOrder = number | `before:${string}` | `after:${string}`;

export interface IRuleOptions extends IRuleActionable {
    alias: string;
    order?: IRuleOrder;
    // matching?: RuleMatching;
    // evaluate?: string;
}

export interface IRuleValuable {
    value: IRuleValue;
    compilator: ICompilator;
}


export interface IExtendedRule {
    get compilator(): ICompilator | undefined;

    use(compilator: ICompilator): this;

    compilate(): string;

    toString(): string;
}

export interface IMediaQueryRule extends IExtendedRule {
    readonly expression: string;
    readonly value: INestedRule;
}

export interface ISupportsRule extends IExtendedRule {
    readonly property: string;
    readonly not?: boolean;
    readonly style: INestedRule;
}

export interface IPseudoClassRule extends IExtendedRule {
    readonly name: string;
    readonly style: IRuleDeclaration;
}

export interface IKeyframeRule extends IExtendedRule {
    readonly frames: Record<string | number, IRuleDeclaration>
}

export interface INestedRule extends IExtendedRule {
    readonly selector: string;
    readonly style: IRuleDeclaration;
}

export interface IRuleMetadata extends IRuleValuable {
    '@media'?: IMediaQueryRule;
    '@keyframe'?: IKeyframeRule;
    '@layer'?: INestedRule;
    '@supports'?: ISupportsRule;
    '@pseudo'?: IPseudoClassRule;
    '@theme'?: INestedRule;
}


export interface IRuleColorSet {
    value: string;
    default?: string;
    light?: string;
    dark?: string;
}

export interface IRulePayload extends IRuleValuable {
    selector: string;
    type: RuleType;
    args: string[];
    composed: boolean;
}

export type IRuleDeclaration = {
    [K in keyof CSSStyleDeclaration]?: IRuleValue;
}

export type IRuleSyntheticValues = IRuleDeclaration | IRuleMetadata;

export type IRuleCallable = (payload: IRulePayload) => IRuleSyntheticValues | IExtendedRule | undefined;

export type IRuleCallablesMap = Map<string, IRuleCallable>;

export type IRuleCallables = Record<string, IRuleCallable>;

export type IRuleComputedValue = {
    value: string;
    synthetic: RegExpMatchArray | null;
    customize: RegExpMatchArray | null;
    calculate: RegExpMatchArray | null;
}


export interface IExcavator {
    readonly id?: string;
    readonly code: string;

    get matches(): RegExpExecArray[];

    get artifacts(): string[];

    get extension(): string;

    get accepted(): boolean;

    get type(): ExcavatorType;

    parse(): this;

    make(compilator: ICompilator): this;
}

export interface ICompilatorOptions {
    rules?: IRuleCallables;
    config?: ICompilatorConfig;
}

export interface ICompilatorConfig {
    scaler?: number;
    spacing?: number;
}

export interface ICompilator {
    get configs(): IConfigurator | undefined;

    get options(): ICompilatorOptions

    get excavates(): IExcavator[];

    get artifacts(): string[];

    get compilated(): string;

    register(excavator: IExcavator): this;

    unregister(excavator: IExcavator): this;

    compute<T extends NonNullable<IRuleValue>>(type: ComputeType, value: T): T;

    compilate<R extends IRuleSyntheticValues | IExtendedRule>(artifact: string): R | undefined;

    compilates(): this;

    update(): this;

    inject(payload: IComputedInjectionPayload): this;

    parse(rules: IRuleSyntheticValues | IExtendedRule, selector?: string): string;
}

export interface ICssVariablesCompilator {
    get configs(): IConfigurator | undefined;

    get compilated(): string;

    inject(selector: string, content: string, priority?: boolean, layer?: IConfiguratorVariablesKeys,): this

    parse(source: string, id?: string): Promise<this>;

    parseVariables(section: string): IConfiguratorVariablesData;

    initialize(): this;

    compilates(): this;
}

export interface ICssApplierCompilator {
    get configs(): IConfigurator | undefined;

    get compilated(): string;

    // inject(selector: string, content: string, priority?: boolean, layer?: IConfiguratorVariablesKeys,): this

    parse(source: string, id?: string): Promise<this>;

    // parseVariables(section: string): IConfiguratorVariablesData;

    initialize(): this;

    compilates(): this;
}

export interface IComputedInjectionPayload {
    layer?: IConfiguratorVariablesKeys;
    selector?: string;
    rules: IRuleDeclaration | IExtendedRule;
    priority?: boolean;
}

export interface IComputedPayload {
    compilated: string;
    rule: IRuleSyntheticValues | IExtendedRule
}


export interface ICompilatorDirectories {
    root: string;
    cache: string;
    public: string;
    build: string;
    assets: string;
}


export type IConfiguratorVariablesKeys = 'core' | 'base' | 'kit' | 'components' | 'utilities' | 'theme' | 'layout';

export type IConfiguratorVariablesData = Record<string, Record<string, string>>;

export type IConfiguratorVariables = {
    [key in IConfiguratorVariablesKeys]: IConfiguratorVariablesData;
}

export interface IConfigurator {

    get processor(): Result_<Root_> | undefined;

    // get computed(): Set<string>;

    get variables(): IConfiguratorVariables;

    // get source(): string;

    // get compilated(): string;

    setVariables(key: IConfiguratorVariablesKeys, value: IConfiguratorVariablesData): this;

    removeVariables(key: IConfiguratorVariablesKeys): this;

    unwrapVariables(): Record<string, string>;

    findVariables(index: string): IConfiguratorVariablePayload[];

    getVariable(layer: string, section: string, key: string): string | undefined;

    getColor(layer: string, section: string, key: string): string | undefined;

    initialize(): this;

    // parseVariables(section: string): IConfiguratorVariablesData;
    //
    // parse(source: string, id?: string): Promise<void>;

    // compilates(): this;
}


export interface IConfiguratorVariablePayload {
    layer: IConfiguratorVariablesKeys;
    section: string;
    value: string;
}

export type ICompilateProviderCallable<T extends Record<string, any>> = (payload: ICompilateProviderPayload<T>) => string
export type ICompilateCallable = (payload: ICompilatePayload) => string

export interface ICompilatePayload {
    property: string;
    value: string;
}

export interface ICompilateProviderPayload<T extends Record<string, any>> {
    provider: T;
    name: string;
}

export interface IConfiguratorCompilateOptions<T extends Record<string, any>> {
    layer: string;
    global?: string | ICompilateProviderCallable<T>;
    specific: string | ICompilateProviderCallable<T>;
    provider: T;
    callable: ICompilateCallable;
}


export interface ISynchronizable {
    get compilated(): string;

    compilates(): this;
}
