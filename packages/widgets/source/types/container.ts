import type {Sizer} from "../enums.js";
import type {IChildrenSupported, IWidgetDeclaration} from "./widget.js";
import type {IChildren} from "./children.js";
import type {ICommonAttributes} from "./attributes.js";
import type {IStyleSheetDeclarations} from "./style.js";

export interface ContainerProps {
    size?: number | string | Sizer;
    style?: IStyleSheetDeclarations;
    contentAttributes?: Omit<IWidgetDeclaration<HTMLElement, ICommonAttributes>, 'children'>;
    children: IChildren<IChildrenSupported>;
}
