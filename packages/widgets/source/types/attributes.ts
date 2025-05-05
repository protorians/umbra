import {PopupType} from "../enums.js";
import type {
    IBoolean,
    IFormRelationship,
    ILoading,
    IOnOff,
    IReferrerPolicy,
    ISandbox,
    ISorting,
    ITarget,
    IUndefined,
    IYesNo
} from "./value.js";
import {ICallable, IGlobalEventPayload} from "./widget.js";

export type IAttributes = Partial<
    ICommonAttributes
    | IVideoAttributes
    | ISourceProps
    | IPictureAttributes
    | IAudioAttributes
    | IIFrameAttributes
    | IArticleAttributes
    | IHeadingAttributes
    | IParagraphAttributes
    | IStrongAttributes
    | IHelmetAttributes
    | IFrameAttributes
    | IFooterAttributes
    | ILinkAttributes
    | ISpanAttributes
    | ISectionAttributes
    | ITableAttributes
    | ITableCellAttributes
    | ITableRowAttributes
    | ITableCaptionAttributes
    | ITableFooterAttributes
    | ITableHeadAttributes
    | ITableBodyAttributes
    | IButtonAttributes
    | IInputAttributes
    | IOptionGroupAttributes
    | IOptionAttributes
    | ISelectAttributes
    | ITextareaAttributes
    | ILabelAttributes
    | IInputableAttributes
    | IFormAttributes
    | IProgressAttributes
>

export type IOperatingProps<T> = {
    [K in keyof T]: T[keyof T]
}

export interface IAccessibilityAttributes {
    ariaAutocomplete?: "none" | "inline" | "list" | "both";
    ariaChecked?: IBoolean | "mixed";
    ariaDisabled?: IBoolean;
    ariaErrormessage?: string;
    ariaExpanded?: IBoolean | IUndefined;
    ariaHaspopup?: IBoolean | PopupType;
    ariaModal?: IBoolean;
    ariaHidden?: IBoolean | IUndefined;
    ariaInvalid?: "grammar" | "spelling" | IBoolean;
    ariaLabel?: string;
    ariaLevel?: number;
    ariaMultiline?: IBoolean;
    ariaMultiselectable?: string;
    ariaOrientation?: string;
    ariaPlaceholder?: string;
    ariaPressed?: IBoolean;
    ariaReadonly?: IBoolean;
    ariaRequired?: IBoolean;
    ariaSelected?: IBoolean | IUndefined;
    ariaSort?: ISorting;
    ariaValuemax?: number;
    ariaValuemin?: number;
    ariaValuenow?: number;
    ariaValuetext?: string;
    ariaCurrent?: IBoolean | "page" | "step" | "location" | "date" | "time";
    ariaKeyshortcuts?: string;
    ariaRoledescription?: string;
    ariaBraillelabel?: string;
    ariaBrailleroledescription?: string;
    ariaColindextext?: string;
    ariaRowindextext?: string;
}

export interface IAccessibilityRegionAttributes {
    ariaBusy?: IBoolean;
    ariaLive?: "assertive" | "off" | "polite";
    ariaRelevant?: "additions" | "all" | "removals" | "text";
    ariaAtomic?: IBoolean;
}

export interface IAccessibilityDragAndDropAttributes {
    ariaDropeffect?: "copy" | "execute" | "link" | "move" | "none" | "popup";
    ariaGrabbed?: IBoolean | IUndefined;
}

export interface IAccessibilityRelationshipAttributes {
    ariaActivedescendant?: string;
    ariaColcount?: number;
    ariaColindex?: number;
    ariaControls?: string;
    ariaDescribedby?: string;
    ariaDescription?: string;
    ariaDetails?: string;
    ariaFlowto?: string;
    ariaLabelledby?: string;
    ariaOwns?: string;
    ariaPosinset?: number;
    ariaRowcount?: number;
    ariaRowindex?: number;
    ariaRowspan?: number;
    ariaSetsize?: number;
}

export interface ICommonAttributes extends IAccessibilityAttributes, IAccessibilityRegionAttributes, IAccessibilityDragAndDropAttributes, IAccessibilityRelationshipAttributes {
    role?: string;
    accesskey?: string;
    contenteditable?: string;
    dir?: string;
    id?: string;
    lang?: string;
    title?: string;
    tabindex?: number;
    spellcheck?: boolean;
    draggable?: boolean;
    hidden?: boolean;
    translate?: IYesNo;
    rel?: string;
}

export interface ISpanAttributes extends ICommonAttributes {
}

export interface IItalicAttributes extends ICommonAttributes {
}

export interface IParagraphAttributes extends ICommonAttributes {
}

export interface IHeadingAttributes extends ICommonAttributes {
}

export interface IStrongAttributes extends ICommonAttributes {
}

export interface IArticleAttributes extends ICommonAttributes {
}

export interface IFooterAttributes extends ICommonAttributes {
}

export interface IFrameAttributes extends ICommonAttributes {
}

export interface IHelmetAttributes extends ICommonAttributes {
}

export interface INavbarProps extends ICommonAttributes {
}

