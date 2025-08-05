import {type IChildren} from "@protorians/widgets";
import {type ICarouselOptions, CarouselKit, ICarouselCallable} from "../../kits/index.js";

export function ThemeCarousel(options: ICarouselOptions | ICarouselCallable): IChildren<any> {
    return CarouselKit.callable(typeof options === "function" ? options : () => options)
}