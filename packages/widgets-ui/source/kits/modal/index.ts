import {
    AsideWidget,
    Color,
    Column,
    createRef, ICallablePayload,
    type IChildren,
    type IKit,
    type IWidgetNode,
    Kit, Layer,
    Override, PopupType, PositionX, PositionY, Stack,
    Structurable, ObjectElevation,
} from "@protorians/widgets";
import type {IModal, IModalElevation, IModalLayout, IModalOptions} from "./type.js";
import {IAnimetricGroup, IAnimetricSlimOptions, slimetric} from "@protorians/animetric";
import {WidgetUi} from "../../ui.js";
import {createShortcut, IShortcut} from "@protorians/shortcuts";


export class ModalKit extends Kit<IModalLayout, IModalOptions> implements IModal, IKit<IModalLayout, IModalOptions> {

    // protected static layoutSlugs: (keyof IModalLayout)[] = ['children', 'trigger', 'foreground', 'background', 'dialogBox',]

    @Structurable protected children(): IChildren<any> {
        return this._states.children?.value;
    }

    @Structurable protected trigger(): IWidgetNode<any, any> {
        return this._states.trigger!.value as IWidgetNode<any, any>;
    }

    @Structurable protected background() {
        return Layer({
            style: {
                backgroundColor: Color.tint_a4,
                ...(this.options.styles?.back || {}),
                position: 'absolute',
                inset: '0',
                zIndex: '0',
            },
            listen: {
                click: () => !this.options.locked ? this.close() : void (0),
            },
            children: undefined,
        })
    }

    @Structurable protected foreground() {
        return Column({
            tabindex: 0,
            style: {
                outline: '0px solid transparent',
                ...(this.options.styles?.fore || {}),
                zIndex: '1',
            },
            children: [
                this.options.children
            ]
        })
    }

    @Structurable protected dialogBox() {
        return Stack({
            children: 'test'
        })
    }

    protected animate(
        widget: IWidgetNode<any, any>,
        options: IAnimetricSlimOptions
    ): IAnimetricGroup {
        if (options.from) widget.style(options.from)
        return slimetric(widget.element, {...options})
    }


    get elevation(): IModalElevation {
        switch (this.options.type || PopupType.Dialog) {
            case PopupType.Dialog:
            case PopupType.Grid:
                return ObjectElevation.Critical;

            case PopupType.Menu:
            case PopupType.Tree:
                return ObjectElevation.Float;

            case PopupType.Listbox:
            case PopupType.Custom:
                return ObjectElevation.Overlay;
        }
    }

    @Override() main(context: ICallablePayload<any, any, any>) {
        if (this.options.opened === true) this._status.set(true)

        const wrapperRef = createRef();
        const foreground = this.foreground();
        const background = this.background();
        const scopedPosition = (context.widget.stylesheet.declarations.position || 'static').toString().toLowerCase();
        const position = this.options.position || [];

        position[0] = position[0] || PositionX.Center;
        position[1] = position[1] || PositionY.Center;

        const triggerHandler = () =>
            this.options.trigger?.listen('click', () => this.toggle())

        const readyOut = () => {
            this.options.opened = false;

            if (this.options.scoped && context.widget) {
                document.documentElement.style.removeProperty('overflow');
            }
        }

        const closing = (widget: IWidgetNode<any, any>) => {

            foreground.trigger('blur')
            context.widget.style({position: scopedPosition})

            if (this.options.animateOut) {
                const animate = this.animate(foreground, this.options.animateOut);

                animate.signal.listen('complete', () => {
                    widget.remove()
                    // widget.style({display: 'none',})
                    readyOut()
                })

                animate.play()
            }
            if (!this.options.animateOut) {
                widget.style({display: 'none',})
                readyOut()
            }
        }

        const handler = (widget: IWidgetNode<any, any>) => {
            widget.style({
                position: 'fixed',
                backdropFilter: this.options.blurred ? 'blur(var(--widget-radius, 2rem))' : 'none',
            })

            widget.attributeLess({
                'aria-title': this.options.ariaTitle,
                'aria-description': this.options.ariaDescription,
            })

            if (!this.status) {
                shortcut?.destroy()
                closing(widget)
            }

            if (this.status) {
                shortcut = createShortcut(["Escape"], {trigger: () => this.close()})

                if (this.options.scoped && context.widget) {
                    if (scopedPosition && scopedPosition === 'static')
                        context.widget.style({position: 'relative',})
                    widget.style({position: 'absolute'})
                    document.documentElement.style.overflow = 'hidden';
                }

                if (this.options.animateIn)
                    this.animate(foreground, this.options.animateIn).play()

                widget.attributeLess({'aria-hidden': "false",})
                    .style({display: 'flex',})
                foreground.trigger('focus');
            }

        }

        let shortcut: IShortcut<HTMLElement> | undefined;
        let _aside: IWidgetNode<any, any> | undefined;


        this.states.trigger.effect(() => triggerHandler())
        this.exposeLayout('foreground', foreground);
        this.exposeLayout('background', background);

        return Layer({
            ref: wrapperRef,
            signal: {
                mount: () => {
                    triggerHandler();
                }
            },
            children: [
                this.states.trigger,
                this._status.watch(status => {

                    if (!status) {
                        if(_aside) closing(_aside)
                        return;
                    }

                    _aside = AsideWidget({
                        elevate: this.elevation,
                        signal: {
                            mount: ({widget}) => {
                                handler(widget)
                            }
                        },
                        style: {
                            display: 'flex',
                            position: 'fixed',
                            backdropFilter: this.options.blurred ? 'blur(var(--widget-radius, 2rem))' : 'none',
                            inset: '0',
                            flexDirection: 'column',
                            alignItems: WidgetUi.horizontally(position[0]),
                            justifyContent: WidgetUi.vertically(position[1]),
                        },
                        children: [background, foreground,]
                    })

                    if (!this.options.scoped && status) {
                        wrapperRef.current?.context?.root?.content(_aside)
                        return;
                    }
                    if (status) return _aside;

                    return undefined
                }),
            ],
        })
    }

    setChildren(children?: IWidgetNode<any, any>): this {
        this._states.children?.set(children);
        return this;
    }

    setTrigger(children?: IWidgetNode<any, any>): this {
        this._states.trigger?.set(children);
        return this;
    }

    show(): this {
        this._status.set(true)
        return this;
    }

    close(): this {
        this._status.set(false);
        return this;
    }

    hide(): this {
        this._status.set(null)
        return this;
    }

    toggle(): this {
        if (this.status) this.close()
        else this.show()
        return this
    }
}