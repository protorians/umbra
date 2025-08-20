import {
    AligningDirection,
    createRef,
    type IKit, IStyleSheetDeclarations,
    Kit,
    Override,
    Row, Stack,
    Structurable,
    Style,
    useStateful
} from "@protorians/widgets";
import type {
    ICarousel,
    ICarouselButtons,
    ICarouselItem,
    ICarouselLayout,
    ICarouselOptions,
    ICarouselRefs, ICarouselSignalMap
} from "./type.js";
import {ScrollbarStyle} from "../../styles/scrollbar.js"
import {createAnimetric, IAnimetric} from "@protorians/animetric";
import {ISignalStack, Signal} from "@protorians/core";

export class CarouselKit extends Kit<ICarouselLayout, ICarouselOptions> implements ICarousel, IKit<ICarouselLayout, ICarouselOptions> {

    protected _index: number = 0;
    protected _autoplayTracking: IAnimetric | undefined;
    protected _autoplayStatus: boolean | null = null;

    protected _refs: ICarouselRefs = {
        widget: createRef(),
        wrapper: createRef(),
        items: createRef(),
        controls: createRef(),
        previous: createRef(),
        next: createRef(),
        progress: createRef(),
        progressBar: createRef(),
        progressTrack: createRef(),
    }

    protected computeIndex(index: number | string): number | undefined {
        for (const [key, item] of this.options.items.entries())
            if (key === index || item.index === index)
                return key;
        return undefined;
    }

    protected initializeTracking(): this {
        // const autoplay = this.options.autoplay || this.states.autoplay?.value;
        //
        // if (!autoplay) return this;

        if (!this._autoplayTracking) {
            this._autoplayTracking = createAnimetric({
                from: [0],
                to: [100],
                duration: this.options.duration || 5000,
            });
        }

        return this;
    }


    protected controlUi() {
        return {
            play: () => {
                this.options.buttons?.pause?.style({display: 'flex',})
                this.options.buttons?.stop?.style({display: 'flex',})
                this.options.buttons?.play?.style({display: 'none',});
            },
            pause: () => {
                this.options.buttons?.play?.style({display: 'flex',})
                this.options.buttons?.pause?.style({display: 'none',})
                this.options.buttons?.stop?.style({display: 'none',})
            },
            stop: () => {
                this.options.buttons?.play?.style({display: 'flex',})
                this.options.buttons?.pause?.style({display: 'none',})
                this.options.buttons?.stop?.style({display: 'none',})
            }
        }
    }

    protected controlsCenter(): this {
        const ui = this.controlUi()
        const progressive = this.options.progressive || this.states.progressive?.value;
        const autoplay = this.options.autoplay || this.states.autoplay?.value;

        this.signal.listen('change', () => {
            this._autoplayStatus = null;
            if (this.options.autoplay) this.play()
            if (!this.options.autoplay) this.stop()
        })

        this.signal.listen('play', () => {
            ui.play();
            if (this._autoplayStatus === null) this._autoplayTracking?.play()
            if (this._autoplayStatus === false) this._autoplayTracking?.resume()

            if (progressive || autoplay) {
                this._refs.progress.current?.style({
                    display: 'flex',
                })
            }
        })

        this.signal.listen('pause', () => {
            ui.pause();
            this._autoplayTracking?.pause();
            this._autoplayStatus = false;
        })

        this.signal.listen('stop', () => {
            ui.stop()
            this._autoplayTracking?.stop()
            this._autoplayStatus = null;

            if (!progressive && !autoplay) {
                this._refs.progress.current?.style({
                    display: 'none',
                })
            }
        })

        this.initializeTracking();

        if (!this.options.autoplay) {
            this.go(0)
            ui.stop()
        }
        if (this.options.autoplay) {
            this.play(0);
            this._autoplayStatus = true;
            this.signal.dispatch('autoplay:start', this)
        }

        this._autoplayTracking?.signal
            .listen('update', ({frames: [frame]}) => {
                if (this._refs.progressTrack.current?.clientElement)
                    this._refs.progressTrack.current.clientElement.style.width = `${frame}%`
            })
            .listen('complete', () => {
                if (this.canNext()) {
                    this.next().initializeTracking();
                } else {
                    if (this.options.loopable) this.signal.dispatch('replay', this)
                    this.signal.dispatch('autoplay:complete', this)
                }
            })


        this.signal.dispatch('ready', this)

        return this;
    }

