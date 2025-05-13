import {type ThemeHelmetProps} from "./type.js";
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
import {Callable} from "@protorians/core";
import {ITheme} from "../../types/index.js";
import {LayerVariant} from "../../enums.js";


export function ThemeHelmet(
    theme: ITheme,
    declarations: IWidgetDeclaration<HTMLElement, ThemeHelmetProps & ICommonAttributes>
): IWidgetNode<any, any> {

    const {
        declaration,
        extended
    } = declarationExplodes<IWidgetDeclaration<HTMLElement, ThemeHelmetProps & ICommonAttributes>, ThemeHelmetProps>(
        declarations, ['variant', 'direction', 'childrenStyle', 'start', 'end', 'fixed']
    )

    const coloring = theme.coloring(extended.variant || LayerVariant.Normal)
    const isNude = (
        extended.variant == LayerVariant.Text ||
        extended.variant == LayerVariant.Link
    );
    const fixed = typeof extended.fixed === 'undefined' ? true : extended.fixed;
    const isColumn = (extended.direction === AligningDirection.Column || extended.direction === AligningDirection.ColumnReverse)

    declaration.style = Style({
        ...theme.stylesheets.declarations
    })
        .merge(declaration.style)
        .merge({
            boxShadow: isNude ? 'none' : `${theme.stylesheets.declarations.boxShadow}`,
            position: fixed ? 'fixed' : 'sticky',
            display: 'flex',
            top: '0',
            borderRadius: '0',
            overflow: 'hidden',
            flexDirection: extended.direction?.toString() || 'column',
            backdropFilter: `blur(${theme.settings.blurred || '1.6rem'})`,
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