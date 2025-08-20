import {
    Column, createRef,
    declarationExplodes,
    ICommonAttributes,
    IWidgetDeclaration, IWidgetNode, Row, Style,
} from "@protorians/widgets";
import {IThemeAlertMethods, IThemeAlertProperties, ThemeAlertOptions} from "./type.js";
import {ITheme} from "../../types/index.js";
import {createCapability} from "@protorians/core";
import {AlertStatus} from "./enum.js";
import {BoxStyle} from "../../styles/box.js";
import {LayerVariant} from "../../enums.js";


export function ThemeAlert(
    theme: ITheme,
    declarations: IWidgetDeclaration<HTMLElement, ICommonAttributes & ThemeAlertOptions>
): IWidgetNode<any, any> | undefined {

    const contentRef = createRef();

    const {
        declaration,
        extended
    } = declarationExplodes<IWidgetDeclaration<HTMLElement, ICommonAttributes & ThemeAlertOptions>, ThemeAlertOptions>(
        declarations, [
            'variant',
            'direction',
            'children',
            'icon',
            'helmet',
            'animateIn',
            'animateOut',
            'actions',
            'collapsible',
            'collapseSize',
            'mounted',
            'unmounted',
        ]
    );
    extended.collapseSize = extended.collapsible ? extended.collapseSize || 80 : undefined;

    const variant = declarations.variant || LayerVariant.Normal;
    const coloring = theme.coloringResolves(variant);

    declaration.style = Style({})
        .merge(theme.stylesheet.texture)
        .merge(declaration.style)
        .merge({
            display: 'flex',
            flexDirection: extended.direction || 'row',
            paddingX: 1,
            paddingY: .8,
            gap: 1,
        })

    const updateState = (state: AlertStatus) => {
        instance.status = state;
        contentRef.current?.attributeLess({'ui:state': `${state}`})
    }

    const {capability, current: instance} = createCapability<IThemeAlertMethods, IThemeAlertProperties>({
        methods: ['show', 'destroy', 'toggle', 'hide', 'expand', 'collapse',]
    });

    instance.status = AlertStatus.Hidden;

    capability.apply('show', () => {
        widget.style({display: 'flex'})
        if (extended.animateIn && widget)
            theme.animate(widget, extended.animateIn).play()
                .signal.listen('complete', () => {
                updateState(AlertStatus.Shown);
            })
        else {
            updateState(AlertStatus.Shown);
        }
        return instance;
    })

    capability.apply('hide', () => {
        if (extended.animateOut && widget)
            theme.animate(widget, extended.animateOut).play()
                .signal.listen('complete', () => {
                widget.style({display: 'none'});
                updateState(AlertStatus.Hidden);
            })
        else {
            widget.style({display: 'none'});
            updateState(AlertStatus.Hidden);
        }
        return instance;
    });


    capability.apply('destroy', () => {
        if (extended.animateOut && widget)
            theme.animate(widget, extended.animateOut).play()
                .signal.listen('complete', () => {
                widget.remove()
                updateState(AlertStatus.Destroyed);
            })
        else {
            widget.remove()
            updateState(AlertStatus.Destroyed);
        }
        return instance;
    });

    capability.apply('expand', () => {
        if (widget && extended.collapsible && contentRef.current) {
            contentRef.current.style({
                height: `${contentRef.current.clientElement!.scrollHeight}px`,
            })
            updateState(AlertStatus.Expand);
        }
        return instance;
    });

    capability.apply('collapse', () => {
        if (widget && extended.collapsible && contentRef.current) {
            contentRef.current.style({
                height: `${extended.collapseSize}px`,
            })
            updateState(AlertStatus.Collapse);
        }
        return instance;
    })

    const widget = Column({
        ...declaration,
        style: Style({}).merge(BoxStyle.Container(theme, coloring))
            .merge({
                maxWidth: undefined,
            }),
        children: [
            Row({
                style: BoxStyle.Content(),
                children: [
                    declarations.icon ? Row({
                        style: BoxStyle.Icon(),
                        children: declarations.icon,
                    }) : undefined,
                    Column({
                        style: {
                            gap: 0,
                            flex: '1 1 auto',
                        },
                        children: [
                            Row({
                                style: {
                                    paddingTop: 1,
                                    paddingX: 1,
                                    opacity: '.5',
                                },
                                children: extended.helmet,
                            }),
                            Column({
                                ref: contentRef,

                                signal: {
                                    mount: () => updateState(instance.status)
                                },
                                style: {
                                    paddingX: 1,
                                    paddingBottom: 1,

                                    flex: '1 1 auto',
                                    transitionProperty: `all`,
                                    transitionTimingFunction: theme.settings.transitionTiming || 'ease-out',
                                    transitionDuration: theme.settings.transitionDuration || '360ms',
                                    overflowX: 'hidden',
                                    overflowY: extended.collapsible ? 'hidden' : 'initial',
                                    height: extended.collapsible ? '80px' : 'auto',
                                },
                                children: extended.children
                            }),
                        ]
                    }),
                ]
            }),
            extended.actions?.length
                ? Row({
                    style: BoxStyle.Buttons(theme, coloring),
                    children: extended.actions?.map(action => {
                        return action.trigger
                            .listen('click', () => action.callable(instance))
                    })
                })
                : undefined,
        ]
    });

    widget.signal.listen('mount', () => {
        instance.show();
        (extended.mounted && extended.mounted(instance));
    })
    widget.signal.listen('unmount', () => (extended.unmounted && extended.unmounted(instance)))

    return widget;
}