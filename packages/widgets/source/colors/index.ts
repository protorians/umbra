import {ColorSchemeType} from "../enums.js";
import {Style, StyleWidget} from "../style.js";
import {
    Colorimetric,
    type IColorExtended,
    type IColorKey,
    type IColorOklch,
    type IColorPaletteAlias,
    type IColorScheme,
    type IColorSchemes,
    type IColorSlots,
    type IColorimetricAlgo,
} from "@protorians/colorimetric";
import {IStyleSheet, IStyleSheetDeclarations, IStyleSheetPropertyKey} from "../types/index.js";
import {WidgetException} from "../errors/index.js";


const schemes: IColorSchemes = {
    light: {} as IColorSlots,
    dark: {} as IColorSlots,
}

export class ColorScheme {

    static generates(type: ColorSchemeType, declarations: IColorScheme): IColorSlots {
        Object.keys(declarations)
            .forEach(key => {
                schemes[type] = {...schemes[type], ...Colorimetric.generates(key as IColorKey, declarations[key])}
            })
        return schemes[type];
    }

    static detect() {
        return (window.matchMedia)
            ? (
                window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? ColorSchemeType.Dark
                    : ColorSchemeType.Light
            )
            : undefined;
    }

    static get scheme(): ColorSchemeType {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? ColorSchemeType.Dark : ColorSchemeType.Light;
    }

    static use(callable: (scheme: ColorSchemeType) => void): typeof this {
        if ('matchMedia' in window) {
            const fn = (e?: any) =>
                callable(
                    typeof e === 'undefined'
                        ? this.current as ColorSchemeType :
                        (e.matches ? ColorSchemeType.Dark : ColorSchemeType.Light)
                );
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', fn);
            fn()
        } else throw (new WidgetException(`matchMedia not supported in ColorPalette:Scheme `)).show()
        return this;
    }

    static get current() {
        const noUse = document.documentElement.hasAttribute('theme:no-scheme')
        if (!noUse) return (document.documentElement.getAttribute('theme:scheme') || this.detect()) as ColorSchemeType
        return this.detect();
    }

    static set current(scheme) {
        scheme = scheme || this.detect();
        const noUse = document.documentElement.hasAttribute('theme:no-scheme')

        if (!noUse) {
            document.documentElement.setAttribute('theme:scheme', `${scheme as string}`)
        }
    }

    static switch(scheme: ColorSchemeType, target?: HTMLElement | undefined) {
        scheme = scheme || this.detect();
        const noUse = (target || document.documentElement).hasAttribute('theme:no-scheme')

        if (!noUse) {
            (target || document.documentElement).setAttribute('theme:scheme', `${scheme as string}`)
        }
    }


}


export class ColorPalette {

    protected static _stylesheet: IStyleSheet | undefined;
    protected static _algo: IColorimetricAlgo<any> | undefined;
    protected static declarations: IStyleSheetDeclarations = {} as IStyleSheetDeclarations;

    static light: Partial<IColorScheme> = {
        text: 'oklch(12.75% 0.0375 251.46)',
        tint: 'oklch(95.21% 0 0)',
        ascent: 'oklch(56% 0.1933 256.16)',
        ascentfore: 'oklch(95.29% 0.1933 256.16)',
        one: 'oklch(56.29% 0.1933 256.16)',
        onefore: 'oklch(96.29% 0.1933 256.16)',
        two: 'oklch(67.51% 0.1493 246.05)',
        twofore: 'oklch(1.51% 0.1493 246.05)',
        three: 'oklch(48.7% 0.1959 328.46)',
        threefore: 'oklch(90.7% 0.1959 328.46)',
        four: 'oklch(43.74% 0.1762 297.9)',
        fourfore: 'oklch(90.74% 0.1762 297.9)',
        five: 'oklch(37.37% 0.1806 267.58)',
        fivefore: 'oklch(90% 0.1806 267.58)',
        error: 'oklch(48.42% 0.1891 28.19)',
        errorfore: 'oklch(90.42% 0.1891 28.19)',
        warning: 'oklch(80.81% 0.1613 103.51)',
        warningfore: 'oklch(10.81% 0.1613 103.51)',
        success: 'oklch(55.04% 0.1827 142.37)',
        successfore: 'oklch(90% 0.1827 142.37)',
        white: 'oklch(100% 0 0)',
        whitefore: 'oklch(10% 0 0)',
        black: 'oklch(0% 0 0)',
        blackfore: 'oklch(90% 0 0)',
    };

