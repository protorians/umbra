import { type IKit, Kit } from "@protorians/widgets";
import type { ICarousel, ICarouselButtons, ICarouselItem, ICarouselLayout, ICarouselOptions, ICarouselRefs, ICarouselSignalMap } from "./type.js";
import { IAnimetric } from "@protorians/animetric";
import { ISignalStack } from "@protorians/core";
export declare class CarouselKit extends Kit<ICarouselLayout, ICarouselOptions> implements ICarousel, IKit<ICarouselLayout, ICarouselOptions> {
    protected _index: number;
    protected _autoplayTracking: IAnimetric | undefined;
    protected _autoplayStatus: boolean | null;
    protected _refs: ICarouselRefs;
    protected computeIndex(index: number | string): number | undefined;
    protected initializeTracking(): this;
    protected controlUi(): {
        play: () => void;
        pause: () => void;
        stop: () => void;
    };
    protected controlsCenter(): this;
    get refs(): ICarouselRefs;
    signal: ISignalStack<ICarouselSignalMap>;
    controls(): import("@protorians/widgets").RowStackWidget;
    progress(): import("@protorians/widgets").RowStackWidget;
    main(): import("@protorians/widgets").IWidgetNode<HTMLElement, import("@protorians/widgets").IAttributes>;
    go(index: number | string): this;
    canNext(): boolean;
    canPrevious(): boolean;
    next(): this;
    previous(): this;
    pause(): this;
    play(from?: number | string): this;
    resume(): this;
    stop(): this;
    setAutoplay(autoplay: boolean): this;
    addItem(items: ICarouselItem): this;
    setItems(items: ICarouselItem[]): this;
    setButtons(buttons: ICarouselButtons): this;
}
