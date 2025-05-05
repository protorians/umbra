import type {IDirective, IDirectives, IDirectivesCollection} from "../types";

export class Directive<I> {
    protected _stack: IDirectives<I> = new Map<string, IDirective<I>>();

    stack(): IDirectives<I> {
        return this._stack;
    }

    get directives(): IDirectivesCollection<I> {
        const entries: IDirectivesCollection<I> = {}
        for (const [key, value] of this._stack.entries()) entries[key] = value
        return entries;
    }

    directive(id: string): IDirective<I> | undefined {
        return this._stack.get(id);
    }

    add(id: string, value: IDirective<I>): typeof this {
        this._stack.set(id, value);
        return this;
    }

    process(entry: I): I {
        for (const directive of Object.values(this.directives))
            entry = directive(entry);
        return entry;
    }

}

