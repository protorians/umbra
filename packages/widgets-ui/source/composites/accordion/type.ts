import {
    AligningDirection,
    type IRef,
    type IStyleSheetDeclarations,
    type IWidgetNode
} from "@protorians/widgets";
import {AccordionStatus, AccordionType} from "./enum.js";
import {ICapability, ICapabilityInstance} from "@protorians/core";


export type IThemeAccordionIndex = string | number;

export type IThemeAccordionChildCallable = (accordion: IThemeAccordion) => IThemeAccordionOption;

export type IThemeAccordionChild = IThemeAccordionOption | IThemeAccordionChildCallable;

export type IThemeAccordionChildren = IThemeAccordionChild[];

export type IThemeAccordionEntries = Record<IThemeAccordionIndex, IThemeAccordionEntry>;

export type IThemeAccordionStyles = Partial<{
    widget: IStyleSheetDeclarations | undefined;
    item: IStyleSheetDeclarations | undefined;
    trigger: IStyleSheetDeclarations | undefined;
    content: IStyleSheetDeclarations | undefined;
}>

export interface IThemeAccordionEntry {
    capability: ICapability<IThemeAccordionMethods>;
    accordion: IThemeAccordion;
    trigger: IRef<any, any>;
    content: IRef<any, any>;
    wrapper: IRef<any, any>;
}

export interface IThemeAccordionOption {
    index: IThemeAccordionIndex;
    trigger: IWidgetNode<any, any>;
    content: IWidgetNode<any, any>;
}

export interface IThemeAccordionOptions {
    type?: AccordionType;
    defaultIndex?: IThemeAccordionIndex;
    direction?: AligningDirection;
    children?: IThemeAccordionChildren;
    styles?: IThemeAccordionStyles;
}

export interface IThemeAccordionMethods {
    open: IThemeAccordionIndex | undefined;
    close: IThemeAccordionIndex | undefined;
    toggle: IThemeAccordionIndex | undefined;
    remove: IThemeAccordionIndex | undefined;
}

export interface IThemeAccordionProperties {
    status: AccordionStatus;
}

export type IThemeAccordion = ICapabilityInstance<IThemeAccordionMethods> & IThemeAccordionProperties;

