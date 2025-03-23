import type {IView, IViewProperties, IViewStates} from "./view.js";
import type {ICallablePayload, IWidgetNode} from "./widget.js";
import type {IAttributes} from "./attributes.js";

export type IEncapsulatorOptions = {
    transition?: {
        entry?: any;
        exit?: any;
    }
}

export interface IEncapsulatorConfigs {
    main?: string;
    stateless?: boolean;
    bootstrapper?: string;
    defuser?: string;
    properties?: string[];
    states?: string[];
    options?: IEncapsulatorOptions;
    structures?: string[];
}

export interface IEncapsulator {
    _configs: IEncapsulatorConfigs;
    instance: IView | undefined;
    props: Readonly<IViewProperties<any>>;
    states: Readonly<IViewStates<any>>;
    widget: IWidgetNode<any, any> | undefined;
    subscribe(value: this): IEncapsulator;
    bootstrap<E extends HTMLElement, A extends IAttributes>(payload: ICallablePayload<E, A, undefined>): void;
    defuse<E extends HTMLElement, A extends IAttributes>(payload: ICallablePayload<E, A, undefined>): void;
    construct<T extends Object>(props: T): IWidgetNode<any, any>;
}
