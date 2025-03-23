import {
    AsideFrame, Color, createState, ICallablePayload, IChildren,
    type IKit, IState,
    IWidgetNode,
    Kit,
    Layer,
    Override,
    PopupType,
    PositionX, PositionY, Structurable, WidgetElevation,
} from "@protorians/widgets";
import type {IModal, IModalElevation, IModalLayer, IModalLayout, IModalOptions} from "../types/modal.js";
import {WidgetUi} from "../ui.js";
import {IAnimetricGroup, IAnimetricSlimOptions, slimetric} from "@protorians/animetric";
import {createShortcut, IShortcut} from "@protorians/shortcuts";


export class ModalKit extends Kit<IModalLayout> implements IModal, IKit<IModalLayout> {
    protected _status: IState<boolean> = createState<boolean>(false);
    protected _options: Partial<IModalOptions> = {};

    protected playAnimation(
        widget: IWidgetNode<any, any>,
        animateOptions: IAnimetricSlimOptions
    ): IAnimetricGroup | undefined {
        if (animateOptions.from) widget.style(animateOptions.from)
        return slimetric(widget.element, animateOptions).play()
    }

    get options(): Partial<IModalOptions> {
        return this._options;
    }

    get status(): boolean {
        return this._status.value;
    }

    get elevation(): IModalElevation {
        switch (this._options.type || PopupType.Dialog) {
            case PopupType.Dialog:
            case PopupType.Grid:
                return WidgetElevation.Critical;

            case PopupType.Menu:
            case PopupType.Tree:
                return WidgetElevation.Float;

            case PopupType.Listbox:
            case PopupType.Custom:
                return WidgetElevation.Overlay;
        }
    }

    @Structurable
    foreground(content?: IChildren<any>) {
        return Layer({
            style: {
                zIndex: '1',
                maxHeight: '100vh',
                maxWidth: '100vw',
            },
            signal: {
                mount: ({widget}) => {
                    if (this._options.animate) this.playAnimation(widget, this._options.animate)
                }
            },
            children: content
        })
    }

    @Structurable
    background(content?: IChildren<any>) {
        return Layer({
            style: {
                position: 'absolute',
                inset: '0',
                backgroundColor: Color.tint_a1,
                backdropFilter: this._options.blurred ? 'blur(var(--widget-radius))' : 'none',
                zIndex: '0',
                maxHeight: '100vh',
                maxWidth: '100vw',
            },
            listen: {
                click: () => this.close()
            },
            children: content
        })
    }

    @Structurable
    wrapper() {
        return AsideFrame({
            style: {
                display: "none",
            },
            children: [
                this.structures.background(this._options.back ? this._options.back(this) : undefined),
                this.structures.foreground(this._options.fore ? this._options.fore(this) : undefined),
            ]
        })
    }

    @Override()
    bootstrapper(context: ICallablePayload<any, any, any>) {
        let scope: IWidgetNode<any, any> | undefined;
        let wrapper: IWidgetNode<any, any> | undefined;
        let short: IShortcut<HTMLElement> | undefined;

        this._status.effect((state) => {
            if (!state) {
                const scopedElement = scope?.element || document.documentElement;
                scopedElement.style.removeProperty('overflow');
                wrapper?.remove()
                wrapper = undefined;
                short?.destroy()
                return;
            }

            const position = this._options.position || [PositionX.Center, PositionY.Center];

            scope = (this._options.scope?.context?.root || context.root);
            short = createShortcut(["Escape"], {trigger: () => this.close()})
            wrapper = this.wrapper()
            wrapper
                .elevate(this.elevation)
                ?.style({
                    display: 'flex',
                    position: 'fixed',
                    top: '0',
                    right: '0',
                    bottom: '0',
                    left: '0',
                    flexDirection: 'column',
                    alignItems: WidgetUi.horizontally(position[0]),
                    justifyContent: WidgetUi.vertically(position[1]),
                });
            scope.content(wrapper);
            (scope.element || document.documentElement).style.overflow = 'hidden';
        })

        return this._options.trigger?.listen('click', () => this.open())
    }

    open(): this {
        this._status.set(true);
        return this;
    }

    close(): this {
        this._status.set(false);
        return this;
    }

    type(value?: PopupType): this {
        this._options.type = value || this._options.type || undefined;
        return this;
    }

    trigger(value?: IWidgetNode<any, any>): this {
        this._options.trigger = value || this._options.trigger || undefined;
        return this;
    }

    fore(value?: IModalLayer): this {
        this._options.fore = value || this._options.fore || undefined;
        return this;
    }

    back(value?: IModalLayer): this {
        this._options.back = value || this._options.back || undefined;
        return this;
    }

    scope(value?: IWidgetNode<any, any>): this {
        this._options.scope = value || this._options.scope || undefined;
        return this;
    }

    ariaTitle(value?: string): this {
        this._options.ariaTitle = value || this._options.ariaTitle || undefined;
        return this;
    }

    ariaDescription(value?: string): this {
        this._options.ariaDescription = value || this._options.ariaDescription || undefined;
        return this;
    }

    locked(value?: boolean): this {
        this._options.locked = value || this._options.locked || undefined;
        return this;
    }

    blurred(value?: boolean): this {
        this._options.blurred = value || this._options.blurred || undefined;
        return this;
    }

    animate(value?: IAnimetricSlimOptions): this {
        this._options.animate = value || this._options.animate || undefined;
        return this;
    }

    position(value?: [PositionX, PositionY]): this {
        this._options.position = value || this._options.position || undefined;
        return this;
    }
}



