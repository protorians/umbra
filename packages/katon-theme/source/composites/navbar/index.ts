import {TextureStylesheet} from "../../stylesheet.js";
import {type KatonNavbarProps} from "./type.js";
import {
    Color,
    declarationExplodes,
    type ICommonAttributes,
    type IWidgetDeclaration,
    type IWidgetNode,
    Row,
    Style,
    WidgetElevation
} from "@protorians/widgets";
import {resolveColoringLayer} from "../../common/index.js";
import {ITheme, LayerVariant} from "@widgetui/core";


export function KatonNavbar(
    theme: ITheme,
    declarations: IWidgetDeclaration<HTMLElement, KatonNavbarProps & ICommonAttributes>
): IWidgetNode<any, any> {

    const {
        declaration,
        extended
    } = declarationExplodes<IWidgetDeclaration<HTMLElement, KatonNavbarProps & ICommonAttributes>, KatonNavbarProps>(
        declarations, ['variant', 'fixed', 'children']
    )

    const coloring = resolveColoringLayer(extended.variant || LayerVariant.Normal)
    const isNude = (
        extended.variant == LayerVariant.Text ||
        extended.variant == LayerVariant.Link
    );
    const fixed = typeof extended.fixed === 'undefined' ? true : extended.fixed;
    const spacing = theme.settings.spacing || '.5rem';

    declaration.style = Style({
        ...TextureStylesheet.declarations
    })
        .merge(declaration.style)
        .merge({
            boxShadow: isNude ? 'none' : `${TextureStylesheet.declarations.boxShadow}`,
            position: fixed ? 'fixed' : 'sticky',
            display: 'flex',
            margin: spacing,
            bottom: `${fixed ? 0 : spacing}`,
            left: '0',
            right: '0',
            justifyContent: "space-around",
            alignItems: 'space-around',
            flexDirection: 'row',
            backdropFilter: 'blur(var(--widget-blurred, 1.6rem))',
            color: Color[coloring.fore || 'text'],
            borderColor: Color[coloring.edge || 'tint-100-a8'],
            backgroundColor: Color[`${coloring.back || 'tint-500-a8'}`],
            scrollbarWidth: 'none',
            width: '100%',
            maxWidth: `calc(100vw - (2 * ${spacing}))`,
            minHeight: '32px',
        })

    declaration.children = extended.children.map(btn => {
        return btn.style({
            display: 'flex',
            flexDirection: 'column',
            // flex: '1 1 auto',
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
        });
    })

    declaration.elevate = WidgetElevation.Float;

    return Row(declaration as IWidgetDeclaration<HTMLElement, ICommonAttributes>)
}