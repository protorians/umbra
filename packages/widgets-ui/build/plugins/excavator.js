import { ExcavatorType } from "./enums.js";
import * as parser from '@babel/parser';
import traverseModule from '@babel/traverse';
import { ObjectUtility } from "@protorians/core";
const traverse = traverseModule.default;
export class Excavator {
    code;
    id;
    static WIDGET_REGEX = /className:\s*([^,]*)/gm;
    static HTML_REGEX = /class="([^"]*)"/gm;
    static QUOTES_ONLY = /['"`]([^'"`]*)['"`]/g;
    static RUNNER_EXTENSIONS = ['js', 'ts', 'html', 'htm', 'svg',];
    _matches = [];
    _artifacts = [];
    static _artifacts = [];
    static set artifacts(artifacts) {
        this._artifacts = ObjectUtility.purge([...this.artifacts, ...artifacts]);
    }
    static get artifacts() {
        return this._artifacts;
    }
    get matches() {
        return this._matches;
    }
    get artifacts() {
        return ObjectUtility.purge([...Excavator.artifacts, ...this._artifacts]);
    }
    get extension() {
        const explode = this.id?.split('.');
        return explode ? (explode[explode.length - 1] || explode[0]) : '';
    }
    get accepted() {
        return Excavator.RUNNER_EXTENSIONS.includes(this.extension);
    }
    get type() {
        switch (this.extension) {
            case 'svg':
            case 'html':
            case 'htm':
                return ExcavatorType.HTML;
            default:
                return ExcavatorType.Widget;
        }
    }
    constructor(code, id) {
        this.code = code;
        this.id = id;
    }
    syntaxExtracting(code) {
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
        const excavates = new Set();
        traverse(parsing, {
            StringLiteral(path) {
                const v = path.node.value;
                if (typeof v === 'string' && v.includes(':'))
                    excavates.add(v);
            },
            TemplateLiteral(path) {
                for (const quasi of path.node.quasis) {
                    const s = quasi.value && quasi.value.cooked;
                    if (typeof s === 'string' && s.includes(':'))
                        excavates.add(s);
                }
            },
            JSXAttribute(path) {
                const v = path.node.value;
                if (!v)
                    return;
                if (v.type === 'StringLiteral' && v.value.includes(':'))
                    excavates.add(v.value);
            }
        });
        const tokens = [];
        for (const artifact of excavates) {
            artifact.split(' ').forEach(fragment => {
                const t = (/([^:]+):(.+)/g)
                    .exec(fragment.trim());
                if (t)
                    tokens.push(t);
            });
        }
        return tokens;
    }
    parse() {
        [
            ...this.syntaxExtracting(this.code)
        ].map(match => {
            this._matches.push(match);
        });
        return this;
    }
    make(compilator) {
        this.parse();
        for (const match of this._matches) {
            this._artifacts = [...this._artifacts, match[0]];
        }
        Excavator.artifacts = this._artifacts;
        compilator.register(this);
        return this;
    }
}
