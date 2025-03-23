import {EdgePosition, FloatPosition} from "@protorians/widgets";
import {IModalOptions} from "@widgetui/core";


export interface KatonSheetProps extends Partial<Omit<IModalOptions, 'position'>> {
    position?: FloatPosition;
    alignment?: EdgePosition;
}