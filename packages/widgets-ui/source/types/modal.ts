import {IChildren, IKit, IWidgetNode, PopupType, PositionX, PositionY, WidgetElevation} from "@protorians/widgets";
import type {IAnimetricSlimOptions} from "@protorians/animetric";

export type IModalLayer = (instance: IModal) => IChildren<any>;

export type IModalElevation = WidgetElevation.Float | WidgetElevation.Critical | WidgetElevation.Overlay

export interface IModalWidgets {
    trigger: IWidgetNode<any, any>;
    fore: IModalLayer;
    back?: IModalLayer;
}

export interface IModalLayout {
    foreground: IChildren<any>;
    background: IChildren<any>;
    wrapper: undefined;
}

export interface IModalOptions {
    type?: PopupType;
    trigger: IWidgetNode<any, any>;
    fore: IModalLayer;
    back?: IModalLayer;
    scope?: IWidgetNode<any, any>;
    ariaTitle?: string;
    ariaDescription?: string;
    locked?: boolean;
    blurred?: boolean;
    animate?: IAnimetricSlimOptions;
    position?: [PositionX, PositionY];
}

export interface IModalActionable {
    type(value?: PopupType): this;

    trigger(value?: IWidgetNode<any, any>): this;

    fore(value?: IModalLayer): this;

    back(value?: IModalLayer): this;

    scope(value?: IWidgetNode<any, any>): this;

    ariaTitle(value?: string): this;

    ariaDescription(value?: string): this;

    locked(value?: boolean): this;

    blurred(value?: boolean): this;

    animate(value?: IAnimetricSlimOptions): this;

    position(value?: [PositionX, PositionY]): this;

    // scope(scope?: IWidgetNode<any, any>): this;

    // appendToScope(force: boolean): this;

    // fore(fore?: IModalLayer): this;

    // back(back?: IModalLayer): this;

    // open(fore?: IModalLayer, back?: IModalLayer): this;

    // close(): this;
}

export interface IModal extends IKit<IModalLayout>, IModalActionable {
    // get widget(): IWidgetNode<any, any>;
    //
    // get foreground(): IWidgetNode<any, any>;
    //
    // get background(): IWidgetNode<any, any>;
    //
    get status(): boolean;

    get options(): Partial<IModalOptions>;
    open(): this;
    close(): this;
}
