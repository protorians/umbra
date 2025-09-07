import { ICommonAttributes, IWidgetDeclaration } from "@protorians/widgets";
import { ThemeViewOptions } from "./type.js";
import { ITheme } from "../../types/index.js";
export declare function ThemeView(theme: ITheme, declarations: IWidgetDeclaration<HTMLElement, ThemeViewOptions & ICommonAttributes>): import("@protorians/widgets").SectionWidget;
