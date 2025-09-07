import postcss from "postcss";
import * as postcssSc from 'postcss-scss';
import { Compilate } from "./compilate.js";
export class CompilateCssApplier {
    configurer;
    _processor;
    _computed = new Set();
    _injectBefore = new Set();
    _injectAfter = new Set();
    constructor(configurer) {
        this.configurer = configurer;
    }
    get configs() {
        return this.configurer;
    }
    get compilated() {
        return `/* WidgetUi appliers : injected before */\n${[...this._injectBefore.values()]
            .map(entry => entry)
            .join('\n')}\n/* WidgetUi appliers  */\n${[...this._computed.values()]
            .map(entry => entry)
            .join('\n')}\n/* WidgetUi appliers : injected after */\n${[...this._injectAfter.values()]
            .map(entry => entry)
            .join('\n')}\n`;
    }
    initialize() {
        this._computed.clear();
        return this;
    }
    async parse(source, id) {
        this.initialize();
        this._processor = await postcss().process(source, { from: id, syntax: postcssSc });
        this._processor?.root.walkAtRules(atRule => {
            const computed = [];
            atRule.walkAtRules('apply', (applyRule) => {
                const name = atRule.params.trim();
                const _selector = Compilate.parseSelector(name);
                const sequence = applyRule.params.trim();
                let selector = applyRule.parent?.selector || undefined;
                let compilated = {};
                selector = selector ? selector
                    .trim()
                    .replace(/&/gi, _selector) : _selector;
                console.log(name, selector);
                sequence.split(' ')
                    .forEach(entry => {
                    compilated = {
                        ...compilated,
                        ...Compilate.instance?.compilate(entry),
                    };
                });
                computed.push(`${selector}{${Compilate.instance?.parse(compilated)}}`);
                applyRule.remove();
            });
            if (computed.length)
                this._computed.add(`@layer ${atRule.name}\n{\n${computed.join('\n')}\n}`);
        });
        return this;
    }
    compilates() {
        return this;
    }
}
