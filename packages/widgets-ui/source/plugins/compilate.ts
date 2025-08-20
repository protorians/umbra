import {NumberUtility, ObjectUtility, TextUtility} from "@protorians/core";
import {
    ICompilator,
    ICompilatorOptions, IComputedInjectionPayload,
    IComputedPayload, IConfigurator,
    IExcavator,
    IExtendedRule,
    IKeyframeRule,
    IMediaQueryRule,
    INestedRule,
    IPseudoClassRule,
    IRuleComputedValue,
    IRuleDeclaration, IRuleOrder,
    IRuleSyntheticValues,
    IRuleValue,
    ISupportsRule
} from "../types/index.js";
import {ComputeType, RuleType} from "../enums.js";
import {Configurator} from "./configurator.js";
import {sortRules} from "./utilities.js";

export class Compilate implements ICompilator {
    static instance: ICompilator | undefined;

    protected _excavates: Map<string, IExcavator> = new Map();
    protected _computed: Map<string, IComputedPayload> = new Map();
    protected _injectBefore: Set<string> = new Set();
    protected _injectAfter: Set<string> = new Set();
    protected _options: ICompilatorOptions = {} as ICompilatorOptions;
    protected static _rulesOrders: Record<string, IRuleOrder> = {}


    get configs(): IConfigurator | undefined {
        return Configurator.instance;
    }

    get options(): ICompilatorOptions {
        return this._options;
    }

    get excavates(): IExcavator[] {
        return [...this._excavates.values()]
    }

    get artifacts(): string[] {
        const list = ObjectUtility.purge(
            ObjectUtility.unWrap<string>(
                [...this._excavates.values()].map(excavator => excavator.artifacts)
            )
        );
        const orders = sortRules(Compilate.rulePriorities());
        const filtered: string[] = [];

        for (const order of orders) {
            for (const artifact of list) {
                if (artifact.startsWith(`${order}:`)) {
                    filtered.push(artifact);
                }
            }
        }

        return filtered
    }

    get compilated(): string {
        return `/* WidgetUI : injected before */\n${
            [...this._injectBefore.values()]
                .map(entry => entry)
                .join('\n')
        }\n/* WidgetUI : utilities */\n@layer utilities{\n${
            [...this._computed.values()]
                .map(entry => entry.compilated)
                .join('\n')
        }\n}\n/* WidgetUI : injected after */\n${
            [...this._injectAfter.values()]
                .map(entry => entry)
                .join('\n')
        }\n`
    }

    constructor(
        options: ICompilatorOptions = {} as ICompilatorOptions,
    ) {
        this._options = this.initializeOptions(options);
        Compilate.instance = this;
    }

    protected initializeOptions(options: ICompilatorOptions) {
        options.config = options.config || {};
        options.config.scaler = options.config.scaler || 4;
        return options;
    }

    register(excavator: IExcavator): this {
        if (excavator.id) this._excavates.set(excavator.id, excavator);
        return this.update();
    }

    unregister(excavator: IExcavator): this {
        if (excavator.id) this._excavates.delete(excavator.id);
        return this.update();
    }

    compute<T extends IRuleValue>(type: ComputeType, value: T): T {
        if (type === ComputeType.Spacing)
            return (((!value) ? 0 : (NumberUtility.extract(value)[0] || 0) * this.options.config!.scaler!) as T) || value;

        return value;
    }

    compilate<R extends IRuleSyntheticValues | IExtendedRule>(artifact: string): R | undefined {
        if (!this._options.rules) return undefined;

        const exist = this._computed.get(artifact)
        if (exist) return exist.rule as R;

        const sequences = artifact.split(/:/);
        const _value = sequences.pop();

        if (sequences.length < 1 || typeof _value === 'undefined') return undefined;

        const index: string = sequences[0];

        if (typeof this._options.rules[index] === 'undefined') return undefined;

        const parse = Compilate.parseValue(_value);
        const selector = Compilate.parseSelector(artifact);

        const rule = this._options.rules[index]({
            compilator: this,
            value: parse.value,
            selector,
            type: parse.synthetic
                ? RuleType.Synthetic
                : (
                    parse.customize
                        ? RuleType.Customize
                        : RuleType.Natural
                ),
            composed: sequences.length > 1,
            args: ObjectUtility.refactor<string>(sequences, 1),
        }) as R;

        this._computed.set(artifact, {
            compilated: this.parse(rule, selector),
            rule: rule,
        });

        return rule;
    }

    compilates(): this {
        if (this._options.rules)
            for (const artifact of this.artifacts)
                this.compilate(artifact);
        return this;
    }