    get refs(): ICarouselRefs {
        return this._refs;
    }

    public signal: ISignalStack<ICarouselSignalMap> = new Signal.Stack<ICarouselSignalMap>()

    @Structurable controls() {
        /**
         * Actions
         */
        this.options.buttons?.play?.on('click', () => this.play())
        this.options.buttons?.pause?.on('click', () => this.pause())
        this.options.buttons?.replay?.on('click', () => this.go(0))
        this.options.buttons?.stop?.on('click', () => this.stop())

        /**
         * Styles
         */
        this.options.buttons?.play?.stylesheet.merge(this.options.styles?.control)
        this.options.buttons?.pause?.stylesheet.merge(this.options.styles?.control)
        this.options.buttons?.replay?.stylesheet.merge(this.options.styles?.control)
        this.options.buttons?.stop?.stylesheet.merge(this.options.styles?.control)

        /**
         * Widget
         */
        return Row({
            ref: this._refs.controls,
            style: Style({
                position: 'absolute',
            }).merge(this.options.styles?.controls),
            children: [
                this.options.buttons?.replay,
                this.options.buttons?.play,
                this.options.buttons?.pause,
                this.options.buttons?.stop,
            ]
        })
    }

    @Structurable progress() {
        return Row({
            ref: this._refs.progress,
            style: Style({
                position: 'absolute',
                insetInline: '0',
                justifyContent: 'center',
                margin: .5,
            }).merge(this.options.styles?.progress),
            children: Row({
                ref: this._refs.progressBar,
                style: Style({
                    width: '64px',
                    height: '5px',
                    overflow: 'hidden',
                    borderRadius: 'var(--widget-radius)',
                    backgroundColor: 'rgba(0,0,0,.43)',
                }).merge(this.options.styles?.progressBar),
                children: Row({
                    ref: this._refs.progressTrack,
                    style: Style({
                        height: '100%',
                        borderRadius: 'inherit',
                        backgroundColor: '#FFF',
                    }).merge(this.options.styles?.progressTrack),
                    children: ''
                })
            }),
        });
    }

    @Override() main() {
        return useStateful(({buttons, progressive, items, styles, slideable, snappable, direction}) => {


            const _direction = (direction?.value || AligningDirection.Row).toString();
            const itemsStyles: IStyleSheetDeclarations = direction?.value === AligningDirection.Row
                ? {
                    overflowX: slideable?.value ? 'auto' : 'hidden',
                    overflowY: 'hidden',
                    scrollSnapType: snappable?.value ? 'x mandatory' : 'initial',
                }
                : {
                    overflowX: 'hidden',
                    overflowY: slideable?.value ? 'auto' : 'hidden',
                    scrollSnapType: snappable?.value ? 'y mandatory' : 'initial',
                };

            const itemStyles: IStyleSheetDeclarations = direction?.value === AligningDirection.Row
                ? {
                    width: '100%',
                }
                : {
                    height: '100%',
                };

            return Stack({
                ref: this._refs.widget,
                style: Style({
                    flex: '1 1 auto',
                    maxWidth: '100vw',
                }).merge(styles?.value?.widget)
                    .merge({
                        flexDirection: _direction,
                    }),

                signal: {
                    mount: () => this.controlsCenter()
                },
                children: [

                    buttons?.value?.previous ? Stack({
                        ref: this._refs.previous,
                        style: Style({
                            flexDirection: _direction,
                            justifyContent: buttons.value.align || 'center',
                        }).merge(styles?.value?.previous)
                            .merge({
                                alignItems: buttons.value.filled ? 'initial' : 'center',
                            }),
                        children: buttons?.value.previous
                            .style({
                                flex: buttons.value.filled ? '1 1 auto' : 'initial',
                                cursor: 'pointer',
                            }).listen('click', () => this.previous())
                    }) : undefined,

                    Stack({
                        ref: this._refs.wrapper,
                        style: Style({
                            flex: '1 1 auto',
                            position: 'relative',
                        }).merge(styles?.value?.wrapper)
                            .merge({
                                flexDirection: _direction,
                            }),
                        children: [
                            Stack({
                                ref: this._refs.items,
                                style: Style({
                                    flex: '1 1 auto',
                                }).merge(styles?.value?.items)
                                    .merge({
                                        flexDirection: _direction,
                                        whiteSpace: 'nowrap',
                                        ...ScrollbarStyle.Hide(),
                                        ...itemsStyles,
                                    }),
                                children: items.value?.map((item, index) =>
                                    item.children
                                        .style(styles?.value?.item || {})
                                        .style({
                                            flex: 'none',
                                            scrollSnapAlign: snappable?.value ? 'center' : 'none',
                                            ...itemStyles,
                                            boxSizing: 'border-box'
                                        })
                                        .data({carouselItem: `${item.index || index}`,})
                                ),
                            }).data({carouselItems: 'true',}),

                            (
                                buttons?.value?.play ||
                                buttons?.value?.pause ||
                                buttons?.value?.replay ||
                                buttons?.value?.stop
                            ) ? this.structures.controls() : undefined,

                            this.structures.progress().style({
                                display: progressive?.value ? 'flex' : 'none'
                            }),
                        ]
                    }),

                    buttons?.value?.next ? Stack({
                        ref: this._refs.next,
                        style: Style({
                            flexDirection: _direction,
                            justifyContent: buttons.value.align || 'center',
                        }).merge(styles?.value?.next)
                            .merge({
                                alignItems: buttons.value.filled ? 'initial' : 'center',
                            }),
                        children: buttons?.value.next
                            ?.style({
                                flex: buttons.value.filled ? '1 1 auto' : 'initial',
                                alignItems: 'center',
                                cursor: 'pointer',
                            }).listen('click', () => this.next())
                    }) : undefined,

                ]
            })
        }, this.states)
    }

