import { ICompilator, ICompilatorOptions, IComputedInjectionPayload, IComputedPayload, IConfigurator, IExcavator, IExtendedRule, IKeyframeRule, IMediaQueryRule, INestedRule, IPseudoClassRule, IRuleComputedValue, IRuleDeclaration, IRuleOrder, IRuleSyntheticValues, IRuleValue, ISupportsRule } from "../types/index.js";
import { ComputeType } from "../enums.js";
export declare class Compilate implements ICompilator {
    static instance: ICompilator | undefined;
    protected _excavates: Map<string, IExcavator>;
    protected _computed: Map<string, IComputedPayload>;
    protected _injectBefore: Set<string>;
    protected _injectAfter: Set<string>;
    protected _options: ICompilatorOptions;
    protected static _rulesOrders: Record<string, IRuleOrder>;
    get configs(): IConfigurator | undefined;
    get options(): ICompilatorOptions;
    get excavates(): IExcavator[];
    get artifacts(): string[];
    get compilated(): string;
    constructor(options?: ICompilatorOptions);
    protected initializeOptions(options: ICompilatorOptions): ICompilatorOptions;
    register(excavator: IExcavator): this;
    unregister(excavator: IExcavator): this;
    compute<T extends IRuleValue>(type: ComputeType, value: T): T;
    compilate<R extends IRuleSyntheticValues | IExtendedRule>(artifact: string): R | undefined;
    compilates(): this;
    parse(rules: IRuleSyntheticValues | IExtendedRule, selector?: string): string;
    update(): this;
    inject({ layer, selector, rules, priority }: IComputedInjectionPayload): this;
    static setRulePriority(alias: string, order: IRuleOrder): typeof this;
    static getRulePriority(alias: string): IRuleOrder | undefined;
    static rulePriorities(): Record<string, IRuleOrder>;
    static parseSelector(selector: string): string;
    static formatCalculateValue(value: string): string;
    static parseValue(value: string): IRuleComputedValue;
    static property(property: string): string;
    static value(value: any): string;
    static stringifier(selector: string, styles: Record<string, any>): string;
}
export declare class ExtendedRule implements IExtendedRule {
    protected _compilator: ICompilator | undefined;
    get compilator(): ICompilator | undefined;
    use(compilator: ICompilator): this;
    compilate(): string;
    toString(): string;
}
export declare class MediaQueryRule extends ExtendedRule implements IMediaQueryRule {
    readonly expression: string;
    readonly value: INestedRule;
    constructor(expression: string, value: INestedRule);
    compilate(): string;
}
export declare function mediaQuery(expression: string, value: INestedRule): IMediaQueryRule;
export declare class SupportsRule extends ExtendedRule implements ISupportsRule {
    readonly property: string;
    readonly style: INestedRule;
    readonly not?: boolean | undefined;
    constructor(property: string, style: INestedRule, not?: boolean | undefined);
}
export declare function supports(property: string, style: INestedRule, not?: boolean | undefined): ISupportsRule;
export declare class PseudoClassRule extends ExtendedRule implements IPseudoClassRule {
    readonly name: string;
    readonly style: IRuleDeclaration;
    constructor(name: string, style: IRuleDeclaration);
}
export declare function pseudoClass(name: string, style: IRuleDeclaration): IPseudoClassRule;
export declare class KeyframeRule extends ExtendedRule implements IKeyframeRule {
    readonly frames: Record<string | number, IRuleDeclaration>;
    constructor(frames: Record<string | number, IRuleDeclaration>);
}
export declare function keyframe(frames: Record<string | number, IRuleDeclaration>): IKeyframeRule;
export declare class NestedRule extends ExtendedRule implements INestedRule {
    readonly selector: string;
    readonly style: IRuleDeclaration;
    constructor(selector: string, style: IRuleDeclaration);
    compilate(): string;
}
export declare function nested(selector: string, style: IRuleDeclaration): INestedRule;
