import {TextureStylesheet} from "../../stylesheet.js";
import {type KatonHelmetProps} from "./type.js";
import {
    AligningDirection,
    Color, Column,
    declarationExplodes,
    HeaderFrame,
    type ICommonAttributes,
    type IWidgetDeclaration,
    type IWidgetNode, Row,
    Style, WidgetElevation
} from "@protorians/widgets";
import {resolveColoringLayer} from "../../common/index.js";
import {LayerVariant} from "@widgetui/core";
import {Callable} from "@protorians/core";


export function KatonHelmet(
    declarations: IWidgetDeclaration<HTMLElement, KatonHelmetProps & ICommonAttributes>
): IWidgetNode<any, any> {

    const {
        declaration,
        extended
    } = declarationExplodes<IWidgetDeclaration<HTMLElement, KatonHelmetProps & ICommonAttributes>, KatonHelmetProps>(
        declarations, ['variant', 'direction', 'childrenStyle', 'start', 'end', 'fixed']
    )

    const coloring = resolveColoringLayer(extended.variant || LayerVariant.Normal)
    const isNude = (
        extended.variant == LayerVariant.Text ||
        extended.variant == LayerVariant.Link
    );
    const fixed = typeof extended.fixed === 'undefined' ? true : extended.fixed;
    const isColumn = (extended.direction === AligningDirection.Column || extended.direction === AligningDirection.ColumnReverse)

    declaration.style = Style({
        ...TextureStylesheet.declarations
    })
        .merge(declaration.style)
        .merge({
            boxShadow: isNude ? 'none' : `${TextureStylesheet.declarations.boxShadow}`,
            position: fixed ? 'fixed' : 'sticky',
            display: 'flex',
            top: '0',
            borderRadius: '0',
            overflow: 'hidden',
            flexDirection: extended.direction?.toString() || 'column',
            backdropFilter: 'blur(var(--widget-blurred, 1.6rem))',
            color: Color[coloring.fore || 'text'],
            backgroundColor: Color[`${coloring.back || 'tint-a8'}`],
            borderColor: Color[`${coloring.edge || 'tint-100-a8'}`],
            borderTopWidth: '0',
            borderLeftWidth: '0',
            borderRightWidth: '0',
            scrollbarWidth: 'none',
            '--ms-overflow-style': 'hidden',
            '&::-webkit-scrollbar': Style({
                display: 'none',
                background: 'transparent'
            }),
        })

    if (isColumn) {
        declaration.style.merge({
            height: '100%',
            maxHeight: `100vh`,
            minWidth: '48px',
            alignItems: 'center',
        })
    }

    if (!isColumn) {
        declaration.style.merge({
            width: '100%',
            maxWidth: `100vw`,
            minHeight: '48px',
        })
    }

    declaration.children = [
        extended.start?.style({
            display: 'flex',
            flexDirection: 'inherit',
            justifyContent: 'flex-start'
        }),
        (isColumn ? Column : Row)({
            style: {
                ...(extended.childrenStyle || {}),
                flex: '1 1 auto',
            },
            children: declaration.children
        }),
        extended.end?.style({
            display: 'flex',
            flexDirection: 'inherit',
            justifyContent: 'flex-end'
        }),
    ];

    declaration.elevate = WidgetElevation.Float;

    return HeaderFrame(declaration)
        .mount(({widget}) => {
            Callable.safe(() =>
                widget.style({
                    '& + main': Style({
                        paddingTop: `${widget.measure.height}px`,
                    }),
                }))
        })
}