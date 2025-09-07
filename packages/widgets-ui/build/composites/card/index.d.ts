import { IAttributes, IWidgetDeclaration, IWidgetNode } from "@protorians/widgets";
import { IThemeCardOptions } from "./type.js";
import { ITheme } from "../../types/index.js";
export declare function ThemeCard(theme: ITheme, declarations: IWidgetDeclaration<HTMLElement, IThemeCardOptions & IAttributes>): IWidgetNode<any, any>;
