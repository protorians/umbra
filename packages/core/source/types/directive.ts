import {TreatmentQueueStatus} from "../supports";

export type IDirectiveStack<I> = Map<string, IDirective<I>>;

export type IDirectivesCollection<I> = Record<string, IDirective<I>>;

export interface IDirectivePayload<I> {
    value: I;
    type?: string;
    args?: Record<string, any>;
}

export type IDirective<I> = (payload: IDirectivePayload<I>) => I
    | TreatmentQueueStatus.Exit
    | TreatmentQueueStatus.Cancel
    | TreatmentQueueStatus.SnapOut
    | undefined
    | void;

export interface IDirectives<I> {
    stack(): IDirectiveStack<I>;

    get directives(): IDirectivesCollection<I>;

    directive(id: string): IDirective<I> | undefined;

    add(id: string, value: IDirective<I>): this;

    remove(id: string): this;

    clear(): this;

    process<K>(entry: I, type?: string, args?: Record<string, any>): K;
}