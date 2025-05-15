import {
    declarationExplodes,
    ICommonAttributes,
    IWidgetDeclaration,
    IWidgetNode,
    Stack,
    Style
} from "@protorians/widgets";
import {ThemeAspectRatioProps} from "./type.js";


export function ThemeAspectRatio(
    declarations: IWidgetDeclaration<HTMLElement, ThemeAspectRatioProps & ICommonAttributes>
): IWidgetNode<any, any> | undefined {

    const {
        declaration,
        extended
    } = declarationExplodes<IWidgetDeclaration<HTMLElement, ThemeAspectRatioProps & ICommonAttributes>, ThemeAspectRatioProps>(
        declarations, ['ratio', 'fit', 'children']
    )

    declaration.style = Style({
        aspectRatio: `${extended.ratio || '1/1'}`,
        objectFit: extended.fit || 'cover',
    }).merge(declarations.style);

    return Stack({
        ...(declaration as any),
        children: declaration.children
    } as IWidgetDeclaration<HTMLElement, ICommonAttributes>);
}