    go(index: number | string): this {
        index = this.computeIndex(index) || 0;
        const direction = this.options.direction || AligningDirection.Row;
        const isRow = direction == AligningDirection.Row;
        const measure = this._refs.items.current?.measure;
        const frame = isRow ? measure?.width : measure?.height;

        if (this._refs.items.current?.clientElement) {
            const gap = (index) * (frame || 0);
            const options: ScrollToOptions = {behavior: 'smooth'};

            if (isRow) options.left = gap;
            if (!isRow) options.top = gap;

            this._refs.items.current.clientElement.scrollTo(options);
            this._index = index;

            if (index === 0)
                this.signal.dispatch('first', this)
            if (index === (this.options.items.length - 1))
                this.signal.dispatch('last', this)
            this.signal.dispatch('change', this)
        }
        return this;
    }

    canNext(): boolean {
        return this.options.loopable || ((this._index + 1) <= (this.options.items.length - 1));
    }

    canPrevious(): boolean {
        return this.options.loopable || ((this._index - 1) >= 0);
    }

    next(): this {
        this.signal.dispatch('next', this)
        return this.go(this._index + 1);
    }

    previous(): this {
        const index = this._index - 1;
        this.signal.dispatch('previous', this)
        return this.go(
            index > -1
                ? index
                : (
                    this.options.loopable
                        ? this.options.items.length - 1
                        : 0
                )
        );
    }

    pause(): this {
        this.signal.dispatch('pause', this)
        return this;
    }

    play(from?: number | string): this {
        const index = from ? this.computeIndex(from) : undefined;
        if (index) this.go(index)
        this.signal.dispatch('play', this)
        return this;
    }

    resume(): this {
        this.play(this._index);
        this.signal.dispatch('resume', this)
        return this;
    }

    stop(): this {
        this.signal.dispatch('stop', this)
        return this;
    }

    setAutoplay(autoplay: boolean): this {
        this.options.autoplay = autoplay;
        this.states.autoplay?.set(autoplay);
        return this;
    }

    addItem(items: ICarouselItem): this {
        this.options.items = [...this.options.items, items];
        this.states.items.set(this.options.items);
        return this;
    }

    setItems(items: ICarouselItem[]): this {
        this.options.items = items;
        this.states.items.set(this.options.items);
        return this;
    }

    setButtons(buttons: ICarouselButtons): this {
        this.options.buttons = buttons;
        this.states.buttons?.set(buttons);
        return this;
    }

}