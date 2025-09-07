import { Color, declarationExplodes, Layer, Stack, Style } from "@protorians/widgets";
import { LayerVariant } from "../../enums.js";
import { createMultipleLayerGradient } from "../../utilities/index.js";
export function ThemeLayer(theme, declarations) {
    const { declaration, extended } = declarationExplodes(declarations, ['variant', 'outline', 'blurred', 'styles']);
    const variant = extended.variant || LayerVariant.Normal;
    const coloring = theme[extended.outline ? 'outlineColoringResolves' : 'coloringResolves'](variant);
    declaration.children = declaration.children || [];
    declaration.style = Style({
        position: "relative",
        zIndex: '1',
        flex: '1 1 auto',
        color: Color[`${coloring.fore || 'tint'}`],
    }).merge(declaration.style)
        .merge(extended.styles?.fore);
    return Stack({
        style: Style({
            position: "relative",
            flexDirection: 'column',
            ...theme.stylesheet.texture.declarations,
            color: Color[`${coloring.fore}`],
            borderColor: coloring.edge ? Color[`${coloring.edge}`] : 'transparent',
            backgroundColor: coloring.back ? Color[coloring.back] : 'transparent',
        }).merge(extended.styles?.widget),
        children: [
            Layer({
                style: Style({
                    position: 'absolute',
                    zIndex: '0',
                    inset: '0',
                    borderRadius: 'inherit',
                    backgroundColor: 'transparent',
                    overflow: 'hidden',
                }).merge(extended.styles?.fore),
                children: extended.blurred ?
                    createMultipleLayerGradient(Array.isArray(extended.blurred) ? extended.blurred : [])
                    : undefined,
            }),
            Layer({
                ...declaration,
            })
        ]
    });
}
