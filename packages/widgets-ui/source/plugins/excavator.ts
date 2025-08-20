import {ExcavatorType} from "./enums.js";
import {ICompilator, IExcavator} from "../types/index.js";
import * as parser from '@babel/parser';
import traverseModule from '@babel/traverse';
import {ObjectUtility} from "@protorians/core";

const traverse = traverseModule.default;

export class Excavator implements IExcavator {

    static WIDGET_REGEX = /className:\s*([^,]*)/gm;

    static HTML_REGEX = /class="([^"]*)"/gm;

    static QUOTES_ONLY = /['"`]([^'"`]*)['"`]/g;

    // static SPLITTER_REGEX = /([^:]+):(.+)/g

    static RUNNER_EXTENSIONS: string[] = ['js', 'ts', 'html', 'htm', 'svg',]

    protected _matches: RegExpExecArray[] = [];

    protected _artifacts: string[] = [];

    protected static _artifacts: string[] = [];

    static set artifacts(artifacts: string[]) {
        this._artifacts = ObjectUtility.purge([...this.artifacts, ...artifacts]);
    }

    static get artifacts(): string[] {
        return this._artifacts
    }

    get matches(): RegExpExecArray[] {
        return this._matches;
    }

    get artifacts(): string[] {
        return ObjectUtility.purge([...Excavator.artifacts, ...this._artifacts]);
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

    syntaxExtracting(code: string): RegExpExecArray[] {
        const parsing = parser.parse(code, {
            sourceType: 'unambiguous',
            plugins: [
                'jsx',
                'typescript',
                'classProperties',
                'decorators-legacy',
                'dynamicImport',
                'optionalChaining',
                'nullishCoalescingOperator',
                'objectRestSpread',
                'bigInt',
            ],
        });
        const excavates = new Set<string>();

        traverse(parsing, {
            StringLiteral(path: any) {
                const v = path.node.value;
                if (typeof v === 'string' && v.includes(':')) excavates.add(v);
            },
            TemplateLiteral(path: any) {
                for (const quasi of path.node.quasis) {
                    const s = quasi.value && quasi.value.cooked;
                    if (typeof s === 'string' && s.includes(':')) excavates.add(s);
                }
            },
            JSXAttribute(path: any) {
                const v = path.node.value;
                if (!v) return;
                if (v.type === 'StringLiteral' && v.value.includes(':')) excavates.add(v.value);
            }
        });

        const tokens: RegExpExecArray[] = [];
        for (const artifact of excavates) {
            artifact.split(' ').forEach(fragment => {
                const t = (/([^:]+):(.+)/g)
                    .exec(fragment.trim());
                if (t) tokens.push(t);
            })
        }


        return tokens;
    }

    parse(): this {
        [
            // ...this.code.matchAll(type == ExcavatorType.Widget ? Excavator.WIDGET_REGEX : Excavator.HTML_REGEX),
            ...this.syntaxExtracting(this.code)
        ].map(match => {
            this._matches.push(match)
        });
        return this;
    }

    make(compilator: ICompilator): this {
        this.parse();

        for (const match of this._matches) {
            this._artifacts = [...this._artifacts, match[0]]
        }

        Excavator.artifacts = this._artifacts;
        compilator.register(this);
        return this;
    }

}