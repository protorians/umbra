import {
    AligningDirection,
    type IRef,
    type IStyleSheetDeclarations,
    type IWidgetNode
} from "@protorians/widgets";
import {AccordionStatus, AccordionType} from "./enum.js";
import {ICapability, ICapabilityInstance} from "@protorians/core";


export type IAccordionIndex = string | number;

export type IAccordionChildCallable = (accordion: IAccordion) => IAccordionOption;

export type IAccordionChild = IAccordionOption | IAccordionChildCallable;

export type IAccordionChildren = IAccordionChild[];

export type IAccordionEntries = Record<IAccordionIndex, IAccordionEntry>;

export type IAccordionStyles = Partial<{
    widget: IStyleSheetDeclarations | undefined;
    item: IStyleSheetDeclarations | undefined;
    trigger: IStyleSheetDeclarations | undefined;
    content: IStyleSheetDeclarations | undefined;
}>

export interface IAccordionEntry {
    capability: ICapability<IAccordionMethods>;
    accordion: IAccordion;
    trigger: IRef<any, any>;
    content: IRef<any, any>;
    wrapper: IRef<any, any>;
}

export interface IAccordionOption {
    index: IAccordionIndex;
    trigger: IWidgetNode<any, any>;
    content: IWidgetNode<any, any>;
}

export interface IAccordionOptions {
    type?: AccordionType;
    defaultIndex?: IAccordionIndex;
    direction?: AligningDirection;
    children?: IAccordionChildren;
    styles?: IAccordionStyles;
}

export interface IAccordionMethods {
    open: IAccordionIndex | undefined;
    close: IAccordionIndex | undefined;
    toggle: IAccordionIndex | undefined;
    remove: IAccordionIndex | undefined;
}

export interface IAccordionProperties {
    status: AccordionStatus;
}

export type IAccordion = ICapabilityInstance<IAccordionMethods> & IAccordionProperties;

