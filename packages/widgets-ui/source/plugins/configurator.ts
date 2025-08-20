import {
    IConfigurator,
    IConfiguratorVariables,
    IConfiguratorVariablePayload, IConfiguratorVariablesKeys, IConfiguratorVariablesData
} from "../types/index.js";
import Result_ from "postcss/lib/result";
import Root_ from "postcss/lib/root";

export class Configurator implements IConfigurator {
    static instance: IConfigurator | undefined;

    protected _processor: Result_<Root_> | undefined;
    protected _variables: IConfiguratorVariables = {} as IConfiguratorVariables;
    // protected _computed: Set<string> = new Set();

    get processor(): Result_<Root_> | undefined {
        return this._processor;
    }
    //
    // get computed(): Set<string> {
    //     return this._computed;
    // }

    get variables(): IConfiguratorVariables {
        return this._variables;
    }

    // get source(): string {
    //     return this._processor?.root.toString() || '';
    // }

    // get compilated(): string {
    //     return `/* WidgetUI : configuration */\n${
    //         [...this._computed.values()]
    //             // .map(([key, value]) => `${key}{\n${value}\n}`)
    //             .join('\n')
    //     }\n`;
    // }

    constructor() {
        Configurator.instance = this;
    }

    setVariables(section: IConfiguratorVariablesKeys, value: IConfiguratorVariablesData): this {
        this._variables[section] = {...(this._variables[section] || {}), ...value};
        return this;
    }

    removeVariables(section: IConfiguratorVariablesKeys): this {
        const variables = {} as IConfiguratorVariables
        for (const [layer, sections] of Object.entries(this._variables)) {
            if (layer != section) variables[layer] = sections;
        }
        this._variables = variables;
        return this;
    }

    unwrapVariables(): Record<string, string> {
        const output: Record<string, any> = {}

        for (const [layer, sections] of Object.entries(this._variables)) {
            for (const [name, section] of Object.entries(sections)) {
                for (const [key, value] of Object.entries(section)) {
                    output[`${layer}:${name.substring(2)}:${key}`] = value;
                }
            }
        }

        return output;
    }

    findVariables(index: string): IConfiguratorVariablePayload[] {
        const output: IConfiguratorVariablePayload[] = []

        for (const [layer, sections] of Object.entries(this._variables)) {
            for (const [name, section] of Object.entries(sections)) {
                for (const [key, value] of Object.entries(section)) {
                    if (key == index) output.push({
                        layer: layer as IConfiguratorVariablesKeys,
                        section: name,
                        value,
                    })
                }
            }
        }

        return output;
    }

    getVariable(layer: string, section: string, key: string): string | undefined {
        return this.unwrapVariables()[`${layer}:${section}:${key}`] || undefined;
    }

    getColor(layer: string, section: string, key: string): string | undefined {
        return this.getVariable(layer, section, `--color-${key}`) || undefined;
    }

    initialize(): this {
        this._variables = {} as IConfiguratorVariables;
        return this;
    }

