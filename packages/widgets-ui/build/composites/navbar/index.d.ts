import { type ThemeNavbarOptions } from "./type.js";
import { type ICommonAttributes, type IWidgetDeclaration, type IWidgetNode } from "@protorians/widgets";
import { ITheme } from "../../types/index.js";
export declare function ThemeNavbar(theme: ITheme, declarations: IWidgetDeclaration<HTMLElement, ThemeNavbarOptions & ICommonAttributes>): IWidgetNode<any, any>;
