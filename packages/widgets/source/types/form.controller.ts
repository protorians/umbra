import { IWidgetNode } from "./widget.js";
import {IFormAttributes} from "./attributes.js";

export type IFormControllerWidget<A extends IFormAttributes> = IWidgetNode<HTMLFormElement, A>

export interface IFormController<A extends IFormAttributes> {
    get widget(): IFormControllerWidget<A>;
    bind(widget: IFormControllerWidget<A>): this;
}