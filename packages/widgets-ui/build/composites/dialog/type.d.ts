import { IWidgetNode } from "@protorians/widgets";
import { IModal, IModalOptions } from "../../kits/index.js";
import { LayerVariant } from "../../enums.js";
export interface ThemeDialogOptions extends Partial<Omit<IModalOptions, 'favicon' | 'position' | 'locked' | 'blurred' | 'type'>> {
    variant?: LayerVariant;
    icon?: IWidgetNode<any, any>;
    title?: string;
    actions?: (modal: IModal) => (IWidgetNode<any, any> | undefined)[];
}
