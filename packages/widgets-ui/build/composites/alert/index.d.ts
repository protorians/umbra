import { ICommonAttributes, IWidgetDeclaration, IWidgetNode } from "@protorians/widgets";
import { ThemeAlertOptions } from "./type.js";
import { ITheme } from "../../types/index.js";
export declare function ThemeAlert(theme: ITheme, declarations: IWidgetDeclaration<HTMLElement, ICommonAttributes & ThemeAlertOptions>): IWidgetNode<any, any> | undefined;
