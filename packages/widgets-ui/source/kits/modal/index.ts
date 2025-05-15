import {
    AsideFrame,
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

    protected static layoutSlugs: (keyof IModalLayout)[] = ['children', 'trigger', 'foreground', 'background', 'dialogBox',]

    @Structurable protected children(): IChildren<any> {
        return this._states.children?.value;
    }

    @Structurable protected trigger(): IWidgetNode<any, any> {
        return this._states.trigger!.value as IWidgetNode<any, any>;
    }

    @Structurable protected background() {
        return Layer({
            style: {
                backgroundColor: Color.black_a3,
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

    @Structurable protected dialogBox(){
        console.warn('DialogBox', this)

        return Stack({
            children: 'test'
        })
    }

    protected animate(
        widget: IWidgetNode<any, any>,
        options: IAnimetricSlimOptions
    ): IAnimetricGroup {
        if (options.from) widget.style(options.from)
        return slimetric(widget.element, options)
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
        const asideRef = createRef();
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

        const handler = () => {
            asideRef.current?.style({
                position: 'fixed',
                backdropFilter: this.options.blurred ? 'blur(var(--widget-radius, 2rem))' : 'none',
            })

            asideRef.current?.attributeLess({
                'aria-title': this.options.ariaTitle,
                'aria-description': this.options.ariaDescription,
            })

            if (!this.status) {
                shortcut?.destroy()
                asideRef.current?.attributeLess({'aria-hidden': "true",})
                foreground.trigger('blur')
                context.widget.style({position: scopedPosition})

                if (this.options.animateOut) {
                    const animate = this.animate(foreground, this.options.animateOut);

                    animate.signal.listen('complete', () => {
                        asideRef.current?.style({display: 'none',})
                        readyOut()
                    })

                    animate.play()
                }
                if (!this.options.animateOut) {
                    asideRef.current?.style({display: 'none',})
                    readyOut()
                }
            }

            if (this.status) {
                shortcut = createShortcut(["Escape"], {trigger: () => this.close()})

                if (this.options.scoped && context.widget) {
                    if (scopedPosition && scopedPosition === 'static')
                        context.widget.style({position: 'relative',})
                    asideRef.current?.style({position: 'absolute'})
                    document.documentElement.style.overflow = 'hidden';
                }

                if (this.options.animateIn)
                    this.animate(foreground, this.options.animateIn).play()

                asideRef.current
                    ?.attributeLess({'aria-hidden': "false",})
                    .style({display: 'flex',})
                foreground.trigger('focus');
            }

        }

        let shortcut: IShortcut<HTMLElement> | undefined;


        this.states.trigger.effect(() => triggerHandler())
        this._status.effect(() => handler())

        return Layer({
            ref: wrapperRef,
            signal: {
                mount: () => {
                    triggerHandler()
                    handler()
                }
            },
            children: [
                this.states.trigger,
                AsideFrame({
                    ref: asideRef,
                    elevate: this.elevation,
                    style: {
                        display: 'none',
                        inset: '0',
                        flexDirection: 'column',
                        alignItems: WidgetUi.horizontally(position[0]),
                        justifyContent: WidgetUi.vertically(position[1]),
                    },
                    children: [foreground, background,]
                })
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