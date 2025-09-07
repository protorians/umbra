import { NumberUtility, ObjectUtility, TextUtility } from "@protorians/core";
import { ComputeType, RuleType } from "../enums.js";
import { Configurator } from "./configurator.js";
import { sortRules } from "./utilities.js";
export class Compilate {
    static instance;
    _excavates = new Map();
    _computed = new Map();
    _injectBefore = new Set();
    _injectAfter = new Set();
    _options = {};
    static _rulesOrders = {};
    get configs() {
        return Configurator.instance;
    }
    get options() {
        return this._options;
    }
    get excavates() {
        return [...this._excavates.values()];
    }
    get artifacts() {
        const list = ObjectUtility.purge(ObjectUtility.unWrap([...this._excavates.values()].map(excavator => excavator.artifacts)));
        const orders = sortRules(Compilate.rulePriorities());
        const filtered = [];
        for (const order of orders) {
            for (const artifact of list) {
                if (artifact.startsWith(`${order}:`)) {
                    filtered.push(artifact);
                }
            }
        }
        return filtered;
    }
    get compilated() {
        return `/* WidgetUI : injected before */\n${[...this._injectBefore.values()]
            .map(entry => entry)
            .join('\n')}\n/* WidgetUI : utilities */\n@layer utilities{\n${[...this._computed.values()]
            .map(entry => entry.compilated)
            .join('\n')}\n}\n/* WidgetUI : injected after */\n${[...this._injectAfter.values()]
            .map(entry => entry)
            .join('\n')}\n`;
    }
    constructor(options = {}) {
        this._options = this.initializeOptions(options);
        Compilate.instance = this;
    }
    initializeOptions(options) {
        options.config = options.config || {};
        options.config.scaler = options.config.scaler || 4;
        return options;
    }
    register(excavator) {
        if (excavator.id)
            this._excavates.set(excavator.id, excavator);
        return this.update();
    }
    unregister(excavator) {
        if (excavator.id)
            this._excavates.delete(excavator.id);
        return this.update();
    }
    compute(type, value) {
        if (type === ComputeType.Spacing)
            return ((!value) ? 0 : (NumberUtility.extract(value)[0] || 0) * this.options.config.scaler) || value;
        return value;
    }
    compilate(artifact) {
        if (!this._options.rules)
            return undefined;
        const exist = this._computed.get(artifact);
        if (exist)
            return exist.rule;
        const sequences = artifact.split(/:/);
        const _value = sequences.pop();
        if (sequences.length < 1 || typeof _value === 'undefined')
            return undefined;
        const index = sequences[0];
        if (typeof this._options.rules[index] === 'undefined')
            return undefined;
        const parse = Compilate.parseValue(_value);
        const selector = Compilate.parseSelector(artifact);
        const rule = this._options.rules[index]({
            compilator: this,
            value: parse.value,
            selector,
            type: parse.synthetic
                ? RuleType.Synthetic
                : (parse.customize
                    ? RuleType.Customize
                    : RuleType.Natural),
            composed: sequences.length > 1,
            args: ObjectUtility.refactor(sequences, 1),
        });
        this._computed.set(artifact, {
            compilated: this.parse(rule, selector),
            rule: rule,
        });
        return rule;
    }
    compilates() {
        if (this._options.rules)
            for (const artifact of this.artifacts)
                this.compilate(artifact);
        return this;
    }
    parse(rules, selector) {
        if (rules instanceof ExtendedRule)
            return rules.use(this).compilate();
        let parsed = [];
        let grouped = false;
        for (const [index, rule] of Object.entries(rules)) {
            if (rule instanceof ExtendedRule) {
                parsed.push(rule.use(this).compilate());
            }
            else if (typeof rule === 'object') {
                parsed.push(Compilate.stringifier(index, rule));
            }
            else {
                grouped = true;
                parsed.push(`${Compilate.property(index)}:${Compilate.value(rule)}`);
            }
        }
        const merge = parsed.join(';');
        return (grouped && selector)
            ? `${selector}{${merge}}`
            : merge;
    }
    update() {
        return this.compilates();
    }
    inject({ layer, selector, rules, priority }) {
        selector = selector || ':root, :host';
        const parsed = this.parse(rules);
        const compose = `${selector}{\n${parsed}\n}`;
        const placement = priority ? this._injectAfter : this._injectBefore;
        if (!layer)
            placement.add(compose);
        else if (layer)
            placement.add(`@layer ${layer}{\n${compose}\n}`);
        return this;
    }
    static setRulePriority(alias, order) {
        this._rulesOrders[alias] = order;
        return this;
    }
    static getRulePriority(alias) {
        return this._rulesOrders[alias] || undefined;
    }
    static rulePriorities() {
        return this._rulesOrders;
    }
    static parseSelector(selector) {
        return `.${selector}`
            .replace(/:/gi, '\\:')
            .replace(/\(/g, '\\(')
            .replace(/\)/g, '\\)')
            .replace(/\[/g, '\\[')
            .replace(/\]/g, '\\]');
    }
    static formatCalculateValue(value) {
        return value.replace(/([^a-zA-Z0-9\s])/g, ' $1 ');
    }
    static parseValue(value) {
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
    static property(property) {
        return TextUtility.unCamelCase(property);
    }
    static value(value) {
        return String(value);
    }
    static stringifier(selector, styles) {
        const out = [];
        for (const [key, value] of Object.entries(styles))
            out.push(`${Compilate.property(key)}: ${Compilate.value(value)}`);
        return `${selector} {${out.join(';')}}`;
    }
}
export class ExtendedRule {
    _compilator;
    get compilator() {
        return this._compilator;
    }
    use(compilator) {
        this._compilator = compilator;
        return this;
    }
    compilate() {
        console.error('Not implemented');
        return '';
    }
    toString() {
        return '';
    }
}
export class MediaQueryRule extends ExtendedRule {
    expression;
    value;
    constructor(expression, value) {
        super();
        this.expression = expression;
        this.value = value;
    }
    compilate() {
        return `@media ${this.expression} {${this.value.compilate()}}`;
    }
}
export function mediaQuery(expression, value) {
    return new MediaQueryRule(expression, value);
}
export class SupportsRule extends ExtendedRule {
    property;
    style;
    not;
    constructor(property, style, not) {
        super();
        this.property = property;
        this.style = style;
        this.not = not;
    }
}
export function supports(property, style, not) {
    return new SupportsRule(property, style, not);
}
export class PseudoClassRule extends ExtendedRule {
    name;
    style;
    constructor(name, style) {
        super();
        this.name = name;
        this.style = style;
    }
}
export function pseudoClass(name, style) {
    return new PseudoClassRule(name, style);
}
export class KeyframeRule extends ExtendedRule {
    frames;
    constructor(frames) {
        super();
        this.frames = frames;
    }
}
export function keyframe(frames) {
    return new KeyframeRule(frames);
}
export class NestedRule extends ExtendedRule {
    selector;
    style;
    constructor(selector, style) {
        super();
        this.selector = selector;
        this.style = style;
    }
    compilate() {
        return Compilate.stringifier(this.selector, this.style);
    }
}
export function nested(selector, style) {
    return new NestedRule(selector, style);
}
