import postcss from "postcss";
import * as postcssSc from 'postcss-scss';
export class CompilateCssVariables {
    configurer;
    _processor;
    _computed = new Set();
    _injectBefore = new Set();
    _injectAfter = new Set();
    get compilated() {
        return `/* WidgetUi Variables : injected before */\n${[...this._injectBefore.values()]
            .map(entry => entry)
            .join('\n')}\n/* WidgetUi Variables : utilities */\n\n${[...this._computed.values()]
            .map(entry => entry)
            .join('\n')}\n/* WidgetUi Variables : injected after */\n${[...this._injectAfter.values()]
            .map(entry => entry)
            .join('\n')}\n`;
    }
    constructor(configurer) {
        this.configurer = configurer;
    }
    get configs() {
        return this.configurer;
    }
    inject(selector, content, priority, layer) {
        selector = selector || ':root, :host';
        const compose = `${selector}{\n${content}\n}`;
        const placement = priority ? this._injectAfter : this._injectBefore;
        if (!layer)
            placement.add(compose);
        else if (layer)
            placement.add(`@layer ${layer}{\n${compose}\n}`);
        return this;
    }
    async parse(source, id) {
        this._processor = await postcss().process(source, { from: id, syntax: postcssSc });
        this.configurer.setVariables('core', this.parseVariables('core'));
        this.configurer.setVariables('base', this.parseVariables('base'));
        this.configurer.setVariables('components', this.parseVariables('components'));
        this.configurer.setVariables('utilities', this.parseVariables('utilities'));
        this.configurer.setVariables('theme', this.parseVariables('theme'));
        this.configurer.setVariables('layout', this.parseVariables('layout'));
        return this;
    }
    parseVariables(section) {
        const data = {};
        this._processor?.root.walkAtRules(section, atRule => {
            const slot = atRule.params.trim() || 'root';
            if (!data[slot])
                data[slot] = {};
            atRule.walkDecls(decl => {
                let value = decl.value;
                if (value.startsWith("'") && value.endsWith("'"))
                    value = value.slice(1, -1);
                data[slot][decl.prop] = value;
                decl.remove();
            });
        });
        return data;
    }
    providerCallable(provider, name, data) {
        return typeof data === 'string' ? data : data({ provider, name });
    }
    compilateVariables({ layer, provider, global, specific, callable }) {
        const computed = new Set();
        Object.entries(provider || {})
            .map(([name, p]) => {
            const globalSelector = this.providerCallable(p, name, global || '');
            const specificSelector = this.providerCallable(p, name, specific || '');
            const selector = String(name === 'root' ? globalSelector : specificSelector);
            const begin = name === 'root' ? '' : (globalSelector ? `${globalSelector}{` : '');
            const end = name === 'root' ? '' : (globalSelector ? '}' : '');
            const content = `${begin}\n${Object.entries(p)
                .map(([property, value]) => {
                return callable({ property, value: value });
            })
                .join('\n')}\n${end}`;
            computed.add(`${selector}{\n${content.trim()}\n}`);
        });
        if (computed.size > 0) {
            this._computed.add(`@layer ${layer} {\n${[...computed.values()].join('\n')}\n}`);
        }
        return this;
    }
    compilateThemeVariables() {
        this.compilateVariables({
            layer: 'theme',
            provider: this.configurer.variables.theme,
            global: ':root, :host',
            specific: ({ name }) => `@media (prefers-color-scheme: ${name})`,
            callable: ({ property, value }) => `${property}: ${value};`
        });
        return this;
    }
    compilateCoreVariables() {
        this.compilateVariables({
            layer: 'core',
            provider: this.configurer.variables.core,
            global: ':root, :host',
            specific: ':root, :host',
            callable: ({ property, value }) => `${property}: ${value};`
        });
        return this;
    }
    compilateKitVariables() {
        this.compilateVariables({
            layer: 'kit',
            provider: this.configurer.variables.kit,
            global: ':root, :host',
            specific: ':root, :host',
            callable: ({ property, value }) => `${property}: ${value};`
        });
        return this;
    }
    compilateBaseVariables() {
        this.compilateVariables({
            layer: 'base',
            provider: this.configurer.variables.base,
            global: ':root, :host',
            specific: ':root, :host',
            callable: ({ property, value }) => `${property}: ${value};`
        });
        return this;
    }
    compilateComponentsVariables() {
        this.compilateVariables({
            layer: 'components',
            provider: this.configurer.variables.components,
            global: ':root, :host',
            specific: ':root, :host',
            callable: ({ property, value }) => `${property}: ${value};`
        });
        return this;
    }
    compilateUtilitiesVariables() {
        this.compilateVariables({
            layer: 'utilities',
            provider: this.configurer.variables.utilities,
            global: ':root, :host',
            specific: ':root, :host',
            callable: ({ property, value }) => `${property}: ${value};`
        });
        return this;
    }
    compilateLayoutVariables() {
        this.compilateVariables({
            layer: 'layout',
            provider: this.configurer.variables.layout,
            global: ':root, :host',
            specific: ':root, :host',
            callable: ({ property, value }) => `${property}: ${value};`
        });
        return this;
    }
    initialize() {
        this._computed.clear();
        return this;
    }
    compilates() {
        return this
            .initialize()
            .compilateCoreVariables()
            .compilateThemeVariables()
            .compilateLayoutVariables()
            .compilateBaseVariables()
            .compilateKitVariables()
            .compilateComponentsVariables()
            .compilateUtilitiesVariables();
    }
}
