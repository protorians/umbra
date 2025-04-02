import {ColorPalette} from "@protorians/widgets";
import {KatonTheme} from "@widgetui/katon-theme";


ColorPalette.light = {
    one: 'oklch(0.494 0.155 3.545)',
    two: 'oklch(0.47 0.168 6.073)',
    three: 'oklch(0.473 0.184 297.935)',
    four: 'oklch(0.324 0.138 296.336)',
    five: 'oklch(0.407 0.217 271.09)',
    text: 'oklch(0.123 0.05 29.234)',
    tint: 'oklch(0.997 0 89.876)',
    error: 'oklch(48.42% 0.1891 28.19)',
    warning: 'oklch(0.705 0.137 103.58)',
    success: 'oklch(55.04% 0.1827 142.37)',
    white: 'oklch(100% 0 0)',
    black: 'oklch(0% 0 0)',
}

ColorPalette.dark = {
    one: 'oklch(0.42 0.12 3.545)',
    two: 'oklch(0.40 0.13 6.073)',
    three: 'oklch(0.38 0.14 297.935)',
    four: 'oklch(0.28 0.10 296.336)',
    five: 'oklch(0.35 0.15 271.09)',
    text: 'oklch(1 0 89.876)',
    tint: 'oklch(4.79% 0 0)',
    error: 'oklch(45% 0.14 28.19)',
    warning: 'oklch(0.65 0.10 103.58)',
    success: 'oklch(50% 0.15 142.37)',
    white: 'oklch(90% 0 0)',
    black: 'oklch(10% 0 0)',
}

export const Theme = (new KatonTheme).attach('html');