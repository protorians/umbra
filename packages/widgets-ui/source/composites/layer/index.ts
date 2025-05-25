import {
    Color,
    declarationExplodes,
    ICommonAttributes,
    IWidgetDeclaration,
    Layer, Stack,
    Style
} from "@protorians/widgets";
import {ThemeLayerOptions} from "./type.js";
import {ITheme} from "../../types/index.js";
import {LayerVariant} from "../../enums.js";
import {createMultipleLayerGradient} from "../../utilities/index.js";

export function ThemeLayer(
    theme: ITheme,
    declarations: IWidgetDeclaration<HTMLElement, ThemeLayerOptions & ICommonAttributes>
) {

    const {
        declaration,
        extended
    } = declarationExplodes<IWidgetDeclaration<HTMLElement, ThemeLayerOptions & ICommonAttributes>, ThemeLayerOptions>(
        declarations, ['variant', 'outline', 'blurred'],
    );
    const variant = extended.variant || LayerVariant.Normal;
    const coloring = theme[extended.outline ? 'outlineColoringResolves' : 'coloringResolves'](variant);
    const isNude = !coloring.back;

    declaration.style = Style({
        ...theme.stylesheets.declarations
    })
        .merge(declaration.style)
        .merge({
            position: "relative",
            zIndex: '1',
        })

    declaration.children = declaration.children || [];

    declaration.style = Style({
        borderWidth: extended.outline ? 'var(--widget-border-width, 2px)' : '0',
        color: Color[`${coloring.fore || 'tint'}`],
        borderColor: Color[`${coloring.edge || 'tint-200-a1'}`],
        backgroundColor: coloring.back ? Color[coloring.back] : 'transparent',
        borderRadius: theme.settings.radiusMin || '0',
        boxShadow: isNude ? 'none' : `${theme.stylesheets.declarations.boxShadow}`,
        flex: '1 1 auto',
    }).merge(declaration.style)

    return Stack({
        style: {
            position: "relative",
            flex: '1 1 auto',
            width: '100%',
            flexDirection: 'column',
        },
        children: [
            Layer({
                style: {
                    position: 'absolute',
                    zIndex: '0',
                    inset: '0',
                    borderRadius: 'inherit',
                    backgroundColor: 'transparent',
                    overflow: 'hidden',
                },
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