import {
    Column, createRef,
    declarationExplodes,
    ICommonAttributes,
    IWidgetDeclaration, IWidgetNode, Row, Stack, Style,
} from "@protorians/widgets";
import {IThemeAlertMethods, IThemeAlertProperties, ThemeAlertOptions} from "./type.js";
import {ITheme} from "../../types/index.js";
import {createCapability} from "@protorians/core";
import {AlertStatus} from "./enum.js";


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
            'outline',
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

    declaration.style = Style({})
        .merge(theme.stylesheets)
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

    const widget = theme.Layer({
        ...declaration,
        variant: extended.variant,
        outline: extended.outline,
        children: [
            Row({
                children: [
                    Row({
                        style: Style({
                            flex: '1 1 auto',
                        }),
                        children: extended.icon,
                    }),
                ]
            }),
            Column({
                ref: contentRef,
                style: {
                    flex: '1 1 auto',
                    transitionProperty: `all`,
                    transitionTimingFunction: theme.settings.transitionTiming || 'ease-out',
                    transitionDuration: theme.settings.transitionDuration || '360ms',
                    overflowX: 'hidden',
                    overflowY: extended.collapsible ? 'hidden' : 'initial',
                    height: extended.collapsible ? '80px' : 'auto',
                },
                signal: {
                    mount: () => updateState(instance.status)
                },
                children: [
                    extended.helmet,
                    extended.children,
                ],
            }),
            Stack({
                style: Style({
                    gap: theme.settings.gap,
                }),
                children: extended.actions?.map(action => {
                    return action.trigger
                        .listen('click', () => action.callable(instance))
                }),
            })
        ]
    }) as IWidgetNode<any, any>;

    widget.signal.listen('mount', () => {
        instance.show();
        (extended.mounted && extended.mounted(instance));
    })
    widget.signal.listen('unmount', () => (extended.unmounted && extended.unmounted(instance)))

    return widget;
}