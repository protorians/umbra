import { CarouselKit } from "../../kits/index.js";
export function ThemeCarousel(options) {
    return CarouselKit.callable(typeof options === "function" ? options : () => options);
}
