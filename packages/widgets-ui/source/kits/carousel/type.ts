import {Aligning, AligningDirection, IKit, IKitSignalMap, IRef, IStyleSheet, IWidgetNode} from "@protorians/widgets";


export type ICarouselButton = IWidgetNode<any, any>
export type ICarouselButtons = {
    align?: Aligning;
    filled?: boolean;
    previous?: ICarouselButton;
    next?: ICarouselButton;
    play?: ICarouselButton;
    pause?: ICarouselButton;
    stop?: ICarouselButton;
    replay?: ICarouselButton;
}

export type ICarouselCallable = (carousel: ICarousel) => ICarouselOptions;

export interface ICarouselStyles {
    widget?: IStyleSheet;
    wrapper?: IStyleSheet;
    items?: IStyleSheet;
    item?: IStyleSheet;
    controls?: IStyleSheet;
    control?: IStyleSheet;
    previous?: IStyleSheet;
    next?: IStyleSheet;
    progress?: IStyleSheet;
    progressBar?: IStyleSheet;
    progressTrack?: IStyleSheet;
}

export interface ICarouselItem {
    index?: number | string;
    children: IWidgetNode<any, any>;
}

export interface ICarouselOptions {
    loopable?: boolean;
    snappable?: boolean;
    slideable?: boolean;
    autoplay?: boolean;
    progressive?: boolean;
    duration?: number;
    direction?: AligningDirection;
    buttons?: ICarouselButtons;
    styles?: ICarouselStyles;
    items: ICarouselItem[];
}

export interface ICarouselLayout {
    controls: IWidgetNode<any, any>;
    progress: IWidgetNode<any, any>;
}

export interface ICarouselRefs {
    widget: IRef<HTMLElement, any>;
    wrapper: IRef<HTMLElement, any>;
    items: IRef<HTMLElement, any>;
    controls: IRef<HTMLElement, any>;
    previous: IRef<HTMLElement, any>;
    next: IRef<HTMLElement, any>;
    progress: IRef<HTMLElement, any>;
    progressBar: IRef<HTMLElement, any>;
    progressTrack: IRef<HTMLElement, any>;
}

export interface ICarouselSignalMap extends IKitSignalMap<ICarouselLayout, ICarouselOptions> {
    ready?: ICarousel;
    play?: ICarousel;
    pause?: ICarousel;
    stop?: ICarousel;
    resume?: ICarousel;
    replay?: ICarousel;
    next?: ICarousel;
    previous?: ICarousel;
    change?: ICarousel;
    first?: ICarousel;
    last?: ICarousel;
    "autoplay:start"?: ICarousel;
    "autoplay:complete"?: ICarousel;
}

export interface ICarouselActionable {

    canNext(): boolean;

    canPrevious(): boolean;

    play(from?: number | string): this;

    pause(): this;

    resume(): this;

    stop(): this;

    next(): this;

    previous(): this;

    go(index: number | string): this;
}

export interface ICarousel extends IKit<ICarouselLayout, ICarouselOptions>, ICarouselActionable {
    get refs(): ICarouselRefs;

    setItems(items: ICarouselItem[]): this;

    addItem(items: ICarouselItem): this;

    setAutoplay(autoplay: boolean): this;

    setButtons(buttons: ICarouselButtons): this;
}