import {
    Color,
    declarationExplodes,
    ICommonAttributes,
    IWidgetDeclaration,
    Layer,
    Style
} from "@protorians/widgets";
import {KatonLayerProps} from "./type.js";
import {TextureStylesheet} from "../../stylesheet.js";
import {resolveColoringLayer} from "../../common/index.js";
import {LayerVariant} from "@widgetui/core";

export function KatonLayer(
    declarations: IWidgetDeclaration<HTMLElement, KatonLayerProps & ICommonAttributes>
) {

    const {
        declaration,
        extended
    } = declarationExplodes<IWidgetDeclaration<HTMLElement, KatonLayerProps & ICommonAttributes>, KatonLayerProps>(
        declarations, ['variant']
    )
    const coloring = resolveColoringLayer(extended.variant || LayerVariant.Normal)

    declaration.style = Style({
        ...TextureStylesheet.declarations
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