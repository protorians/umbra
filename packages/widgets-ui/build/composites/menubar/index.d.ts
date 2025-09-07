import { type ThemeMenubarOptions } from "./type.js";
import { type ICommonAttributes, type IWidgetDeclaration, type IWidgetNode } from "@protorians/widgets";
import { ITheme } from "../../types/index.js";
export declare function ThemeMenubar(theme: ITheme, declarations: IWidgetDeclaration<HTMLElement, ThemeMenubarOptions & ICommonAttributes>): IWidgetNode<any, any>;
