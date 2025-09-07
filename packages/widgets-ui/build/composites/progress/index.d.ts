import { ICommonAttributes, IWidgetDeclaration } from "@protorians/widgets";
import { ThemeProgressOptions } from "./type.js";
import { ITheme } from "../../types/index.js";
export declare function ThemeProgress(theme: ITheme, declarations: Omit<IWidgetDeclaration<HTMLElement, ThemeProgressOptions & ICommonAttributes>, 'children'>): import("@protorians/widgets").WidgetNode<HTMLElement, ICommonAttributes>;
