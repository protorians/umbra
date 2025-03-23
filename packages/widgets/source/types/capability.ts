import type {ICallable, IWidgetNode} from "./widget.js";
import type {IAttributes} from "./attributes.js";


export interface ICapability<E extends HTMLElement, A extends IAttributes, Payload> {
  readonly name: string;
  readonly callable: ICallable<E, A, Payload>;

  on(widget: IWidgetNode<E, A>,): this;

  make<T>(payload: Payload,): T | void
}
