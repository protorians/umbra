import { EdgePosition, FloatPosition, IWidgetNode } from "@protorians/widgets";
import { IModalCallable, IModalOptions } from "../../kits/index.js";
export interface ThemeSheetOptions extends Partial<Omit<IModalOptions, 'position'>> {
    position?: FloatPosition;
    alignment?: EdgePosition;
    children?: IWidgetNode<any, any> | IModalCallable;
}
