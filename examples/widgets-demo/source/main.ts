import "./theme/main"
import {
    Color,
    Column, createRef,
    createState, Form,
    ItalicText, type IWidgetNode,
    LargeHeading,
    Layer,
    Mount,
    Row, SmallerText,
    SmallText, Style,
    Text
} from "@protorians/widgets"
import {$ui} from "@protorians/core";
import {Theme} from "@/theme/main.js";
import {FieldsetText} from "./components/fieldset.js";
import {LayerVariant} from "@widgetui/core";
import {hiddenWidget, showWidget} from "@/helpers/widget-visibility.js";
import {opacityHeightTransition} from "@/helpers/widget-transition-style.js";
import {FormController} from "@protorians/widgets";

/**
 *
 */
Mount('AppMain', () => {

    const helmetRef = createRef()
    const listRef = createRef()
    const stateWidget = createState<IWidgetNode<any, any> | undefined>(undefined)
    const stateNumber = createState<number>(0)

    const addHandler = (label: string) => {

        console.warn('list', listRef.current)

        listRef.current
            ?.content(
                Row({
                    style: {
                        gap: 1,
                        alignItems: 'center',
                    },
                    children: [
                        Layer({
                            children: ItalicText({className: 'fas fa-check-circle fa-2x'})
                        }),
                        Column({
                            style: {
                                flex: '1 1 auto',
                            },
                            children: [
                                Text({
                                    children: label
                                }),
                                SmallerText({
                                    style: {
                                        opacity: '.5',
                                    },
                                    children: (Date.now())
                                }),
                            ]
                        }),
                        Layer({
                            children: ItalicText({
                                style: {
                                    color: Color.text,
                                    cursor: 'pointer',
                                    '&:hover': Style({
                                        color: Color.error
                                    })
                                },
                                className: 'fas fa-times-circle fa-lg'
                            })
                        }),
                    ]
                })
            )
    }

    return Column({
        signal: {
            mount: () => {
                let counter = 0;
                $ui('body').forEach(body => body.style.backgroundColor = Color.tint);
                setInterval(() => {
                    stateWidget.set(Text({children: `State counter : ${counter}`}))
                    stateNumber.set(counter)
                    counter++;
                }, 1000)
            }
        },
        style: {
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            gap: 1.5,
        },
        children: [

            // stateWidget,
            // stateNumber,

            Column({
                style: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: .5,
                },
                children: [
                    SmallerText({
                        style: {
                            backgroundColor: Color.text,
                            color: Color.tint,
                            padding: '0.3em .7rem',
                            borderRadius: Theme.settings.radius,
                            textTransform: 'uppercase',
                        },
                        children: 'TodoList',
                    }),
                    LargeHeading({
                        style: {
                            fontWeight: '100',
                            textTransform: 'capitalize',
                        },
                        children: 'We are protorians',
                    }),
                    SmallText({
                        style: {},
                        children: 'Save your todolist',
                    }),
                ]
            }),

            Theme.Layer({
                style: {
                    maxWidth: 'calc(512px - 2rem)',
                    width: 'calc(100vw - 2rem)',
                    padding: 1,
                },
                children: Column({
                    style: {},
                    children: [

                        Layer({
                            ref: helmetRef,
                            signal: {
                                mount: ({widget}) =>
                                    hiddenWidget(widget)
                            },
                            style: {
                                ...opacityHeightTransition,
                            },
                            children: Row({
                                style: {
                                    gap: 1,
                                    paddingBottom: 1,
                                },
                                children: [
                                    Layer({
                                        children: ItalicText({className: 'fas fa-list-check'})
                                    }),
                                    Column({
                                        children: [
                                            Text({
                                                children: 'My TodoList'
                                            })
                                        ]
                                    })
                                ]
                            }),
                        }),


                        Form({
                            listen: {
                                submit: ({widget, payload}) => {

                                    if (widget.element) {
                                        payload.event.preventDefault()
                                        const {task} = FormController.getPayload<any>(widget)

                                        console.warn('FormData', task)

                                        if (task) {
                                            addHandler(task)
                                            showWidget(helmetRef.current)(listRef.current)
                                            if(document.activeElement instanceof HTMLInputElement){
                                                document.activeElement.value = ''
                                            }
                                        }

                                    }

                                }
                            },
                            children: [
                                Row({
                                    style: {
                                        gap: 1,
                                    },
                                    listen: {
                                        focusin: () => {
                                            showWidget(helmetRef.current)(listRef.current)
                                        },
                                        focusout: () => {
                                            hiddenWidget(helmetRef.current)(listRef.current)
                                        },
                                    },
                                    children: [
                                        Layer({
                                            style: {flex: '1 1 auto',},
                                            children: [
                                                FieldsetText({
                                                    icon: 'fas fa-plus',
                                                    label: 'Add task',
                                                    name: 'task'
                                                }),
                                            ]
                                        }),
                                        Theme.Button({
                                            variant: LayerVariant.Primary,
                                            children: SmallText({
                                                children: 'New task',
                                            }),
                                            onPress: () => {
                                            }
                                        })
                                    ]
                                }),
                            ]
                        }),

                        Layer({
                            ref: listRef,
                            signal: {
                                mount: ({widget}) =>
                                    hiddenWidget(widget)
                            },
                            style: {
                                ...opacityHeightTransition,
                            },
                            children: [
                                Column({
                                    style: {
                                        marginTop: 1,
                                        opacity: '.3',
                                        textAlign: 'center',
                                    },
                                    children: [
                                        SmallerText({
                                            children: 'Task list',
                                        })
                                    ]
                                }),

                            ]
                        }),

                    ]
                })
            }),
        ]
    })
})