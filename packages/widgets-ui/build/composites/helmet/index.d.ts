import { type ThemeHelmetOptions } from "./type.js";
import { type ICommonAttributes, type IWidgetDeclaration, type IWidgetNode } from "@protorians/widgets";
import { ITheme } from "../../types/index.js";
export declare function ThemeHelmet(theme: ITheme, declarations: IWidgetDeclaration<HTMLElement, ThemeHelmetOptions & ICommonAttributes>): IWidgetNode<any, any>;
