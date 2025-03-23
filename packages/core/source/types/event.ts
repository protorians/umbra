
export type IEventDispatcherEntry = {

  force?: boolean;

  callback: IEventDispatcherCallback<any>

}

export type IEventDispatcherEntries<Scheme extends IEventDispatcherScheme> = {

  [K in keyof Scheme]: IEventDispatcherEntry[]

}


export type IEventDispatcherProgations<Scheme extends IEventDispatcherScheme> = {

  [K in keyof Scheme]: boolean

}

export interface IEventDispatcherScheme {

  [K: string]: any

}

export interface IEventDispatcher<Scheme extends IEventDispatcherScheme> {

  propagations: IEventDispatcherProgations<Scheme>;

  entries: IEventDispatcherEntries<Scheme>;

  listen<I extends keyof Scheme>(type: I, callback: IEventDispatcherCallback<Scheme[I]>, force?: boolean): this;

  dispatch(type: keyof Scheme, data?: any): this;

}


/**
 * Emitter
 */
export type IEventDispatcherCallback<I> = (payload: I) => void | boolean;
