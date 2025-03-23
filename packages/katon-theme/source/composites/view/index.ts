import {
    Color,
    declarationExplodes,
    ICommonAttributes,
    IWidgetDeclaration,
    MainFrame, Section,
    Style
} from "@protorians/widgets";
import {KatonViewProps} from "./type.js";
import {$ui} from "@protorians/core";


export function KatonView(
    declarations: IWidgetDeclaration<HTMLElement, KatonViewProps & ICommonAttributes>
) {
    const {
        declaration,
        extended
    } = declarationExplodes<IWidgetDeclaration<HTMLElement, KatonViewProps & ICommonAttributes>, KatonViewProps>(declarations,
        ['direction', 'helmet', 'navbar', 'bottomNavbar', 'footer', 'scrollable']
    )
    const scrollable = (typeof extended.scrollable == 'undefined')
        ? 'auto' : (extended.scrollable ? 'auto' : 'hidden')

    declaration.style = Style({})
        .merge({
            display: 'flex',
            flexDirection: extended.direction?.toString() || 'column',
            color: Color.text,
            backgroundColor: Color.tint,
            width: '100%',
            height: '100%',
            minHeight: '100%',
            maxWidth: '100vw',
            maxHeight: '100vh',
            overflowX: 'hidden',
            overflowY: scrollable,
        })

    declaration.children = [
        extended.helmet?.construct(({widget}) => {
            widget.attribute({
                'role': 'banner',
            })
        }),
        extended.navbar?.construct(({widget}) => {
            widget.attribute({
                'role': 'navbar',
            })
        }),
        MainFrame({
            style: {
                flex: '1 1 auto',
                display: 'flex',
                flexDirection: 'column',
            },
            children: declaration.children
        }).construct(({widget}) => {
            widget.attribute({
                'role': 'main',
            })
        }),
        extended.bottomNavbar?.construct(({widget}) => {
            widget.attribute({
                'role': 'navbar',
            })
        }),
        extended.footer?.style({
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start'
        }).construct(({widget}) => {
            widget.attributeLess({
                'role': 'contentinfo',
            })
        }),
    ];

    return Section(declaration)
        .mount(({widget}) => {
            $ui('body').forEach((e) =>
                e.style.backgroundColor = `${widget.stylesheet.declarations.backgroundColor?.toString() || Color.tint}`
            )
        })
}