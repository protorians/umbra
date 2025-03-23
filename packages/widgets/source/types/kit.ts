import type {ILayout, ILayoutCallable} from "./layout.js";
import type {ICallablePayload} from "./widget.js";
import type {IChildren} from "./children.js";
import type {IAttributes} from "./attributes.js";

export interface IKit<Layout> {

    get commit(): IKitWidgetCallable;

    get structures(): ILayout<Layout>;

    structure<K extends keyof Layout>(name: K): ILayoutCallable<Layout[K]>;

    get rollback(): this;

}

export type IKitWidgetCallable = (context?: ICallablePayload<any, any, any>) => IChildren<any>
export type IKitWidgetStrictCallable<E extends HTMLElement, A extends IAttributes, P, C> = (context?: ICallablePayload<E, A, P>) => IChildren<C>