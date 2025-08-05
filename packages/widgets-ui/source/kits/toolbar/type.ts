import {AligningDirection, IKit, IKitSignalMap, IRef, IStyleSheet, IWidgetNode} from "@protorians/widgets";
import {LayerVariant} from "../../enums.js";


export type IToolbarCallable = (carousel: IToolbar) => IToolbarOptions;

export interface IToolbarStyles {
    widget?: IStyleSheet;
}

export interface IToolbarAction {
    children: IWidgetNode<any, any>;
    callable?: IToolbarCallable;
}

export interface IToolbarOptions {
    variant?: LayerVariant;
    fixed?: boolean;
    direction?: AligningDirection;
    leftTool?: IWidgetNode<any, any>[];
    logo?: IWidgetNode<any, any>;
    items: IWidgetNode<HTMLElement, any>[];
    rightTool?: IWidgetNode<any, any>[];
}

export interface IToolbarLayout {
    leftTool: IWidgetNode<any, any>;
    progress: IWidgetNode<any, any>;
}

export interface IToolbarRefs {
    widget: IRef<HTMLElement, any>;
}

export interface IToolbarSignalMap extends IKitSignalMap<IToolbarLayout, IToolbarOptions> {
    ready?: IToolbar;
}

export interface IToolbarActionable {
    showLeft(menus: IToolbarAction[]): this;

    hideLeft(): this;

    showRight(menus: IToolbarAction[]): this;

    hideRight(): this;
}

export interface IToolbar extends IKit<IToolbarLayout, IToolbarOptions>, IToolbarActionable {
    get refs(): IToolbarRefs;

    setMenu(menus: IToolbarAction[]): this;

    addMenu(menu: IToolbarAction): this;
}