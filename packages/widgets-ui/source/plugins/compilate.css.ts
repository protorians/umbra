import {IConfigurator, ICssApplierCompilator, ICssVariablesCompilator, ISynchronizable} from "../types/index.js";
import {CompilateCssVariables} from "./compilate.css.variables.js";
import {CompilateCssApplier} from "./compilate.css.applier.js";

export class CompilateCss implements ISynchronizable {
    protected _id: string | undefined;
    protected _source: string | undefined;
    protected _computed: Set<string> = new Set();
    protected _variables: ICssVariablesCompilator;
    protected _applier: ICssApplierCompilator;

    constructor(
        public readonly configurer: IConfigurator
    ) {
        this._variables = new CompilateCssVariables(this.configurer)
        this._applier = new CompilateCssApplier(this.configurer)
    }

    get id() {
        return this._id;
    }

    get source() {
        return this._source;
    }

    get compilated(): string {
        return `/* WidgetUi Compilated */\n${
            [...this._computed.values()]
                // .map(([key, value]) => `${key}{\n${value}\n}`)
                .join('\n')
        }\n`;
    }

    async parse(source: string, id?: string): Promise<this> {
        this._id = id;
        this._source = source;
        await this._variables.parse(source, id);
        await this._applier.parse(source, id);
        return this;
    }

    // protected initialize(): this {
    //     this._computed.clear()
    //     return this;
    // }

    compilates(): this {
        this._variables.compilates()
        this._computed.add(this._variables.compilated);
        this._applier.compilates()
        this._computed.add(this._applier.compilated);
        return this;
    }
}