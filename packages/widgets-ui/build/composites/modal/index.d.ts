import { type IChildren, type ICommonAttributes, type IWidgetDeclaration } from "@protorians/widgets";
import { IModalOptions } from "../../kits/index.js";
export declare function ThemeModal(declarations: Omit<IWidgetDeclaration<HTMLElement, Partial<IModalOptions> & ICommonAttributes>, 'children'>): IChildren<any>;
