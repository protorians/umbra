import {
    Color,
    declarationExplodes,
    ICommonAttributes,
    IWidgetDeclaration,
    Layer,
    Style
} from "@protorians/widgets";
import {ThemeLayerProps} from "./type.js";
import {ITheme} from "../../types/index.js";
import {LayerVariant} from "../../enums.js";

export function ThemeLayer(
    theme: ITheme,
    declarations: IWidgetDeclaration<HTMLElement, ThemeLayerProps & ICommonAttributes>
) {

    const {
        declaration,
        extended
    } = declarationExplodes<IWidgetDeclaration<HTMLElement, ThemeLayerProps & ICommonAttributes>, ThemeLayerProps>(
        declarations, ['variant']
    )
    const coloring = theme.coloring(extended.variant || LayerVariant.Normal)

    declaration.style = Style({
        ...theme.stylesheets.declarations
    })
        .merge(declaration.style)
        .merge({
            color: Color[`${coloring.fore || 'tint'}`],
            borderColor: Color[`${coloring.edge || 'tint-200-a1'}`],
            backgroundColor: Color[`${coloring.back || 'tint-200-a4'}`],
        })

    declaration.children = declaration.children || []

    return Layer(declaration)
}