    static dark: Partial<IColorScheme> = {
        text: 'oklch(87.25% 0.0375 251.46)',
        tint: 'oklch(4.79% 0 0)',
        one: 'oklch(43.71% 0.1933 256.16)',
        onefore: 'oklch(95.71% 0.1933 256.16)',
        two: 'oklch(32.49% 0.1493 246.05)',
        twofore: 'oklch(95.49% 0.1493 246.05)',
        three: 'oklch(51.3% 0.1959 328.46)',
        threefore: 'oklch(95.3% 0.1959 328.46)',
        four: 'oklch(56.26% 0.1762 297.9)',
        fourfore: 'oklch(96.26% 0.1762 297.9)',
        five: 'oklch(62.63% 0.1806 267.58)',
        fivefore: 'oklch(92.63% 0.1806 267.58)',
        error: 'oklch(51.58% 0.1891 28.19)',
        errorfore: 'oklch(96.58% 0.1891 28.19)',
        warning: 'oklch(19.19% 0.1613 103.51)',
        warningfore: 'oklch(95.19% 0.1613 103.51)',
        success: 'oklch(44.96% 0.1827 142.37)',
        successfore: 'oklch(90.96% 0.1827 142.37)',
        white: 'oklch(100% 0 0)',
        whitefore: 'oklch(10% 0 0)',
        black: 'oklch(0% 0 0)',
        blackfore: 'oklch(100% 0 0)',
    };

    static set algorithm(algo: IColorimetricAlgo<any>) {
        this._algo = algo;
    }

    static get algorithm(): IColorimetricAlgo<any> {
        return this._algo || Colorimetric.Oklch;
    }

    static stylesheet(): IStyleSheet {
        this._stylesheet = this._stylesheet || (new StyleWidget({attach: true}))
        return this._stylesheet;
    }

    static clear(): typeof this {
        this.declarations = {} as IStyleSheetDeclarations;
        this._stylesheet?.clear()
        return this;
    }

    static value<T extends IColorExtended<IColorKey>>(type: ColorSchemeType, name: T): string | undefined {
        const scheme = this[type];
        const color = scheme ? scheme[name as keyof IColorScheme] || undefined : undefined;
        const parsed = color ? this.algorithm.parse(color) : undefined;
        return parsed ? this.algorithm.toString(parsed) : undefined;
    }

    static generate(color: string, key: string) {
        const parsed = this.algorithm.parse(color);
        if (!parsed) return undefined;

        const xpath = `${key as string}`.split('-')
        const variants = xpath.slice(1);
        let calculate: IColorOklch | undefined = parsed;

        for (let index = 0; index < variants.length; index++)
            if (calculate) calculate = this.algorithm.variation(calculate, variants[index])

        if (!calculate) return undefined;

        return this.algorithm.toString(calculate);
    }

    static generateVariables<T extends IColorExtended<IColorKey>>(key: T, provider?: Partial<IColorScheme>) {
        const schemes = Object.values(ColorSchemeType);
        const values: Record<string, string> = {};
        const parsed = schemes
            .map(type => {
                if (!type) return undefined;

                const scheme = provider || this[type];
                const xpath = `${key as string}`.split('-')
                const color = scheme[xpath[0]] || undefined

                if (!color) return undefined;
                values[type] = String(this.generate(color, key));

                return {type, value: values[type]};
            })
            .filter(v => typeof v !== 'undefined')

        return {
            name: `--color-${key}`,
            lightName: `--color-light-${key}`,
            darkName: `--color-dark-${key}`,
            value: `light-dark(${
                parsed.map(({type}) =>
                    `var(--color-${type}-${key})`
                ).join(',')
            })`,
            light: `${values.light}`,
            dark: `${values.dark}`,
        };

    }

    static variable<T extends IColorExtended<IColorKey>>(key: T) {
        const generated = this.generateVariables(key);
        const stylesheets: IStyleSheetDeclarations = {};
        this.declarations[`--color-light-${key}` as IStyleSheetPropertyKey] = generated.light;
        this.declarations[`--color-dark-${key}` as IStyleSheetPropertyKey] = generated.dark;
        this.declarations[`--color-${key}` as IStyleSheetPropertyKey] = generated.value;

        stylesheets[':root, :host'] = Style(this.declarations);
        this.stylesheet()
            ?.sync(stylesheets)

        return `var(--color-${key})`;
    }
}

export const Color = new Proxy<IColorPaletteAlias>({} as IColorPaletteAlias, {
    get(target: IColorSlots, key: string): string | undefined {
        key = key.replace(/[_]/gi, '-');
        target[key] = ColorPalette.variable(key as IColorExtended<IColorKey>)
        return target[key] || undefined;
    },
})
