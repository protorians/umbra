import {ExcavatorType} from "./enums.js";
import {ICompilator, IExcavator} from "../types/index.js";

export class Excavator implements IExcavator {

    static WIDGET_REGEX = /className:\s*([^,]*)/gm;

    static HTML_REGEX = /class="([^"]*)"/gm;

    static QUOTES_ONLY = /['"`]([^'"`]*)['"`]/g;

    static RUNNER_EXTENSIONS: string[] = ['js', 'ts', 'html', 'htm', 'svg',]

    protected _matches: RegExpExecArray[] = [];

    protected _artifacts: string[] = [];


    get matches(): RegExpExecArray[] {
        return this._matches;
    }

    get artifacts(): string[] {
        return this._artifacts;
    }

    get extension(): string {
        const explode = this.id?.split('.');
        return explode ? (explode[explode.length - 1] || explode[0]) : '';
    }

    get accepted(): boolean {
        return Excavator.RUNNER_EXTENSIONS.includes(this.extension)
    }

    get type(): ExcavatorType {
        switch (this.extension) {
            case 'svg':
            case 'html':
            case 'htm':
                return ExcavatorType.HTML;
            default:
                return ExcavatorType.Widget;
        }
    }

    constructor(
        public readonly code: string,
        public readonly id?: string,
    ) {
    }

    parse(type: ExcavatorType): this {
        [...this.code.matchAll(type == ExcavatorType.Widget ? Excavator.WIDGET_REGEX : Excavator.HTML_REGEX)]
            .map(match =>
                this._matches = [
                    ...this._matches,
                    ...(match[1].matchAll(Excavator.QUOTES_ONLY))
                ]
            )
        return this;
    }

    make(compilator: ICompilator): this {
        this.parse(this.type)

        for (const match of this._matches) {
            this._artifacts = [...this._artifacts, ...match[1].split(' ')]
        }

        compilator.register(this);
        return this;
    }

}