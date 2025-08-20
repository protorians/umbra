import {ICapabilityInstance} from "@protorians/core";
import {IPrimitive, IStyleSheetDeclarations, IWidgetNode} from "@protorians/widgets";
import {ThemeSelectStatus} from "./enum.js";


export type IThemeSelectValue = IPrimitive;

export type IThemeSelectOption = {
    value: IThemeSelectValue;
    child: IWidgetNode<any, any> | undefined;
}

export interface IThemeSelectArrows {
    open?: IWidgetNode<any, any>;
    close?: IWidgetNode<any, any>;
}

export interface IThemeSelectCheckbox {
    checked?: IWidgetNode<any, any>;
    unchecked?: IWidgetNode<any, any>;
}

export type IThemeSelectStyles = {
    widget?: IStyleSheetDeclarations;
    handler?: IStyleSheetDeclarations;
    arrow?: IStyleSheetDeclarations;
    options?: IStyleSheetDeclarations;
    option?: IStyleSheetDeclarations;
    selected?: IStyleSheetDeclarations;
    focused?: IStyleSheetDeclarations;
    checkbox?: IStyleSheetDeclarations;
    optionContent?: IStyleSheetDeclarations;
};

export type IThemeSelectCallable = (select: IThemeSelect) => void;

export type IThemeSelectListenerSlots = "change" | "open" | "close" | "toggle";

export type IThemeSelectListeners = {
    [K in IThemeSelectListenerSlots]?: IThemeSelectCallable;
}

export interface IThemeSelectOptions {
    multipleSuffix?: string;
    value?: IThemeSelectValue;
    options: IThemeSelectOption[];
    arrows?: IThemeSelectArrows;
    checkbox?: IThemeSelectCheckbox;
    fallback?: IWidgetNode<any, any>;
    styles?: IThemeSelectStyles
    multiple?: boolean;
    listen?: IThemeSelectListeners;
}

export interface IThemeSelectMethods {
    open: undefined;
    close: undefined;
    toggle: undefined;
    select: IThemeSelectValue;
    options: IThemeSelectOption[];
}

export interface IThemeSelectProperties {
    value: IThemeSelectValue | IThemeSelectValue[];
    status: ThemeSelectStatus;
    list: IThemeSelectOption[];
}

export type IThemeSelect = ICapabilityInstance<IThemeSelectMethods> & IThemeSelectProperties;