import { ICallablePayload, type IChildren, type IKit, type IWidgetNode, Kit } from "@protorians/widgets";
import type { IModal, IModalElevation, IModalLayout, IModalOptions } from "./type.js";
import { IAnimetricGroup, IAnimetricSlimOptions } from "@protorians/animetric";
export declare class ModalKit extends Kit<IModalLayout, IModalOptions> implements IModal, IKit<IModalLayout, IModalOptions> {
    protected children(): IChildren<any>;
    protected trigger(): IWidgetNode<any, any>;
    protected background(): import("@protorians/widgets").WidgetNode<HTMLElement, import("@protorians/widgets").ICommonAttributes>;
    protected foreground(): import("@protorians/widgets").ColumnStackWidget;
    protected dialogBox(): import("@protorians/widgets").StackWidget;
    protected animate(widget: IWidgetNode<any, any>, options: IAnimetricSlimOptions): IAnimetricGroup;
    get elevation(): IModalElevation;
    main(context: ICallablePayload<any, any, any>): import("@protorians/widgets").WidgetNode<HTMLElement, import("@protorians/widgets").ICommonAttributes>;
    setChildren(children?: IWidgetNode<any, any>): this;
    setTrigger(children?: IWidgetNode<any, any>): this;
    show(): this;
    close(): this;
    hide(): this;
    toggle(): this;
}
