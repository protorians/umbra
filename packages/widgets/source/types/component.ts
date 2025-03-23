import type {IPropStack, IWidgetNode} from "./widget.js";
import type {IStateStack} from "./state.js";

export interface IComponentElement extends HTMLElement {
  connectedCallback(): void;

  disconnectedCallback(): void;

  adoptedCallback(): void;
}

export type IComponentCallable = (element: IComponentElement) => IWidgetNode<any, any>

export type IComponentPayload<P extends IPropStack, S extends IStateStack> = {
  props: Readonly<P>;
  states: S;
}

export type IComponentConstruct<P extends IPropStack, S extends IStateStack> = (store: IComponentPayload<P, S>) => IWidgetNode<any, any>

export type IContextual<S extends IComponentPayload<any, any>> = Readonly<Pick<S, 'props'>> & Pick<S, 'states'>

export type IComposableFunction<S extends IComponentPayload<any, any>> = (contextual: IContextual<S>) => IWidgetNode<any, any>

export type IExpandableFunction<S extends IComponentPayload<any, any>> = (props: Pick<S, 'props'>) => IWidgetNode<any, any> | undefined;

export interface IViewCollection {
  [key: string]: <S extends IComponentPayload<any, any>>(props: S['props']) => IWidgetNode<any, any> | undefined;
}
