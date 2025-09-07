import { IWidgetNode } from "@protorians/widgets";
export interface IThemeAction<T> {
    trigger: IWidgetNode<any, any>;
    callable: (handler: T) => void;
}