    //
    // async parse(source: string, id?: string): Promise<void> {
    //     this._processor = await postcss().process(source, {from: id, syntax: postcssSc});
    //     this._variables.core = {...this._variables.core, ...this.parseVariables('core')};
    //     this._variables.base = {...this._variables.base, ...this.parseVariables('base')};
    //     this._variables.components = {...this._variables.components, ...this.parseVariables('components')};
    //     this._variables.utilities = {...this._variables.utilities, ...this.parseVariables('utilities')};
    //     this._variables.theme = {...this._variables.theme, ...this.parseVariables('theme')};
    //     this._variables.layout = {...this._variables.layout, ...this.parseVariables('layout')};
    // }
    //
    // parseVariables(section: string): IConfiguratorVariablesData {
    //     const data: IConfiguratorVariablesData = {};
    //
    //     this._processor?.root.walkAtRules(section, atRule => {
    //         const slot = atRule.params.trim() || 'root';
    //
    //         if (!data[slot]) data[slot] = {};
    //
    //         atRule.walkDecls(decl => {
    //             let value = decl.value;
    //
    //             if (value.startsWith("'") && value.endsWith("'"))
    //                 value = value.slice(1, -1);
    //
    //             data[slot][decl.prop] = value;
    //             decl.remove();
    //         });
    //     });
    //
    //     return data;
    // }
    //
    // protected providerCallable<T extends Record<string, any>>(
    //     provider: T,
    //     name: string,
    //     data: string | ICompilateProviderCallable<T>,
    // ): string {
    //     return typeof data === 'string' ? data : data({provider, name});
    // }
    //
    // protected compilateVariables<T extends Record<string, any>>(
    //     {
    //         layer,
    //         provider,
    //         global,
    //         specific,
    //         callable
    //     }: IConfiguratorCompilateOptions<T>
    // ): this {
    //     const computed: Set<string> = new Set();
    //
    //     Object.entries(provider)
    //         .map(([name, p]) => {
    //             const globalSelector = this.providerCallable<T>(p, name, global || '');
    //             const specificSelector = this.providerCallable<T>(p, name, specific || '');
    //             const selector = String(name === 'root' ? globalSelector : specificSelector);
    //             const begin = name === 'root' ? '' : (globalSelector ? `${globalSelector}{` : '');
    //             const end = name === 'root' ? '' : (globalSelector ? '}' : '');
    //             const content = `${begin}\n${
    //                 Object.entries(p)
    //                     .map(([property, value]) => {
    //                         return callable({property, value: value as any});
    //                     })
    //                     .join('\n')
    //             }\n${end}`;
    //
    //             computed.add(`${selector}{\n${content.trim()}\n}`);
    //         });
    //
    //     this._computed.add(`@layer ${layer} {\n${
    //         [...computed.values()].join('\n')
    //     }\n}`);
    //
    //     return this;
    // }
    //
    // protected compilateThemeVariables(): this {
    //     this.compilateVariables({
    //         layer: 'theme',
    //         provider: this._variables.theme,
    //         global: ':root, :host',
    //         specific: ({name}) => `@media (prefers-color-scheme: ${name})`,
    //         callable: ({property, value}) => `${property}: ${value};`
    //     })
    //     return this;
    // }
    //
    // protected compilateCoreVariables(): this {
    //     this.compilateVariables({
    //         layer: 'core',
    //         provider: this._variables.core,
    //         global: ':root, :host',
    //         specific: ':root, :host',
    //         callable: ({property, value}) => `${property}: ${value};`
    //     })
    //     return this;
    // }
    //
    // protected compilateKitVariables(): this {
    //     this.compilateVariables({
    //         layer: 'kit',
    //         provider: this._variables.kit,
    //         global: ':root, :host',
    //         specific: ':root, :host',
    //         callable: ({property, value}) => `${property}: ${value};`
    //     })
    //     return this;
    // }
    //
    // protected compilateBaseVariables(): this {
    //     this.compilateVariables({
    //         layer: 'base',
    //         provider: this._variables.base,
    //         global: ':root, :host',
    //         specific: ':root, :host',
    //         callable: ({property, value}) => `${property}: ${value};`
    //     })
    //     return this;
    // }
    //
    // protected compilateComponentsVariables(): this {
    //     this.compilateVariables({
    //         layer: 'components',
    //         provider: this._variables.components,
    //         global: ':root, :host',
    //         specific: ':root, :host',
    //         callable: ({property, value}) => `${property}: ${value};`
    //     })
    //     return this;
    // }
    //
    // protected compilateUtilitiesVariables(): this {
    //     this.compilateVariables({
    //         layer: 'utilities',
    //         provider: this._variables.utilities,
    //         global: ':root, :host',
    //         specific: ':root, :host',
    //         callable: ({property, value}) => `${property}: ${value};`
    //     })
    //     return this;
    // }
    //
    // protected compilateLayoutVariables(): this {
    //     this.compilateVariables({
    //         layer: 'layout',
    //         provider: this._variables.layout,
    //         global: ':root, :host',
    //         specific: ':root, :host',
    //         callable: ({property, value}) => `${property}: ${value};`
    //     })
    //     return this;
    // }

    // compilates(): this {
    //     return this
    //         .initialize()
    //     // .compilateCoreVariables()
    //     // .compilateThemeVariables()
    //     // .compilateLayoutVariables()
    //     // .compilateBaseVariables()
    //     // .compilateKitVariables()
    //     // .compilateComponentsVariables()
    //     // .compilateUtilitiesVariables();
    // }

}