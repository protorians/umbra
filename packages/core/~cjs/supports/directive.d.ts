import type { IDirective, IDirectives, IDirectivesCollection, IDirectiveStack } from "../types/index.js";
export declare class Directives<I> implements IDirectives<I> {
    protected _stack: IDirectiveStack<I>;
    stack(): IDirectiveStack<I>;
    get directives(): IDirectivesCollection<I>;
    directive(id: string): IDirective<I> | undefined;
    add(id: string, value: IDirective<I>): this;
    remove(id: string): this;
    clear(): this;
    process<K>(value: I, type?: string, args?: Record<string, any>): K;
}
