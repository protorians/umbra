import { type IButtonAttributes, type IButtonAttributesBase, IWidgetDeclaration } from "@protorians/widgets";
import { type ThemeButtonOptions } from "./type.js";
import { ITheme } from "../../types/index.js";
export declare function ThemeButton(theme: ITheme, declarations: IWidgetDeclaration<HTMLButtonElement, IButtonAttributes & IButtonAttributesBase & ThemeButtonOptions>): import("@protorians/widgets").ButtonWidget;
