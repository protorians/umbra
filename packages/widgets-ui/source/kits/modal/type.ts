import {
    type IKit,
    type IStyleSheetDeclarations,
    type IWidgetNode,
    PopupType,
    PositionX,
    PositionY,
    ObjectElevation
} from "@protorians/widgets";
import {ModalStyleSections} from "./enum.js";
import {IAnimetricSlimOptions} from "@protorians/animetric";
import {PartialWithout} from "@protorians/core";


export type IModalElevation = ObjectElevation.Float | ObjectElevation.Critical | ObjectElevation.Overlay;

export interface IModalLayout {
    children: IWidgetNode<any, any>;
    trigger: IWidgetNode<any, any>;
    foreground: IWidgetNode<any, any>;
    background: IWidgetNode<any, any>;
    dialogBox: IWidgetNode<any, any>;
}

export type IModalStyles = {
    [K in ModalStyleSections]: IStyleSheetDeclarations | undefined;
}

export interface IModalOptions extends Omit<PartialWithout<IModalLayout, 'children' | 'trigger'>, 'foreground' | 'background'> {
    type?: PopupType;
    opened?: boolean;
    locked?: boolean;
    blurred?: boolean;
    ariaTitle?: string;
    ariaDescription?: string;
    scoped?: boolean;
    animateIn?: IAnimetricSlimOptions;
    animateOut?: IAnimetricSlimOptions;
    position?: [PositionX, PositionY];
    styles?: Partial<IModalStyles>;
}

export interface IModalActionable {
    show(): this;

    close(): this;

    hide(): this;

    toggle(): this;
}

export interface IModal extends IKit<IModalLayout, IModalOptions>, IModalActionable {
    setChildren(children?: IWidgetNode<any, any>): this;

    setTrigger(children?: IWidgetNode<any, any>): this;
}