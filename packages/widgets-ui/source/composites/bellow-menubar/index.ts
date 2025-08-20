import {type ThemeBellowMenuBarOptions} from "./type.js";
import {
    Color,
    declarationExplodes,
    type ICommonAttributes,
    type IWidgetDeclaration,
    type IWidgetNode,
    Style,
    ObjectElevation, Navbar, Row
} from "@protorians/widgets";
import {ITheme} from "../../types/index.js";
import {LayerVariant} from "../../enums.js";


export function ThemeBellowMenuBar(
    theme: ITheme,
    declarations: IWidgetDeclaration<HTMLElement, ThemeBellowMenuBarOptions & ICommonAttributes>
): IWidgetNode<any, any> {

    const {
        declaration,
        extended
    } = declarationExplodes<IWidgetDeclaration<HTMLElement, ThemeBellowMenuBarOptions & ICommonAttributes>, ThemeBellowMenuBarOptions>(
        declarations, ['variant', 'fixed', 'children', 'start', 'end', 'direction', 'styles'],
    )

    const coloring = theme.coloringResolves(extended.variant || LayerVariant.Normal)
    const isNude = (
        extended.variant == LayerVariant.Text ||
        extended.variant == LayerVariant.Link
    );
    const fixed = typeof extended.fixed === 'undefined' ? true : extended.fixed;
    const spacing = theme.settings.spacing || '.5rem';

    declaration.style = Style({
        ...theme.stylesheet.texture.declarations
    })
        .merge({
            width: '100%',
            maxWidth: `calc(100vw - (2 * ${spacing}))`,
            minHeight: '32px',
            margin: spacing,
        })
        .merge(declaration.style)
        .merge({
            boxShadow: isNude ? 'none' : `${theme.stylesheet.texture.declarations.boxShadow}`,
            position: fixed ? 'fixed' : 'sticky',
            display: 'flex',
            bottom: `${fixed ? 0 : spacing}`,
            left: '0',
            right: '0',
            justifyContent: "space-around",
            alignItems: 'space-around',
            flexDirection: extended.direction || 'row',
            backdropFilter: 'blur(var(--widget-blurred, 1.6rem))',
            color: Color[coloring.fore || 'text'],
            borderColor: Color[coloring.edge || 'tint-100-a8'],
            backgroundColor: Color[`${coloring.back || 'tint-500-a8'}`],
            scrollbarWidth: 'none',
        })
        .merge(extended.styles?.widget)

    const children = [
        extended.start,
        Row({
            style: Style({
                flex: '1 1 auto',
            }),
            children: extended.children
                .map(btn => {
                    return btn.style({
                        display: 'flex',
                        flexDirection: 'column',
                        flex: '1 1 auto',
                        padding: '0',
                        alignSelf: 'normal',
                        justifyContent: 'center',
                        alignItems: 'center',
                        '& > i': Style({
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            fontSize: 1.3,
                            flex: '1 1 auto',
                            lineHeight: '0',
                        }),
                        '& > span': Style({
                            opacity: '.5',
                            // paddingY: .3,
                        })
                    }).style(Style({}).merge(extended.styles?.item));
                })
        }),
        extended.end,
    ]

    declaration.elevate = ObjectElevation.Float;

    return Navbar({...declaration, children} as IWidgetDeclaration<HTMLElement, ICommonAttributes>)
}