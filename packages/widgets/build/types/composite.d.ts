import { IWidgetNode } from "./widget.js";
export type IComposite<Props> = (props: Props) => IWidgetNode<any, any>;
