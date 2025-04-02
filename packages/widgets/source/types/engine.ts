import type {IAttributes} from "./attributes.js";
import type {
  ICallable,
  IChildrenSupported,
  IContext,
  IGlobalAttributes, IGlobalEventCallableMap,
  IGlobalEventMap, IGlobalEventPayload,
  IPropStack, ISignalableCallbackMap,
  IWidgetNode
} from "./widget.js";
import type {IMockupElement} from "./mockup.js";
import type {IStateStack} from "./state.js";
import type {IChildren} from "./children.js";
import type {IStyleDeclaration, IStyleSheetDeclarations} from "./style.js";
import type {IPrimitive, IStringToken} from "./value.js";
import {ToggleOption} from "../enums.js";


export type IEngineMap = {
  server<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>): IEngine<E, A>;
  client<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>): IEngine<E, A>;
}

export interface IEngineConstructor<E extends HTMLElement, A extends IAttributes> extends IEngine<E, A>{
  new (widget: IWidgetNode<E, A>): IEngine<E, A>;
}

export interface IEngine<E extends HTMLElement, A extends IAttributes> {
  get element(): IMockupElement<E, A> | undefined;

  // construct(widget: IWidgetNode<E, A>, callback: ICallable<E, A, undefined>): this;
  //
  // mount(widget: IWidgetNode<E, A>, callback: ICallable<E, A, undefined>): this;
  //
  // unmount(widget: IWidgetNode<E, A>, callback: ICallable<E, A, undefined>): this;
  //
  // before(widget: IWidgetNode<E, A>, callback: ICallable<E, A, undefined>): this;
  //
  // after(widget: IWidgetNode<E, A>, callback: ICallable<E, A, undefined>): this;

  clear(widget: IWidgetNode<E, A>,): this;

  remove(widget: IWidgetNode<E, A>,): this;

  enable(widget: IWidgetNode<E, A>,): this;

  disable(widget: IWidgetNode<E, A>,): this;

  lock(widget: IWidgetNode<E, A>,): this;

  unlock(widget: IWidgetNode<E, A>,): this;

  trigger(widget: IWidgetNode<E, A>, type: keyof IGlobalEventMap): this;

  computedStyle(widget: IWidgetNode<E, A>, token: keyof IStyleDeclaration): string | undefined;

  hide(widget: IWidgetNode<E, A>,): this;

  show(widget: IWidgetNode<E, A>,): this;

  toggle(widget: IWidgetNode<E, A>, option?: ToggleOption): this;

  data(widget: IWidgetNode<E, A>, dataset: IGlobalAttributes): this

  attribute(widget: IWidgetNode<E, A>, attributes: Partial<A>): this;

  attributeLess(widget: IWidgetNode<E, A>, attributes: IGlobalAttributes): this;

  content(widget: IWidgetNode<E, A>, children: IChildren<IChildrenSupported>): this;

  style(widget: IWidgetNode<E, A>, declaration: IStyleSheetDeclarations): this;
  // style(widget: IWidgetNode<E, A>, declaration: Partial<IStyleDeclaration>): this;

  className(widget: IWidgetNode<E, A>, token: IStringToken): this;

  value(widget: IWidgetNode<E, A>, data: IPrimitive): this;

  html(widget: IWidgetNode<E, A>, data: string): this;

  listens(widget: IWidgetNode<E, A>, listeners: Partial<IGlobalEventCallableMap<E, A>>): this;

  listen<T extends keyof IGlobalEventMap>(
    widget: IWidgetNode<E, A>,
    type: T,
    callback: ICallable<E, A, IGlobalEventPayload<T>>,
    options?: boolean | AddEventListenerOptions,
  ): this;

  ons(widget: IWidgetNode<E, A>, listeners: Partial<IGlobalEventCallableMap<E, A>>): this;

  on<T extends keyof IGlobalEventMap>(
    widget: IWidgetNode<E, A>,
    type: T,
    callback: ICallable<E, A, IGlobalEventPayload<T>> | null
  ): this;

  signals(widget: IWidgetNode<E, A>, signals: Partial<ISignalableCallbackMap<any, any>>): this;

  stase(widget: IWidgetNode<E, A>, state: boolean): this;

  render<P extends IPropStack, S extends IStateStack>(widget: IWidgetNode<any, any>, context: IContext<P, S>): string | E | undefined;
}