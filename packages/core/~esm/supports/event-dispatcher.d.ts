import type { IEventDispatcher, IEventDispatcherCallback, IEventDispatcherEntries, IEventDispatcherProgations, IEventDispatcherScheme } from "../types/index.js";
export declare class EventDispatcher<Scheme extends IEventDispatcherScheme> implements IEventDispatcher<Scheme> {
    propagations: IEventDispatcherProgations<Scheme>;
    entries: IEventDispatcherEntries<Scheme>;
    listen<I extends keyof Scheme>(type: I, callback: IEventDispatcherCallback<Scheme[I]>, force?: boolean | undefined): this;
    dispatch(type: keyof Scheme, data: any): this;
}