    parse(rules: IRuleSyntheticValues | IExtendedRule, selector?: string): string {

        if (rules instanceof ExtendedRule) return rules.use(this).compilate();

        let parsed: string[] = [];
        let grouped: boolean = false;
        for (const [index, rule] of Object.entries(rules)) {
            if (rule instanceof ExtendedRule) {
                parsed.push(rule.use(this).compilate());
            } else if (typeof rule === 'object') {
                parsed.push(Compilate.stringifier(index, rule))
            } else {
                grouped = true;
                parsed.push(`${Compilate.property(index)}:${Compilate.value(rule)}`);
            }
        }

        const merge = parsed.join(';')
        return (grouped && selector)
            ? `${selector}{${merge}}`
            : merge;
    }

    update(): this {
        return this.compilates();
    }

    inject({layer, selector, rules, priority}: IComputedInjectionPayload): this {
        selector = selector || ':root, :host';
        const parsed = this.parse(rules)
        const compose = `${selector}{\n${parsed}\n}`
        const placement = priority ? this._injectAfter : this._injectBefore;

        if (!layer) placement.add(compose);

        else if (layer)
            placement.add(`@layer ${layer}{\n${compose}\n}`);

        return this;
    }

    static setRulePriority(alias: string, order: IRuleOrder): typeof this {
        this._rulesOrders[alias] = order;
        return this;
    }

    static getRulePriority(alias: string): IRuleOrder | undefined {
        return this._rulesOrders[alias] || undefined;
    }

    static rulePriorities() {
        return this._rulesOrders;
    }

    static parseSelector(selector: string) {
        return `.${selector}`
            .replace(/:/gi, '\\:')
            .replace(/\(/g, '\\(')
            .replace(/\)/g, '\\)')
            .replace(/\[/g, '\\[')
            .replace(/\]/g, '\\]')
    }

    static formatCalculateValue(value: string): string {
        return value.replace(/([^a-zA-Z0-9\s])/g, ' $1 ')
    }

    static parseValue(value: string): IRuleComputedValue {
        const synthetic = value.match(/\[(.*)\]/);
        const customize = value.match(/\((.*)\)/);
        const calculate = value.match(/calc\((.*)\)/);

        value = synthetic ? synthetic[1] : value;
        value = customize ? `var(${customize[1]})` : value;
        value = calculate ? `calc(${this.formatCalculateValue(calculate[1])})` : value;

        return {
            value,
            synthetic,
            customize,
            calculate
        };
    }

    static property(property: string): string {
        return TextUtility.unCamelCase(property);
    }

    static value(value: any): string {
        return String(value);
    }

    static stringifier(selector: string, styles: Record<string, any>): string {
        const out: string[] = [];

        for (const [key, value] of Object.entries(styles))
            out.push(`${Compilate.property(key)}: ${Compilate.value(value)}`);

        return `${selector} {${out.join(';')}}`;
    }

}


export class ExtendedRule implements IExtendedRule {

    protected _compilator: ICompilator | undefined;

    get compilator(): ICompilator | undefined {
        return this._compilator;
    }

    use(compilator: ICompilator): this {
        this._compilator = compilator;
        return this;
    }

    compilate(): string {
        console.error('Not implemented');
        return '';
    }

    toString(): string {
        return '';
    }
}

export class MediaQueryRule extends ExtendedRule implements IMediaQueryRule {
    constructor(
        readonly expression: string,
        readonly value: INestedRule,
    ) {
        super();
    }

    compilate(): string {
        return `@media ${this.expression} {${this.value.compilate()}}`
    }
}

export function mediaQuery(
    expression: string,
    value: INestedRule,
): IMediaQueryRule {
    return new MediaQueryRule(expression, value);
}

export class SupportsRule extends ExtendedRule implements ISupportsRule {
    constructor(
        readonly property: string,
        readonly style: INestedRule,
        readonly not?: boolean | undefined,
    ) {
        super();
    }
}

export function supports(property: string, style: INestedRule, not?: boolean | undefined,): ISupportsRule {
    return new SupportsRule(property, style, not);
}

export class PseudoClassRule extends ExtendedRule implements IPseudoClassRule {
    constructor(
        readonly name: string,
        readonly style: IRuleDeclaration,
    ) {
        super();
    }
}

export function pseudoClass(name: string, style: IRuleDeclaration,): IPseudoClassRule {
    return new PseudoClassRule(name, style);
}

export class KeyframeRule extends ExtendedRule implements IKeyframeRule {
    constructor(
        readonly frames: Record<string | number, IRuleDeclaration>,
    ) {
        super();
    }
}

export function keyframe(frames: Record<string | number, IRuleDeclaration>,): IKeyframeRule {
    return new KeyframeRule(frames);
}

export class NestedRule extends ExtendedRule implements INestedRule {
    constructor(
        readonly selector: string,
        readonly style: IRuleDeclaration,
    ) {
        super();
    }

    compilate(): string {
        return Compilate.stringifier(this.selector, this.style);
    }
}

export function nested(selector: string, style: IRuleDeclaration,): INestedRule {
    return new NestedRule(selector, style);
}
