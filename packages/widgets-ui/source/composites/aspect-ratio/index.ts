import {IWidgetNode} from "@protorians/widgets";
import {ThemeAspectRatioProps} from "./type.js";


export function ThemeAspectRatio(
    declarations: ThemeAspectRatioProps
): IWidgetNode<any, any> {
    return declarations.children.style({
        aspectRatio: declarations.ratio || '1/1',
        objectFit: declarations.fit || 'cover',
    });
}