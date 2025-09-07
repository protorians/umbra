import { CompilateCssVariables } from "./compilate.css.variables.js";
import { CompilateCssApplier } from "./compilate.css.applier.js";
export class CompilateCss {
    configurer;
    _id;
    _source;
    _computed = new Set();
    _variables;
    _applier;
    constructor(configurer) {
        this.configurer = configurer;
        this._variables = new CompilateCssVariables(this.configurer);
        this._applier = new CompilateCssApplier(this.configurer);
    }
    get id() {
        return this._id;
    }
    get source() {
        return this._source;
    }
    get compilated() {
        return `/* WidgetUi Compilated */\n${[...this._computed.values()]
            .join('\n')}\n`;
    }
    async parse(source, id) {
        this._id = id;
        this._source = source;
        await this._variables.parse(source, id);
        await this._applier.parse(source, id);
        return this;
    }
    compilates() {
        this._variables.compilates();
        this._computed.add(this._variables.compilated);
        this._applier.compilates();
        this._computed.add(this._applier.compilated);
        return this;
    }
}
