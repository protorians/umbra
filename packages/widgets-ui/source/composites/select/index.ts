import {Callable, createCapability, TreatmentQueueStatus, WalkableAction, WalkableList} from "@protorians/core";
import {
    IThemeSelectOption,
    IThemeSelectMethods,
    IThemeSelectOptions,
    IThemeSelectProperties,
    IThemeSelectValue
} from "./type.js";
import {Column, createRef, Displaying, IWidgetNode, Layer, Row, Style, Text} from "@protorians/widgets";
import {ThemeSelectStatus} from "./enum.js";
import {Positioning} from "../../supports/positioning.js";


export function ThemeSelect(
    {
        options,
        value,
        multiple,
        arrows,
        fallback,
        styles,
        listen,
        checkbox,
    }: IThemeSelectOptions
) {

    const widgetRef = createRef();
    const selectRef = createRef();
    const optionsRef = createRef();
    const handlerRef = createRef();
    const arrowsRef = createRef();
    const defaultWidget = Column({
        children: [
            fallback || Column({
                children: Text({
                    children: ''
                })
            })
        ]
    })

    const setValue = (value: IThemeSelectValue) => {
        if (multiple) {
            current.value = Array.isArray(current.value) ? current.value : [];
            if (!current.value.includes(value)) current.value.push(value);
            else current.value = current.value.filter(v => v !== value);
        } else if (!multiple && !Array.isArray(value))
            current.value = value;
    }

    const isSelected = (value: IThemeSelectValue) => {
        if (multiple && Array.isArray(current.value))
            return current.value.some(i => i === value);
        return current.value === value;
    };

    const makeOptionChild = ({value, child}: IThemeSelectOption) => {
        const checkboxRef = createRef();
        const childRef = createRef();
        const selected = isSelected(value);

        console.warn('Select styled', selected, styles?.selected)

        return Row({
            ref: childRef,
            // tabindex: 0,
            style: {
                alignItems: "center",
                ...styles?.option,
                '&:focus': Style({
                    backgroundColor: 'red',
                }),
                ...(selected ? styles?.selected : undefined)
            },
            listen: {
                click: () => current.select(value)
            },
            children: [
                checkbox
                    ? Row({
                        ref: checkboxRef,
                        // signal: {
                        //     mount: ({widget: checker}) => {
                        //         if (!styles?.selected) return;
                        //         if (selected) checker.stylesheet.associate(styles.selected)
                        //         if (!selected) checker.stylesheet?.unassociate(styles.selected)
                        //     }
                        // },
                        style: Style({
                            ...styles?.checkbox,
                        }),
                        children: (selected ? checkbox.checked : checkbox.unchecked)?.clone() || undefined,
                    })
                    : undefined,
                Column({
                    style: {
                        ...styles?.optionContent,
                        flex: '1 1 auto',
                    },
                    children: child
                })
            ]
        })
    };

    const adjustPosition = () => {
        if (optionsRef.current)
            Positioning.alwaysOnScreen(optionsRef.current, {
                top: handlerRef.current?.measure.height || 1,
                left: 0,
            });
    }

    const focus = (
        index: number,
        child: IWidgetNode<any, any>,
        oldIndex: number | undefined,
        old?: IWidgetNode<any, any>
    ) => {
        const styled = styles?.focused || styles?.selected;
        const option = options[index] || undefined;

        if (styled) {
            if (old && typeof oldIndex !== 'undefined' && oldIndex !== index) {
                const oldOption = options[oldIndex] || undefined;
                const selected = oldOption ? isSelected(oldOption.value) : undefined;
                if (!selected)
                    old.stylesheet.unassociate(styled);
            }

            if (option) {
                const selected = option ? isSelected(option.value) : undefined;
                if (!selected) child.stylesheet.associate(styled);
            }
        }
    }

    const walker = new WalkableList<IWidgetNode<any, any>>()

    walker.action({
        type: WalkableAction.Previous,
        callable: ({item: child, old, index, oldIndex}) =>
            focus(index, child, oldIndex, old)
    })

    walker.action({
        type: WalkableAction.Next,
        callable: ({item: child, old, index, oldIndex}) =>
            focus(index, child, oldIndex, old)
    })

    walker.action({
        type: WalkableAction.Jump,
        callable: ({item: child, old, index, oldIndex}) =>
            focus(index, child, oldIndex, old)
    })

    const keyboardDetection = (event: KeyboardEvent) => {
        if (current.status == ThemeSelectStatus.Open) {
            if (event.key === 'ArrowDown') {
                walker.next();
            }
            if (event.key === 'ArrowUp') {
                walker.previous();
            }
            if (event.key === 'Enter' || event.key === ' ') {
                const option = options[walker.index] || undefined;
                if (option) current.select(option.value);
            }
        }
    }

    const {
        capability,
        current
    } = createCapability<IThemeSelectMethods, IThemeSelectProperties>({
        methods: ['open', 'close', 'toggle', 'select', 'options'],
    });

    current.status = ThemeSelectStatus.Close;
    current.list = options;

    capability.apply('open', () => {
        optionsRef.current?.show(Displaying.Flex)
        arrowsRef.current?.clear().content(arrows?.close);
        if (widgetRef.current?.clientElement) {
            widgetRef.current.clientElement.style.zIndex = '999';
        }
        current.options();
        current.status = ThemeSelectStatus.Open;
        if (listen?.open) listen.open(current);
        widgetRef.current?.on('keydown', ({payload: {event}}) => {
            if (event) keyboardDetection(event as KeyboardEvent);
            return TreatmentQueueStatus.Cancel;
        });
    })

    capability.apply('close', () => {
        optionsRef.current?.hide()
        arrowsRef.current?.clear().content(arrows?.open)
        widgetRef.current?.clientElement?.style.removeProperty('z-index')
        current.status = ThemeSelectStatus.Close;

        Callable.safe(() => {
            widgetRef.current?.blur();
            (document.activeElement instanceof HTMLElement
                ? document.activeElement.blur() : void (0));
            if (widgetRef.current && widgetRef.current.clientElement) {
                widgetRef.current.clientElement.onkeydown = null;
            }
        });

        if (listen?.close) listen.close(current);
    })

    capability.apply('toggle', () => {
        if (current.status === ThemeSelectStatus.Open) current.close();
        if (current.status !== ThemeSelectStatus.Open) current.open();
        if (listen?.toggle) listen.toggle(current);
    })

    capability.apply('select', (value: IThemeSelectValue) => {
        const item = [...(current.list.filter((entry) => entry.value === value))][0] || undefined;

        if (item && item.child) {
            setValue(value);
            selectRef.current?.clear().content(item.child.clone());
            // selectRef.current?.clear().content(item.child.clientElement?.cloneNode(true));
            if (listen?.change) listen.change(current);
            // if (!multiple) current.close();
            current.options();
        }
    })

    capability.apply('options', (list) => {
        if (optionsRef.current) {
            current.list = list || options;
            walker.update(
                current.list.map(({value, child}: IThemeSelectOption) => {
                    return makeOptionChild({value, child})
                })
            );
            optionsRef.current.clear().content(walker.list);
            if (current.status !== ThemeSelectStatus.Open) adjustPosition();
        }
    })


    return Column({
        ref: widgetRef,
        tabindex: 0,
        listen: {
            focus: () => current.open(),
            blur: () => current.close(),
        },
        style: {
            cursor: 'pointer',
            ...styles?.widget,
            position: 'relative',
            '-webkit-user-select': 'none',
            '-moz-user-select': 'none',
            '-ms-user-select': 'none',
            userSelect: 'none',
            // '&:not(:focus-within) > .select-options': Style({
            //     display: 'none',
            // }),
            // '&:focus-within > .select-options': Style({
            //     display: 'flex',
            // }),
        },
        className: 'widget-theme-select',
        children: [
            Row({
                ref: handlerRef,
                listen: {
                    click: () => current.toggle(),
                },
                style: {
                    ...styles?.handler,
                },
                className: 'select-handler',
                children: [
                    Column({
                        ref: selectRef,
                        style: {
                            flex: '1 1 auto',
                        },
                        children: value
                            ? [...options.filter(({value}) => value === value)][0] || defaultWidget
                            : defaultWidget,
                    }),
                    Row({
                        ref: arrowsRef,
                        style: {
                            ...styles?.arrow,
                        },
                        children: []
                    }),
                ]
            }),
            Layer({
                ref: optionsRef,
                style: {
                    flexDirection: 'column',
                    ...styles?.options,
                    display: 'none',
                    position: 'absolute',
                    width: '100%',
                },
                className: 'select-options',
                signal: {
                    mount: () => current.close()
                },
                children: []
            })
        ],
    });
}