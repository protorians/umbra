import {type ThemeNavbarOptions} from "./type.js";
import {
    declarationExplodes,
    type ICommonAttributes,
    type IWidgetDeclaration,
    type IWidgetNode,
    Style,
    Navbar,
    Row,
    createRef, Layer,
} from "@protorians/widgets";
import {ITheme} from "../../types/index.js";


export function ThemeNavbar(
    theme: ITheme,
    declarations: IWidgetDeclaration<HTMLElement, ThemeNavbarOptions & ICommonAttributes>
): IWidgetNode<any, any> {

    const {
        declaration,
        extended
    } = declarationExplodes<IWidgetDeclaration<HTMLElement, ThemeNavbarOptions & ICommonAttributes>, ThemeNavbarOptions>(
        declarations, ['children', 'direction', 'indicators', 'styles', 'separator'],
    )

    declaration.style = Style({
        flex: '1 1 auto',
    })
        .merge(declaration.style)
        .merge(extended.styles?.widget)
        .merge({
            position: 'relative',
            display: "flex",
            flexDirection: extended.direction === 'row' ? 'column' : 'row',
        })

    const drawerRef = createRef();
    const children = [
        Row({
            style: Style({
                position: 'relative',
                display: 'flex',
                flexDirection: extended.direction || 'row',
                gap: theme.settings.gap,
            }),
            children:
                extended.children
                    .map(btn => {
                        const indicatorRef = createRef();

                        const open = () => {
                            indicatorRef.current?.clear().content(extended.indicators?.up?.clone())
                            drawerRef.current?.style({display: 'flex'})
                            status = true
                        }

                        const close = () => {
                            indicatorRef.current?.clear().content(extended.indicators?.down?.clone())
                            drawerRef.current?.style({display: 'none'})
                            status = false
                        }

                        const toggle = () => {
                            if (status) close()
                            else open()
                        }
                        let status: boolean = false

                        return Row({
                            style: Style({
                                alignItems: 'center',
                                gap: `calc(var(--widget-gap) * .5)`,
                            }).merge(extended.styles?.item),
                            children: [
                                btn.icon,
                                btn.trigger
                                    .attribute({
                                        tabindex: 0,
                                    })
                                    .listen('click', () => toggle())
                                    .listen('blur', () => close())
                                    .style(
                                        Style({
                                            display: 'flex',
                                            flexDirection: 'column',
                                            padding: '0',
                                            alignSelf: 'normal',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            fontSize: 'medium',
                                            cursor: !btn.children ? 'pointer' : 'default',
                                            '& > i': Style({
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'flex-end',
                                                alignItems: 'center',
                                                fontSize: 'small',
                                                flex: '1 1 auto',
                                                lineHeight: '0',
                                            }),
                                            '& > span': Style({
                                                fontSize: 'inherit',
                                                // paddingY: .3,
                                            })
                                        })
                                    ),
                                Row({
                                    ref: indicatorRef,
                                    children: btn.children ? extended.indicators?.down?.clone() : undefined,
                                })
                            ]
                        })
                    }),
        }),
        Layer({
            ref: drawerRef,
            style: Style({
                position: 'absolute',
                top: '120%',
                insetInline: '0',
                display: 'none',
                maxWidth: '100vw',
                maxHeight: '50vh',
                padding: 1,

                backgroundColor: 'red',
                height: '50vh',
            }),
            children: undefined
        })
    ];

    return Navbar({...declaration, children} as IWidgetDeclaration<HTMLElement, ICommonAttributes>)
}