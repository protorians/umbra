import type { IView, IEncapsulatorConfigs, IWidgetNode, ICallablePayload, IAttributes, IViewStates, IViewProperties, IEncapsulatorStack } from "./types/index.js";
export declare class Views {
}
export declare class ViewWidget implements IView {
    protected static _instance: IView | undefined;
    protected static _widget: IWidgetNode<any, any> | undefined;
    static _default_configs: IEncapsulatorConfigs;
    static _configs: IEncapsulatorStack;
    static props: Readonly<IViewProperties<any>>;
    static states: Readonly<IViewStates<any>>;
    static get instance(): IView | undefined;
    static get widget(): IWidgetNode<any, any> | undefined;
    static _getConfigs(): IEncapsulatorConfigs | undefined;
    static subscribe(value: ViewWidget): typeof this;
    static bootstrap<E extends HTMLElement, A extends IAttributes>(payload: ICallablePayload<E, A, IWidgetNode<E, A>>): void;
    static defuse<E extends HTMLElement, A extends IAttributes>(payload: ICallablePayload<E, A, undefined>): void;
    static construct<T extends Object>(props?: T): IWidgetNode<any, any> | undefined;
    constructor();
}
export declare class StatefulView extends ViewWidget {
    static _default_configs: IEncapsulatorConfigs;
}
export declare class StatelessView extends ViewWidget {
    static _default_configs: IEncapsulatorConfigs;
}
