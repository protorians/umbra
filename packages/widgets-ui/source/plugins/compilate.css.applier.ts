import postcss from "postcss";
import * as postcssSc from 'postcss-scss';
import Result_ from "postcss/lib/result";
import Root_ from "postcss/lib/root";
import {IConfigurator, ICssApplierCompilator, IRuleValue} from "../types/index.js";
import {Compilate} from "./compilate.js";

export class CompilateCssApplier implements ICssApplierCompilator {

    protected _processor: Result_<Root_> | undefined;
    protected _computed: Set<string> = new Set();
    protected _injectBefore: Set<string> = new Set();
    protected _injectAfter: Set<string> = new Set();

    constructor(
        public readonly configurer: IConfigurator
    ) {
    }

    get configs(): IConfigurator {
        return this.configurer;
    }

    get compilated(): string {
        return `/* WidgetUi appliers : injected before */\n${
            [...this._injectBefore.values()]
                .map(entry => entry)
                .join('\n')
        }\n/* WidgetUi appliers  */\n${
            [...this._computed.values()]
                .map(entry => entry)
                .join('\n')
        }\n/* WidgetUi appliers : injected after */\n${
            [...this._injectAfter.values()]
                .map(entry => entry)
                .join('\n')
        }\n`
    }

    initialize(): this {
        this._computed.clear()
        return this;
    }

    async parse(source: string, id?: string): Promise<this> {
        this.initialize();

        this._processor = await postcss().process(source, {from: id, syntax: postcssSc});

        this._processor?.root.walkAtRules(atRule => {
            const computed: string[] = [];
            atRule.walkAtRules('apply', (applyRule) => {
                const name = atRule.params.trim();
                const _selector = Compilate.parseSelector(name);
                const sequence = applyRule.params.trim();
                //@ts-ignore
                let selector: string | undefined = applyRule.parent?.selector || undefined;
                let compilated: Record<string, IRuleValue> = {};

                selector = selector ? selector
                    .trim()
                    .replace(/&/gi, _selector) : _selector;
                // selector = (selector === '&' && name) ? '' : selector;
                // selector = `${_selector}${selector || ''}`;

                console.log(name, selector,)

                sequence.split(' ')
                    .forEach(entry => {
                        compilated = {
                            ...compilated,
                            ...Compilate.instance?.compilate(entry),
                        }
                    })

                computed.push(`${selector}{${Compilate.instance?.parse(compilated)}}`)
                applyRule.remove();
            });

            if (computed.length)
                this._computed.add(`@layer ${atRule.name}\n{\n${computed.join('\n')}\n}`);
        })

        return this;
    }

    compilates(): this {
        return this;
    }

}