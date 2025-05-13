import {
    Color,
    declarationExplodes,
    ICommonAttributes,
    IWidgetDeclaration,
    Layer,
    Style
} from "@protorians/widgets";
import {ThemeProgressProps} from "./type.js";
import {createState} from "@protorians/widgets";
import {ITheme} from "../../types/index.js";
import {LayerVariant} from "../../enums.js";

export function ThemeProgress(
    theme: ITheme,
    declarations: Omit<IWidgetDeclaration<HTMLElement, ThemeProgressProps & ICommonAttributes>, 'children'>
) {

    const {
        declaration,
        extended
    } = declarationExplodes<Omit<IWidgetDeclaration<HTMLElement, ThemeProgressProps & ICommonAttributes>, 'children'>, ThemeProgressProps>(
        declarations, ['variant', 'size', 'initiate']
    )
    const variant = extended.variant || LayerVariant.Normal
    const coloring = theme[extended.outline
        ? 'resolveColoringLayerOutlined'
        : 'resolveColoringLayer'](variant);
    const size = extended.size || .5;
    const percentState = createState<number>(0)
    const variantState = createState<LayerVariant>(variant)

    declaration.style = Style({
        ...theme.stylesheets.declarations
    })
        .merge(declaration.style)
        .merge({
            position: 'relative',
            height: size,
            width: '100%',
            borderWidth: extended.outline ? 'var(--widget-border-width, 2px)' : '0',
            borderRadius: 'var(--widget-radius)',
            color: Color[`${coloring.fore || 'tint'}`],
            borderColor: Color[`${coloring.edge || 'tint-200-a1'}`],
            backgroundColor: Color[`${coloring.back || 'tint-200-a4'}`],
            transition: 'background-color, color, border-color',
            transitionDuration: '300ms',
            transitionTimingFunction: 'ease-in-out',
        })

    return Layer({
        ...declaration,
        children: [
            Layer({
                style: {
                    position: 'absolute',
                    width: '0%',
                    height: size,
                    overflow: 'hidden',
                    borderRadius: 'var(--widget-radius)',
                    backgroundColor: Color.text,
                    minWidth: '1%',
                    maxWidth: '100%',
                    transition: 'width',
                    transitionDuration: '300ms',
                    transitionTimingFunction: 'ease-in-out',
                },
                signal: {
                    mount: ({widget, root}) => {
                        percentState.effect((percent) => {
                            widget.style({
                                width: `${percent}%`,
                            })
                        })
                        if (extended.initiate)
                            extended.initiate({
                                root,
                                widget,
                                percent: percentState,
                                color: variantState
                            })
                    }
                },
                children: []
            }),
        ]
    }).mount(({widget}) => {
        variantState.effect((variant) => {
            const coloring = theme[extended.outline
                ? 'resolveColoringLayerOutlined'
                : 'resolveColoringLayer'](variant);
            widget.style({
                color: Color[`${coloring.fore || 'tint'}`],
                borderColor: Color[`${coloring.edge || 'tint-200-a1'}`],
                backgroundColor: Color[`${coloring.back || 'tint-200-a4'}`],
            })
        })
    })
}