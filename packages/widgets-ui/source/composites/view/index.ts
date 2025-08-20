import {
    Color,
    declarationExplodes,
    ICommonAttributes,
    IWidgetDeclaration,
    MainWidget, Section,
    Style
} from "@protorians/widgets";
import {ThemeViewOptions} from "./type.js";
import {$ui} from "@protorians/core";
import {ITheme} from "../../types/index.js";


export function ThemeView(
    theme: ITheme,
    declarations: IWidgetDeclaration<HTMLElement, ThemeViewOptions & ICommonAttributes>
) {
    const {
        declaration,
        extended
    } = declarationExplodes<IWidgetDeclaration<HTMLElement, ThemeViewOptions & ICommonAttributes>, ThemeViewOptions>(declarations,
        ['direction', 'helmet', 'navbar', 'bottomNavbar', 'footer', 'scrollable', 'title', 'styles']
    )
    const scrollable = (typeof extended.scrollable == 'undefined')
        ? 'auto' : (extended.scrollable ? 'auto' : 'hidden')

    declaration.style = Style({})
        .merge({
            display: 'flex',
            flexDirection: extended.direction?.toString() || 'column',
            // color: Color.text,
            // backgroundColor: Color.tint_50,
            width: '100%',
            height: '100%',
            minHeight: '100%',
            maxWidth: '100vw',
            maxHeight: '100vh',
            overflowX: 'hidden',
            overflowY: scrollable,
        })
        .merge(theme.stylesheet.root)
        .merge(extended.styles?.widget)

    declaration.children = [
        extended.helmet
            ?.construct(({widget}) => {
                widget.attribute({
                    'role': 'banner',
                })
            }).style(extended.styles?.helmet || {}),
        extended.navbar
            ?.construct(({widget}) => {
                widget.attribute({
                    'role': 'navbar',
                })
            }).style(extended.styles?.navbar || {}),
        MainWidget({
            style: Style({
                flex: '1 1 auto',
                display: 'flex',
                flexDirection: 'column',
            }).merge(extended.styles?.main),
            children: declaration.children
        }).construct(({widget}) => {
            widget.attribute({
                'role': 'main',
            })
        }),
        extended.bottomNavbar
            ?.construct(({widget}) => {
                widget.attribute({
                    'role': 'navbar',
                })
            }).style(extended.styles?.bottomNavbar || {}),
        extended.footer
            ?.style({
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start'
            }).construct(({widget}) => {
            widget.attribute({
                'role': 'contentinfo',
            }).style(extended.styles?.footer || {})
        }),
    ];

    return Section({
        role: 'region',
        ariaLabel: extended.title || 'View page section',
        ...declaration
    })
        .mount(({widget}) => {
            $ui('body').forEach((e) =>
                e.style.backgroundColor = `${widget.stylesheet.declarations.backgroundColor?.toString() || Color.tint}`
            )
        })
}