import { Callable, createCapability, WalkableAction, WalkableList } from "@protorians/core";
import { Column, createRef, Displaying, Layer, Row, Style, Text } from "@protorians/widgets";
import { ThemeSelectStatus } from "./enum.js";
import { UiPositioning } from "../../supports/positioning.js";
export function ThemeSelect({ options, value, multiple, arrows, fallback, styles, listen, checkbox, multipleSuffix, }) {
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
    });
    const setValue = (value) => {
        if (multiple) {
            current.value = Array.isArray(current.value) ? current.value : [];
            if (!current.value.includes(value))
                current.value.push(value);
            else
                current.value = current.value.filter(v => v !== value);
        }
        else if (!multiple && !Array.isArray(value))
            current.value = value;
    };
    const isSelected = (value) => {
        if (multiple && Array.isArray(current.value))
            return current.value.some(i => i === value);
        return current.value === value;
    };
    const makeOptionChild = ({ value, child }) => {
        const checkboxRef = createRef();
        const childRef = createRef();
        const selected = isSelected(value);
        return Row({
            ref: childRef,
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
        });
    };
    const adjustPosition = () => {
        if (optionsRef.current)
            UiPositioning.alwaysOnScreen(optionsRef.current, {
                top: handlerRef.current?.measure.height || 1,
                left: 0,
            });
    };
    const focus = (index, child, oldIndex, old) => {
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
                if (!selected)
                    child.stylesheet.associate(styled);
            }
        }
    };
    const walker = new WalkableList();
    walker.action({
        type: WalkableAction.Previous,
        callable: ({ item: child, old, index, oldIndex }) => focus(index, child, oldIndex, old)
    });
    walker.action({
        type: WalkableAction.Next,
        callable: ({ item: child, old, index, oldIndex }) => focus(index, child, oldIndex, old)
    });
    walker.action({
        type: WalkableAction.Jump,
        callable: ({ item: child, old, index, oldIndex }) => focus(index, child, oldIndex, old)
    });
    const keyboardDetection = (event) => {
        if (current.status == ThemeSelectStatus.Open) {
            const key = event.key.toString().toLowerCase();
            if (key === 'arrowdown') {
                walker.next();
                event.preventDefault();
            }
            else if (key === 'arrowup') {
                walker.previous();
                event.preventDefault();
            }
            else if (key === 'enter' || key === 'space') {
                const option = options[walker.index] || undefined;
                if (option)
                    current.select(option.value);
                event.preventDefault();
            }
            else if (key === 'escape' || key === 'esc' || key === 'tab') {
                current.close();
            }
        }
    };
    const { capability, current } = createCapability({
        methods: ['open', 'close', 'toggle', 'select', 'options'],
    });
    current.status = ThemeSelectStatus.Close;
    current.list = options;
    capability.apply('open', () => {
        optionsRef.current?.show(Displaying.Flex);
        arrowsRef.current?.clear().content(arrows?.close);
        if (widgetRef.current?.clientElement) {
            widgetRef.current.clientElement.style.zIndex = '999';
        }
        current.options();
        current.status = ThemeSelectStatus.Open;
        if (listen?.open)
            listen.open(current);
        widgetRef.current?.on('keydown', ({ payload: { event } }) => {
            if (event)
                keyboardDetection(event);
        });
    });
    capability.apply('close', () => {
        optionsRef.current?.hide();
        arrowsRef.current?.clear().content(arrows?.open);
        widgetRef.current?.clientElement?.style.removeProperty('z-index');
        current.status = ThemeSelectStatus.Close;
        Callable.safe(() => {
            widgetRef.current?.blur();
            (document.activeElement instanceof HTMLElement
                ? document.activeElement.blur() : void (0));
            if (widgetRef.current && widgetRef.current.clientElement) {
                widgetRef.current.clientElement.onkeydown = null;
            }
        });
        if (listen?.close)
            listen.close(current);
        widgetRef.current?.blur();
    });
    capability.apply('toggle', () => {
        if (current.status === ThemeSelectStatus.Open)
            current.close();
        if (current.status !== ThemeSelectStatus.Open)
            current.open();
        if (listen?.toggle)
            listen.toggle(current);
    });
    capability.apply('select', (value) => {
        setValue(value);
        const selection = Array.isArray(current.value) ? current.value : [current.value];
        const items = [...(current.list.filter((entry) => selection.includes(entry.value)))];
        if (items.length > 0) {
            if (multiple) {
                selectRef.current?.clear().content(selection.length > 1 ?
                    Row({
                        children: Text({
                            children: `${selection.length} ${multipleSuffix || 'selected'}`
                        })
                    })
                    : items[0].child?.clone());
            }
            if (!multiple && items.length > 1 && items[0].child) {
                selectRef.current?.clear().content(items[0].child.clone());
            }
        }
        if (!items.length) {
            selectRef.current?.clear().content(fallback?.clone());
        }
        if (listen?.change)
            listen.change(current);
        current.options();
        if (!multiple)
            current.close();
    });
    capability.apply('options', (list) => {
        if (optionsRef.current) {
            current.list = list || options;
            walker.update(current.list.map(({ value, child }) => {
                return makeOptionChild({ value, child });
            }));
            optionsRef.current.clear().content(walker.list);
            if (current.status !== ThemeSelectStatus.Open)
                adjustPosition();
        }
    });
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
                            ? [...options.filter(({ value }) => value === value)][0] || defaultWidget
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
