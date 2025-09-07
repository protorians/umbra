import { ICommonAttributes, IWidgetDeclaration } from "@protorians/widgets";
import { ThemeLayerOptions } from "./type.js";
import { ITheme } from "../../types/index.js";
export declare function ThemeLayer(theme: ITheme, declarations: IWidgetDeclaration<HTMLElement, ThemeLayerOptions & ICommonAttributes>): import("@protorians/widgets").StackWidget;
