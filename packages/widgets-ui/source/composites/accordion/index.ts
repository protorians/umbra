import {createCapability} from "@protorians/core";
import {
    IThemeAccordionChild,
    IThemeAccordionEntries, IThemeAccordionIndex,
    IThemeAccordionMethods,
    IThemeAccordionOptions,
    IThemeAccordionProperties
} from "./type.js";
import {AligningDirection, Column, createRef, Stack, Style} from "@protorians/widgets";
import {AccordionStatus, AccordionType} from "./enum.js";


export function ThemeAccordion(
    {type, defaultIndex, children, direction, styles}: IThemeAccordionOptions
) {

    type = typeof type === 'undefined' ? AccordionType.Single : type;
    direction = typeof direction == 'undefined' ? AligningDirection.Column : direction

    const isColumnDirection = direction.toLowerCase().includes('column')
    const accordionEntries: IThemeAccordionEntries = {}
    const latest: Record<AccordionStatus, IThemeAccordionIndex> = {} as Record<AccordionStatus, IThemeAccordionIndex>;

    return Stack({
        style: Style({
            ...styles?.widget,
            flexDirection: typeof direction == 'undefined' ? 'column' : direction,
        }),
        children: [

            children?.map(async (child: IThemeAccordionChild) => {
                const {
                    capability,
                    current: accordion
                } = createCapability<IThemeAccordionMethods, IThemeAccordionProperties>({
                    methods: ['open', 'close', 'toggle', 'remove'],
                });
                const triggerRef = createRef();
                const contentRef = createRef();
                const itemRef = createRef();

                accordion.status = AccordionStatus.Closed;
                capability.apply('open', (_index) => {
                    const check = _index && typeof accordionEntries[_index] !== 'undefined'

                    if (latest.opened && (_index || index) !== latest.opened && type === AccordionType.Single)
                        accordionEntries[latest.opened].accordion.close()
                    if (check)
                        accordionEntries[_index].accordion.open()
                    if (!check) {
                        const size = isColumnDirection
                            ? contentRef.current?.clientElement?.scrollHeight
                            : contentRef.current?.clientElement?.scrollWidth;

                        if (isColumnDirection) contentRef.current?.style({height: `${size}px`,})
                        else contentRef.current?.style({width: `${size}px`,})

                        contentRef.current?.style({visibility: 'visible'})
                        itemRef.current?.style({flex: `1 1 auto`,})
                        accordion.status = AccordionStatus.Opened;
                    }
                    latest.opened = _index || index;
                })
                capability.apply('close', (_index) => {
                    if (_index && typeof accordionEntries[_index] !== 'undefined') {
                        accordionEntries[_index].accordion.close()
                    } else {
                        if (isColumnDirection) contentRef.current?.style({height: `0`,})
                        else contentRef.current?.style({width: `0`,})
                        accordion.status = AccordionStatus.Closed;
                    }

                    contentRef.current?.style({visibility: 'hidden'})
                    itemRef.current?.style({flex: 'initial',})
                    latest.closed = _index || index;
                })
                capability.apply('toggle', (_index) => {
                    if (_index && typeof accordionEntries[_index] !== 'undefined') {
                        accordionEntries[_index].accordion.toggle()
                    } else {
                        if (accordion.status === AccordionStatus.Opened) accordion.close()
                        else accordion.open()
                    }
                })
                capability.apply('remove', (_index) => {
                    if (_index && typeof accordionEntries[_index] !== 'undefined') {
                        accordionEntries[_index].wrapper.current?.remove();
                    } else {
                        itemRef.current?.remove();
                    }
                })

                const {
                    content,
                    index,
                    trigger
                } = typeof child === 'function' ? child(accordion) : child;

                accordionEntries[index] = {
                    capability,
                    accordion,
                    content: contentRef,
                    trigger: triggerRef,
                    wrapper: itemRef,
                }

                trigger.listen('click', () => accordion.toggle())

                return Stack({
                    ref: itemRef,
                    style: Style({
                        ...styles?.item,
                        flexDirection: typeof direction == 'undefined' ? 'column' : direction,
                    }),
                    signal: {
                        mount: () => {
                            if (defaultIndex == index) accordion.open()
                            else accordion.close()
                        }
                    },
                    children: [
                        Stack({
                            ref: triggerRef,
                            style: Style({
                                cursor: 'pointer',
                                ...styles?.trigger,
                            }),
                            children: trigger.style({
                                flex: '1 1 auto',
                            })
                        }),
                        Column({
                            ref: contentRef,
                            style: Style({
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                ...styles?.content,
                                overflow: 'hidden',
                                padding: '0',
                            }),
                            children: content.style({
                                flex: '1 1 auto',
                            })
                        }),
                    ]
                })
            })

        ]
    })
}