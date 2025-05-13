import type {IDirective, IDirectives, IDirectivesCollection, IDirectiveStack} from "../types";
import {TreatmentQueueStatus} from "./enums";

export class Directives<I> implements IDirectives<I> {
    protected _stack: IDirectiveStack<I> = new Map<string, IDirective<I>>();

    stack(): IDirectiveStack<I> {
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

    add(id: string, value: IDirective<I>): this {
        this._stack.set(id, value);
        return this;
    }

    remove(id: string): this {
        this._stack.delete(id);
        return this;
    }

    clear(): this {
        this._stack.clear();
        return this;
    }

    process<K>(value: I, type?: string, args?: Record<string, any>): K {
        for (const [id, directive] of Object.entries(this.directives)) {
            const parsed = directive({value, type, args});

            if (parsed === TreatmentQueueStatus.Exit || parsed === TreatmentQueueStatus.Cancel)
                return value as any;

            else if (parsed === TreatmentQueueStatus.SnapOut)
                this.remove(id)

            else if (typeof parsed !== 'undefined') value = parsed as any;
        }
        return value as any;
    }
}

