import {
    Column, createRef,
    declarationExplodes,
    ICommonAttributes,
    IWidgetDeclaration, IWidgetNode, Row, Stack, Style,
} from "@protorians/widgets";
import {IThemeAlertCapability, IThemeAlertExtended, ThemeAlertProps} from "./type.js";
import {ITheme} from "../../types/index.js";
import {createCapability} from "@protorians/core";
import {AlertState} from "./enum.js";


export function ThemeAlert(
    theme: ITheme,
    declarations: IWidgetDeclaration<HTMLElement, ICommonAttributes & ThemeAlertProps>
): IWidgetNode<any, any> | undefined {

    const contentRef = createRef();

    const {
        declaration,
        extended
    } = declarationExplodes<IWidgetDeclaration<HTMLElement, ICommonAttributes & ThemeAlertProps>, ThemeAlertProps>(
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
            'collapsable',
            'collapseSize',
            'mounted',
            'unmounted',
        ]
    );
    extended.collapseSize = extended.collapsable ? extended.collapseSize || 80 : undefined;

    declaration.style = Style({})
        .merge(declaration.style)
        .merge({
            display: 'flex',
            flexDirection: extended.direction || 'row',
            paddingX: 1,
            paddingY: .8,
            gap: 1,
        })

    const updateState = (state: AlertState) => {
        instance.state = state;
        contentRef.current?.attributeLess({'ui:state': `${state}`})
    }

    const {capability, current: instance} = createCapability<IThemeAlertCapability, IThemeAlertExtended>({
        methods: ['show', 'destroy', 'toggle', 'hide', 'expand', 'collapse',]
    });

    instance.state = AlertState.Hidden;

    capability.apply('show', () => {
        widget.style({display: 'flex'})
        if (extended.animateIn && widget)
            theme.animate(widget, extended.animateIn).play()
                .signal.listen('complete', () => {
                updateState(AlertState.Shown);
            })
        return instance;
    })

    capability.apply('hide', () => {
        if (extended.animateOut && widget)
            theme.animate(widget, extended.animateOut).play()
                .signal.listen('complete', () => {
                widget.style({display: 'none'});
                updateState(AlertState.Hidden);
            })
        return instance;
    })

    capability.apply('destroy', () => {
        if (extended.animateOut && widget)
            theme.animate(widget, extended.animateOut).play()
                .signal.listen('complete', () => {
                widget.remove()
                updateState(AlertState.Destroyed);
            })
        return instance;
    })

    capability.apply('expand', () => {
        if (widget && extended.collapsable && contentRef.current) {
            contentRef.current.style({
                height: `${contentRef.current.clientElement!.scrollHeight}px`,
            })
            updateState(AlertState.Expand);
        }
        return instance;
    })

    capability.apply('collapse', () => {
        if (widget && extended.collapsable && contentRef.current) {
            contentRef.current.style({
                height: `${extended.collapseSize}px`,
            })
            updateState(AlertState.Collapse);
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
                    overflowY: extended.collapsable ? 'hidden' : 'initial',
                    height: extended.collapsable ? '80px' : 'auto',
                },
                signal: {
                    mount: () => updateState(instance.state)
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