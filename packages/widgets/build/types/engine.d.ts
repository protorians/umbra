import type { IAttributes } from "./attributes.js";
import type { ICallable, IChildrenSupported, IContext, IGlobalAttributes, IGlobalEventCallableMap, IGlobalEventMap, IGlobalEventPayload, IPropStack, ISignalableCallbackMap, IWidgetNode } from "./widget.js";
import type { IStateStack } from "./state.js";
import type { IChildren } from "./children.js";
import type { IStyleDeclaration, IStyleSheetDeclarations } from "./style.js";
import type { IPrimitive, IStringToken } from "./value.js";
import { Displaying, ToggleOption } from "../enums.js";
import { ISpectraElement } from "@protorians/spectra";
export type IEngineMap = {
    server<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>): IEngine<E, A>;
    client<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>): IEngine<E, A>;
};
export interface IEngineConstructor<E extends HTMLElement, A extends IAttributes> extends IEngine<E, A> {
    new (widget: IWidgetNode<E, A>): IEngine<E, A>;
}
export interface IEngine<E extends HTMLElement, A extends IAttributes> {
    readonly widget: IWidgetNode<E, A>;
    get element(): ISpectraElement | HTMLElement | undefined;
    clear(widget: IWidgetNode<E, A>): this;
    remove(widget: IWidgetNode<E, A>): this;
    enable(widget: IWidgetNode<E, A>): this;
    disable(widget: IWidgetNode<E, A>): this;
    lock(widget: IWidgetNode<E, A>): this;
    unlock(widget: IWidgetNode<E, A>): this;
    trigger(widget: IWidgetNode<E, A>, type: keyof IGlobalEventMap): this;
    computedStyle(widget: IWidgetNode<E, A>, token: keyof IStyleDeclaration): string | undefined;
    hide(widget: IWidgetNode<E, A>): this;
    show(widget: IWidgetNode<E, A>, display?: Displaying): this;
    toggle(widget: IWidgetNode<E, A>, option?: ToggleOption): this;
    focus(widget: IWidgetNode<E, A>): this;
    blur(widget: IWidgetNode<E, A>): this;
    data(widget: IWidgetNode<E, A>, dataset: IGlobalAttributes): this;
    attribute(widget: IWidgetNode<E, A>, attributes: Partial<A>): this;
    attributeLess(widget: IWidgetNode<E, A>, attributes: IGlobalAttributes): this;
    content(widget: IWidgetNode<E, A>, children: IChildren<IChildrenSupported>): this;
    style(widget: IWidgetNode<E, A>, declaration: IStyleSheetDeclarations): this;
    className(widget: IWidgetNode<E, A>, token: IStringToken): this;
    removeClassName(widget: IWidgetNode<E, A>, token: IStringToken): this;
    clearClassName(widget: IWidgetNode<E, A>): this;
    replaceClassName(widget: IWidgetNode<E, A>, oldToken: IStringToken, token: IStringToken): this;
    value(widget: IWidgetNode<E, A>, data: IPrimitive): this;
    html(widget: IWidgetNode<E, A>, data: string): this;
    listens(widget: IWidgetNode<E, A>, listeners: Partial<IGlobalEventCallableMap<E, A>>): this;
    listen<T extends keyof IGlobalEventMap>(widget: IWidgetNode<E, A>, type: T, callback: ICallable<E, A, IGlobalEventPayload<T>>, options?: boolean | AddEventListenerOptions): this;
    ons(widget: IWidgetNode<E, A>, listeners: Partial<IGlobalEventCallableMap<E, A>>): this;
    on<T extends keyof IGlobalEventMap>(widget: IWidgetNode<E, A>, type: T, callback: ICallable<E, A, IGlobalEventPayload<T>> | null): this;
    detachEvent<T extends keyof IGlobalEventMap>(widget: IWidgetNode<E, A>, type: T): this;
    signals(widget: IWidgetNode<E, A>, signals: Partial<ISignalableCallbackMap<any, any>>): this;
    stase(widget: IWidgetNode<E, A>, state: boolean): this;
    render<P extends IPropStack, S extends IStateStack>(widget: IWidgetNode<any, any>, context: IContext<P, S>): string | E | undefined;
}
