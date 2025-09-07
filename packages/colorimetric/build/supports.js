import { ColorimetricType } from "./enums.js";
import { NumberUtility, TextUtility } from "@protorians/core";
export var Colorimetric;
(function (Colorimetric) {
    Colorimetric.RGB_PATTERN = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
    Colorimetric.RGBA_PATTERN = /rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),(.*)\)/;
    Colorimetric.OKLCH_PATTERN = /oklch\(([^)]+)\)/;
    Colorimetric.HEX_PATTERN = /#[0-9A-Fa-f]{6}/;
    Colorimetric.HEX_ALPHA_PATTERN = /#[0-9A-Fa-f]{8}/;
    Colorimetric.Settings = {
        type: ColorimetricType.Oklch,
        lightness: {
            breakpoint: 50,
            min: 5,
            middle: 50,
            max: 95,
            ease: .16,
        },
    };
    function render(hex, alpha = 100) {
        return Colorimetric.Settings.type === ColorimetricType.Oklch
            ? Colorimetric.Oklch.toString({ ...Hex.toOklch(hex), alpha })
            : `${hex}${NumberUtility.pad(Math.round(alpha * .001 * 255).toString(16))}`;
    }
    Colorimetric.render = render;
    function spectre(value) {
        return value < 0 ? 0 : (value > 255 ? 255 : value);
    }
    Colorimetric.spectre = spectre;
    function serialize(color) {
        if (Array.isArray(color)) {
            if (color.length == 3)
                return Rgba.toHex(...color);
            else if (color.length == 4)
                return Rgba.alphaToHex(...color);
        }
        else {
            color = color.trim();
            if (color.toLowerCase().startsWith(`rgb(`)) {
                const rgb = TextUtility.trimSpace(color).match(Colorimetric.RGB_PATTERN);
                return rgb ? Rgba.toHex(parseFloat(rgb[1] || '0'), parseFloat(rgb[2] || '0'), parseFloat(rgb[3] || '0')) : '#000000';
            }
            else if (color.toLowerCase().startsWith(`rgba(`)) {
                const rgb = TextUtility.trimSpace(color).match(Colorimetric.RGBA_PATTERN);
                return rgb ? Rgba.alphaToHex(parseInt(rgb[1] || '0'), parseInt(rgb[2] || '0'), parseInt(rgb[3] || '0'), (parseInt(rgb[4] || '1', 16) / 255)) : '#000000';
            }
            else if (color.toLowerCase().startsWith(`oklch(`)) {
                const get = Colorimetric.Oklch.parse(color);
                return get ? Colorimetric.Oklch.toHex(get) : '#000000FF';
            }
            else if (color.includes(',')) {
                const parse = color.split(',').map(v => parseInt(v, 1));
                const rgb = parse.length == 3 || parse.length == 4 ? parse : undefined;
                if (rgb) {
                    if (rgb.length == 3)
                        return Rgba.toHex(...rgb);
                    else if (rgb.length == 4)
                        return Rgba.alphaToHex(...rgb);
                }
            }
            else if (color.length == 4 && color.startsWith('#')) {
                const hex = color.substring(1);
                return `#${hex}${hex}`;
            }
        }
        return TextUtility.trimSpace(`${color}`);
    }
    Colorimetric.serialize = serialize;
    function validate(value) {
        return CSS.supports('color', value);
    }
    Colorimetric.validate = validate;
    function adjust(color, amount) {
        let usePound = false;
        if (color[0] === "#") {
            color = color.slice(1);
            usePound = true;
        }
        const num = parseInt(color, 16);
        let r = (num >> 16) + amount;
        let g = ((num >> 8) & 0x00FF) + amount;
        let b = (num & 0x0000FF) + amount;
        r = Math.min(255, Math.max(0, r));
        g = Math.min(255, Math.max(0, g));
        b = Math.min(255, Math.max(0, b));
        return (usePound ? "#" : "") + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    Colorimetric.adjust = adjust;
    function resolveVariant(color, ...variants) {
        const hex = serialize(color);
        const drift = 160;
        if (variants.length === 0) {
            return render(color);
        }
        else if (variants.length === 1) {
            const variant = variants[0].toLowerCase();
            if (!isNaN(parseInt(variant))) {
                return generateVariant(hex, parseInt(variant) * .001 + 4);
            }
            else if (variant === 'alpha') {
                return Rgba.toAlphaString(hex, 5);
            }
            else if (variant === 'rgb') {
                return Rgba.toString(hex);
            }
            else if (variant === 'invert') {
                const intense = intensity(hex);
                const isDark = intense <= drift;
                return render(isDark ? lightness(hex, drift) : darkness(hex, drift));
            }
            else if (variant === 'intensity') {
                return intensity(hex);
            }
        }
        else if (variants.length === 2) {
            console.warn(color, variants);
        }
        return undefined;
    }
    Colorimetric.resolveVariant = resolveVariant;
    function generates(key, color, drift = 160) {
        const hex = serialize(color);
        const intense = intensity(hex);
        const isDark = intense <= drift;
        let payload = {};
        payload[`${key}`] = render(hex);
        payload[`${key}-rgb`] = Rgba.toString(hex);
        payload[`${key}-alpha`] = Rgba.toAlphaString(hex, 5);
        payload[`${key}-intensity`] = `${intense}`;
        payload[`${key}-invert`] = render(isDark ? lightness(hex, drift) : darkness(hex, drift));
        for (let i = 1; i <= 9; i++) {
            const oKey = `${key}-alpha-${i}`;
            payload[oKey] = alpha(hex, i * 10);
        }
        payload = { ...payload, ...generateVariants(key, color, drift) };
        return payload;
    }
    Colorimetric.generates = generates;
    function alpha(color, alpha) {
        const hex = serialize(color);
        return render(hex, alpha);
    }
    Colorimetric.alpha = alpha;
    function generateVariants(key, color, drift = 160) {
        const hex = serialize(color);
        const intense = intensity(hex);
        const isDark = intense <= drift;
        let payload = {};
        for (let index = 1; index <= 9; index++) {
            const vKey = `${key}-${index * 100}`;
            const variant = adjust(hex, index * 10 - 9 * (isDark ? 1 : 9));
            payload[vKey] = render(variant);
            for (let i = 1; i <= 9; i++) {
                const voKey = `${vKey}-alpha-${i}`;
                payload[voKey] = alpha(variant, i * 10);
            }
        }
        return payload;
    }
    Colorimetric.generateVariants = generateVariants;
    function generateVariant(color, index, drift = 160) {
        const hex = serialize(color);
        const intense = intensity(hex);
        const isDark = intense <= drift;
        const variant = adjust(hex, index * 10 - 9 * (isDark ? 1 : 9));
        return render(variant);
    }
    Colorimetric.generateVariant = generateVariant;
    function byteValues(value) {
        return NumberUtility.clamp(value, 0, 255);
    }
    Colorimetric.byteValues = byteValues;
    function primary(color, m) {
        color = Math.floor((color + m) * 255);
        if (color < 0)
            color = 0;
        return color;
    }
    Colorimetric.primary = primary;
    function invert(color) {
        const hex = serialize(color);
        return `#${[
            NumberUtility.pad((255 - parseInt(hex.slice(1, 3), 16)).toString(16)),
            NumberUtility.pad((255 - parseInt(hex.slice(3, 5), 16)).toString(16)),
            NumberUtility.pad((255 - parseInt(hex.slice(5, 7), 16)).toString(16)),
        ].join('')}`;
    }
    Colorimetric.invert = invert;
    function red(color) {
        return (parseInt(serialize(color).substring(1), 16) >> 16) & 255;
    }
    Colorimetric.red = red;
    function green(color) {
        return (parseInt(serialize(color).substring(1), 16) >> 8) & 255;
    }
    Colorimetric.green = green;
    function blue(color) {
        return parseInt(serialize(color).substring(1), 16) & 255;
    }
    Colorimetric.blue = blue;
    function hue(color, amount = 1) {
        const hsl = Hsl.to(serialize(color));
        hsl.hue = hsl.hue + (byteValues(amount) / 255);
        return serialize(Hsl.toRgb(hsl));
    }
    Colorimetric.hue = hue;
    function saturate(color, amount = 0) {
        const hsl = Hsl.to(serialize(color));
        hsl.saturation = hsl.saturation + (byteValues(amount) / 255);
        return serialize(Hsl.toRgb(hsl));
    }
    Colorimetric.saturate = saturate;
    function scale(color, amount = 0, sens = true) {
        const rgb = Hex.toRgba(serialize(color));
        return Rgba.alphaToHex(byteValues(sens ? rgb.red + amount : rgb.red - amount), byteValues(sens ? rgb.green + amount : rgb.green - amount), byteValues(sens ? rgb.blue + amount : rgb.blue - amount), rgb.alpha);
    }
    Colorimetric.scale = scale;
    function lightness(color, amount = 0) {
        return scale(color, amount, true);
    }
    Colorimetric.lightness = lightness;
    function darkness(color, amount = 0) {
        return scale(color, amount, false);
    }
    Colorimetric.darkness = darkness;
    function whiteness(color, amount = 0) {
        const hsl = Hsl.to(serialize(color));
        hsl.lightness = hsl.lightness + (byteValues(amount) / 255);
        return serialize(Hsl.toRgb(hsl));
    }
    Colorimetric.whiteness = whiteness;
    function blackness(color, amount = 0) {
        const hsl = Hsl.to(serialize(color));
        hsl.lightness = hsl.lightness - (byteValues(amount) / 255);
        return serialize(Hsl.toRgb(hsl));
    }
    Colorimetric.blackness = blackness;
    function intensity(color) {
        const rgb = parseInt(serialize(color).substring(1), 16);
        return Math.ceil(0.2126 * ((rgb >> 16) & 0xff) + 0.7152 * ((rgb >> 8) & 0xff) + 0.0722 * ((rgb >> 0) & 0xff));
    }
    Colorimetric.intensity = intensity;
    function getOpacity(color) {
        return Hex.toRgba(serialize(color)).alpha;
    }
    Colorimetric.getOpacity = getOpacity;
    class Hex {
        static toString(hexColor) {
            return `#${hexColor.replace(/[^0-9a-fA-F]/g, '')}`;
        }
        static decimal(value) {
            const hex = (value).toString(16);
            return (hex.length == 1 ? `0${hex}` : hex).substring(0, 2);
        }
        static toOklch(hex) {
            return Lch.toOklch(Lab.toLch(Xyz.toLab(Rgba.toXyz(this.toRgb(hex)))));
        }
        static toRgb(color) {
            const rgb = parseInt(serialize(color).substring(1, 7), 16);
            return {
                red: (rgb >> 16) & 0xff,
                green: (rgb >> 8) & 0xff,
                blue: (rgb >> 0) & 0xff,
            };
        }
        static toRgba(color) {
            const hex = serialize(color);
            const rgb = parseInt(hex.substring(1, 7), 16);
            return rgb ? {
                red: (rgb >> 16) & 0xff,
                green: (rgb >> 8) & 0xff,
                blue: (rgb >> 0) & 0xff,
                alpha: (parseInt(hex.substring(7, 9) || 'ff', 16) / 255),
            } : {
                red: 0,
                green: 0,
                blue: 0,
                alpha: 1,
            };
        }
    }
    Colorimetric.Hex = Hex;
    class Xyz {
        static toLab({ x, y, z }) {
            x /= 95.047;
            y /= 100.000;
            z /= 108.883;
            x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
            y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
            z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);
            return {
                l: (116 * y) - 16,
                a: 500 * (x - y),
                b: 200 * (y - z),
            };
        }
        static toRgb({ x, y, z }) {
            x /= 100;
            y /= 100;
            z /= 100;
            let r = x * 3.2406 + y * -1.5372 + z * -0.4986;
            let g = x * -0.9689 + y * 1.8758 + z * 0.0415;
            let b = x * 0.0557 + y * -0.2040 + z * 1.0570;
            r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
            g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
            b = b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b;
            return {
                red: Math.round(Math.min(Math.max(0, r), 1) * 255),
                green: Math.round(Math.min(Math.max(0, g), 1) * 255),
                blue: Math.round(Math.min(Math.max(0, b), 1) * 255),
            };
        }
    }
    Colorimetric.Xyz = Xyz;
    class Hsl {
        static to(color) {
            const hex = serialize(color), r = red(hex), g = green(hex), b = blue(hex), max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min, lightness = (max + min) / 2;
            return {
                hue: (delta == 0 ? 0 : ((max == r) ? 60 * (((g - b) / delta) % 6) : ((max == g) ? 60 * (((b - r) / delta) + 2) : (60 * (((r - g) / delta) + 4))))),
                saturation: (delta == 0) ? 0 : (delta / (1 - Math.abs(2 * lightness - 1))),
                lightness
            };
        }
        static toRgb(hsl) {
            let calculate = (1 - Math.abs(2 * hsl.lightness - 1)) * hsl.saturation, auto = calculate * (1 - Math.abs((hsl.hue / 60) % 2 - 1)), lightness = hsl.lightness - calculate / 2, red = 0, green = 0, blue = 0;
            if (hsl.hue < 60) {
                red = calculate;
                green = auto;
                blue = 0;
            }
            else if (hsl.hue < 120) {
                red = auto;
                green = calculate;
                blue = 0;
            }
            else if (hsl.hue < 180) {
                red = 0;
                green = calculate;
                blue = auto;
            }
            else if (hsl.hue < 240) {
                red = 0;
                green = auto;
                blue = calculate;
            }
            else if (hsl.hue < 300) {
                red = auto;
                green = 0;
                blue = calculate;
            }
            else {
                red = calculate;
                green = 0;
                blue = auto;
            }
            red = primary(red, lightness);
            green = primary(green, lightness);
            blue = primary(blue, lightness);
            return Rgba.toString(Rgba.toHex(red, green, blue));
        }
    }
    Colorimetric.Hsl = Hsl;
    class Rgba {
        static toHex(red, green, blue) {
            return `#${Hex.decimal(red)}${Hex.decimal(green)}${Hex.decimal(blue)}`.toUpperCase();
        }
        static alphaToHex(red, green, blue, alpha) {
            return Hex.toString(`#${Hex.decimal(red)}${Hex.decimal(green)}${Hex.decimal(blue)}${((alpha * 255) | 1 << 8).toString(16).substring(1)}`);
        }
        static toString(color) {
            const rgb = Hex.toRgb(serialize(color));
            return TextUtility.trimSpace(`rgb(${spectre(rgb.red)}, ${spectre(rgb.green)}, ${spectre(rgb.blue)})`);
        }
        static toAlphaString(color, alpha) {
            const rgb = Hex.toRgb(serialize(color));
            alpha = alpha > 1 ? alpha / 10 : alpha;
            alpha = alpha < 0 ? alpha : Math.abs(alpha);
            return TextUtility.trimSpace(`rgba(${spectre(rgb.red)}, ${spectre(rgb.green)}, ${spectre(rgb.blue)}, ${NumberUtility.decimalPercent(alpha)})`);
        }
        static toXyz({ red, green, blue }) {
            red /= 255;
            green /= 255;
            blue /= 255;
            red = red > 0.04045 ? Math.pow((red + 0.055) / 1.055, 2.4) : red / 12.92;
            green = green > 0.04045 ? Math.pow((green + 0.055) / 1.055, 2.4) : green / 12.92;
            blue = blue > 0.04045 ? Math.pow((blue + 0.055) / 1.055, 2.4) : blue / 12.92;
            red *= 100;
            green *= 100;
            blue *= 100;
            return {
                x: red * 0.4124 + green * 0.3576 + blue * 0.1805,
                y: red * 0.2126 + green * 0.7152 + blue * 0.0722,
                z: red * 0.0193 + green * 0.1192 + blue * 0.9505,
            };
        }
    }
    Colorimetric.Rgba = Rgba;
    Colorimetric.Oklch = {
        toString(color) {
            color.lightness = NumberUtility.percent(color.lightness);
            color.alpha = NumberUtility.percent(color.alpha || 100);
            return `oklch(${color.lightness}% ${color.chroma} ${color.hue}${color.alpha < 100 ? ` / ${color.alpha}%` : ``})`;
        },
        parse(color) {
            let match = color.match(Colorimetric.OKLCH_PATTERN);
            if (match) {
                const explode = match[1].replace(/\s\/\s/gi, ' ').split(' ');
                return {
                    lightness: parseFloat(`${!explode[0].includes('%') ? parseFloat(explode[0] || '0') * 100 : explode[0]}`),
                    chroma: parseFloat(explode[1]),
                    hue: parseFloat(explode[2]),
                    alpha: explode[3] ? parseFloat(explode[3]) : 100
                };
            }
            return undefined;
        },
        variation(color, value) {
            const parsed = typeof color === 'string' ? this.parse(color) : color;
            if (parsed) {
                let integer = parseInt(value);
                if (!isNaN(integer)) {
                    parsed.lightness = NumberUtility.clamp(100 - (integer * .1), Colorimetric.Settings.lightness.min, Colorimetric.Settings.lightness.max);
                }
                else if (value === 'weak') {
                    parsed.lightness = NumberUtility.clamp(parsed.lightness + ((100 - parsed.lightness) * .2), Colorimetric.Settings.lightness.min, 100);
                }
                else if (value === 'heavy') {
                    parsed.lightness = NumberUtility.clamp(parsed.lightness - ((100 - parsed.lightness) * .2), Colorimetric.Settings.lightness.min, Colorimetric.Settings.lightness.max);
                }
                else if (value === 'alpha') {
                    parsed.lightness = Colorimetric.Settings.lightness.middle;
                }
                else if (value === 'invert') {
                    parsed.lightness = (parsed.lightness >= Colorimetric.Settings.lightness.breakpoint
                        ? Math.max(100 - parsed.lightness, Colorimetric.Settings.lightness.min)
                        : Math.min(100 - parsed.lightness, Colorimetric.Settings.lightness.max));
                }
                else if (value.startsWith('a')) {
                    parsed.alpha = NumberUtility.percent(parseInt(value.substring(1)) * 10);
                }
            }
            return parsed;
        },
        toHex(oklch) {
            const lch = this.toLch(oklch);
            const lab = Lch.toLab(lch);
            const xyz = Lab.toXyz(lab);
            const rgb = Xyz.toRgb(xyz);
            return Rgba.toHex(rgb.red, rgb.green, rgb.blue);
        },
        toLch({ lightness, chroma, hue }) {
            return {
                lightness,
                chroma,
                hue
            };
        },
    };
    class Lch {
        static toString(color) {
            color.lightness = NumberUtility.percent(color.lightness);
            color.alpha = NumberUtility.percent(color.alpha || 100);
            color.hue = spectre(color.hue);
            return `lch(${color.lightness}% ${color.chroma} ${color.hue}deg${color.alpha < 100 ? ` / ${color.alpha}%` : ``})`;
        }
        static toOklch({ lightness, chroma, hue, alpha }) {
            return {
                lightness: parseFloat((lightness / 100).toFixed(3)),
                chroma: parseFloat((chroma / 100).toFixed(3)),
                hue: parseFloat(hue.toFixed(2)),
                alpha: alpha || 100,
            };
        }
        static toLab({ lightness, chroma, hue }) {
            const a = chroma * Math.cos(hue * (Math.PI / 180));
            const b = chroma * Math.sin(hue * (Math.PI / 180));
            return { l: lightness, a, b };
        }
    }
    Colorimetric.Lch = Lch;
    class Lab {
        static toString({ l, a, b }) {
            return `lab(${l}% ${a} ${b})`;
        }
        static toLch({ l, a, b }) {
            const c = Math.sqrt(a * a + b * b);
            let h = Math.atan2(b, a) * (180 / Math.PI);
            if (h < 0)
                h += 360;
            return {
                lightness: parseFloat(l.toFixed(2)),
                chroma: parseFloat(c.toFixed(2)),
                hue: parseFloat(h.toFixed(2)),
                alpha: 100,
            };
        }
        static toXyz({ l, a, b }) {
            let y = (l + 16) / 116;
            let x = a / 500 + y;
            let z = y - b / 200;
            const y3 = Math.pow(y, 3);
            const x3 = Math.pow(x, 3);
            const z3 = Math.pow(z, 3);
            y = y3 > 0.008856 ? y3 : (y - 16 / 116) / 7.787;
            x = x3 > 0.008856 ? x3 : (x - 16 / 116) / 7.787;
            z = z3 > 0.008856 ? z3 : (z - 16 / 116) / 7.787;
            x *= 95.047;
            y *= 100.0;
            z *= 108.883;
            return {
                x: parseFloat(x.toFixed(2)),
                y: parseFloat(y.toFixed(2)),
                z: parseFloat(z.toFixed(2)),
            };
        }
    }
    Colorimetric.Lab = Lab;
})(Colorimetric || (Colorimetric = {}));