export interface ISectionAttributes extends ICommonAttributes {
}

export interface IRowAttributes extends ICommonAttributes {
}

export interface IColumnAttributes extends ICommonAttributes {
}

export interface IGridAttributes extends ICommonAttributes {
    grid?: string;
    gridTemplateRows?: string;
    gridTemplateColumns?: string;
    gridTemplateAreas?: string;
    gridAutoRows?: string;
    gridAutoColumns?: string;
    gridAutoFlow?: string;
    gridRowGap?: string;
    gridColumnGap?: string;
}

export interface ILinkAttributes extends ICommonAttributes {
    href: string;
    hreflang?: string;
    ping?: string;
    referrerPolicy?: IReferrerPolicy;
    target?: ITarget;
    type?: string;
    download?: string;
    media?: string;
}


export type IInputType = 'text'
    | 'button'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'time'
    | 'url'
    | 'week'
    | 'checkbox';


export type IInputableCommonAttributes = {
    form?: string;
    formAction?: string;
    formEnctype?: string;
    formMethod?: 'get' | 'post';
    formNovalidate?: boolean;
    formTarget?: ITarget;
}


export type IButtonType = 'button' | 'reset' | 'submit' | 'menu'

export interface IButtonAttributes extends IInputableAttributes {
    popoverTarget?: string;
    popoverTargetAction?: string;
    type?: IButtonType;
}

export interface IButtonAttributesBase extends IInputableAttributes {
    onPress: ICallable<HTMLButtonElement, IButtonAttributes, IGlobalEventPayload<'click'>>;
    onPressStart?: ICallable<HTMLButtonElement, IButtonAttributes, IGlobalEventPayload<'mousedown'>>;
    onPressEnd?: ICallable<HTMLButtonElement, IButtonAttributes, IGlobalEventPayload<'mouseup'>>;
}

export interface IInputAttributes extends IInputableAttributes {
    type?: IInputType;
    children?: undefined;
}


export interface IOptionGroupAttributes extends ICommonAttributes {
    disabled?: boolean;
    label: string;
}


export interface IOptionAttributes extends ICommonAttributes {
    disabled?: boolean;
    selected?: boolean;
    label: string;
    value?: string | number;
}

export interface ISelectAttributes extends IInputableAttributes {
}

export interface ITextareaAttributes extends IInputableAttributes {
}

export interface ILabelAttributes extends IInputableAttributes {
    for?: string;
}

export interface IInputableAttributes extends ICommonAttributes, IInputableCommonAttributes {
    name?: string;
    alt?: string;
    autocomplete?: IOnOff;
    autofocus?: boolean;
    checked?: boolean;
    dirname?: string;
    disabled?: boolean;
    list?: string;
    max?: number | string;
    min?: number | string;
    maxlength?: number;
    minlength?: number;
    multiple?: boolean;
    pattern?: RegExp;
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    size?: number;
    // src?: string; // Input image type
    step?: number;
    value?: string;
    accept?: string;
}

export interface IFormAttributes extends ICommonAttributes {
    acceptCharset?: string;
    action?: string;
    autocomplete?: 'on' | 'off';
    enctype?: string;
    method?: 'get' | 'post';
    name?: string;
    novalidate?: boolean;
    rel?: IFormRelationship;
    target?: ITarget;
}

export interface IVideoAttributes extends ICommonAttributes {
    autoplay?: boolean;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
    width?: string;
    height?: string;
    poster?: string;
    preload?: 'auto' | 'metadata' | 'none';
    src?: string;
}

export interface ISourceProps extends ICommonAttributes {
    srcset?: string;
    media?: string;
    src?: string;
    sizes?: string;
    type?: string;
}

export interface IProgressAttributes extends ICommonAttributes {
    value?: string;
    min?: string;
    max?: string;
}

export interface IPictureAttributes extends ICommonAttributes {
    source?: ISourceProps | ISourceProps[];
    src?: string;
    alt?: string;
}

export interface IImageAttributes extends ICommonAttributes {
    src?: string;
    alt?: string;
    srcset?: string;
    children?: undefined;
}

export interface IAudioAttributes extends ICommonAttributes {
    autoplay?: boolean;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
    preload?: boolean;
    src: string;
}

export interface IIFrameAttributes extends ICommonAttributes {
    allow?: string;
    allowfullscreen?: IBoolean;
    allowpaymentrequest?: IBoolean;
    loading?: ILoading;
    name?: string;
    referrerpolicy?: IReferrerPolicy;
    sandbox?: ISandbox;
    src: string;
}


export interface ITableAttributes extends ICommonAttributes {

}

export interface ITableCaptionAttributes extends ICommonAttributes {

}

export interface ITableBodyAttributes extends ICommonAttributes {

}

export interface ITableFooterAttributes extends ICommonAttributes {

}

export interface ITableRowAttributes extends ICommonAttributes {

}

export interface ITableHeadAttributes extends ITableCellAttributes {

}

export interface ITableCellAttributes extends ICommonAttributes {
    scope?: string;
    rowspan?: number;
    colspan?: number;
}



