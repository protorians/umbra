import {Callable, createCapability} from "@protorians/core";
import {
    IThemeSelectOption,
    IThemeSelectMethods,
    IThemeSelectOptions,
    IThemeSelectProperties,
    IThemeSelectValue
} from "./type.js";
import {Column, createRef, Displaying, Layer, Row, Text} from "@protorians/widgets";
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
            // else current.value = current.value.filter(v => v !== value);
        } else if (!multiple && !Array.isArray(value)) current.value = value;
    }

    const isSelected = (value: IThemeSelectValue) => {
        if (multiple && Array.isArray(current.value))
            return current.value.some(i => i === value);
        return current.value === value;
    };

    const setChild = ({value, child}: IThemeSelectOption) => {
        const checkboxRef = createRef();
        const childRef = createRef();
        const ui = () => {
            const selected = isSelected(value);

            if (checkbox) checkboxRef.current?.clear().content((selected ? checkbox.checked : checkbox.unchecked)?.clone());
            if (!styles?.selected) return;
            if (selected) childRef.current?.stylesheet.associate(styles.selected)
            if (!selected) childRef.current?.stylesheet?.unassociate(styles.selected)
        }

        return Row({
            ref: childRef,
            // tabindex: 0,
            style: {
                alignItems: "center",
                ...styles?.option,
            },
            listen: {
                click: () => {
                    ui();
                    current.select(value);
                }
            },
            signal: {
                mount: () => ui()
            },
            children: [
                checkbox
                    ? Row({
                        ref: checkboxRef,
                        style: {
                            ...styles?.checkbox,
                        },
                        children: undefined,
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
                top: handlerRef.current?.measure.height || 32,
                left: 0,
            });
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
        arrowsRef.current?.clear().content(arrows?.close);
        if (widgetRef.current?.clientElement) {
            widgetRef.current.clientElement.style.zIndex = '999';
        }
        current.status = ThemeSelectStatus.Open;

        if (listen?.open) listen.open(current);
    })

    capability.apply('close', () => {
        arrowsRef.current?.clear().content(arrows?.open)
        widgetRef.current?.clientElement?.style.removeProperty('z-index')
        current.status = ThemeSelectStatus.Close;

        Callable.safe(() => {
            widgetRef.current?.blur();
            (document.activeElement instanceof HTMLElement ? document.activeElement.blur() : void (0))
        });

        if (listen?.close) listen.close(current);
    })

    capability.apply('toggle', () => {
        if (current.status === ThemeSelectStatus.Open) current.close()
        if (current.status !== ThemeSelectStatus.Open) current.open()

        if (listen?.toggle) listen.toggle(current);
    })

    capability.apply('select', (value: IThemeSelectValue) => {
        const item = [...(current.list.filter((entry) => entry.value === value))][0] || undefined;

        if (item && item.child) {
            setValue(value);
            selectRef.current?.clear().content(item.child.clientElement?.cloneNode(true));
            if (listen?.change) listen.change(current);
            if (!multiple) current.close()
            current.options();
        }
    })

    capability.apply('options', (list) => {
        if (optionsRef.current) {
            current.list = list || options;
            optionsRef.current.clear().content(
                current.list.map(({value, child}: IThemeSelectOption) => {
                    return setChild({value, child})
                })
            );
            adjustPosition();
        }
    })


    return Column({
        ref: widgetRef,
        tabindex: 0,
        listen: {
            focusin: () => {
                optionsRef.current?.show(Displaying.Flex);
                current.options();
            },
            focusout: () => optionsRef.current?.hide(),
        },
        style: {
            cursor: 'pointer',
            ...styles?.widget,
            position: 'relative',
            '--webkit-user-select': 'none',
            '--moz-user-select': 'none',
            '--ms-user-select': 'none',
            userSelect: 'none',
        },
        children: [
            Row({
                ref: handlerRef,
                listen: {
                    click: () => current.toggle(),
                },
                style: {
                    ...styles?.handler,
                },
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
                signal: {
                    mount: () => current.close()
                },
                children: []
            })
        ],
    });
}