import { IColorHex, IColorHslProps, IColorimetricAlgo, IColorimetricSettings, IColorKey, IColorLab, IColorLch, IColorOklch, IColorRgb, IColorRgbAlpha, IColorSlots, IColorValueSyntax, IColorXyz, IOklchAlgo } from "./types.js";
export declare namespace Colorimetric {
    const RGB_PATTERN: RegExp;
    const RGBA_PATTERN: RegExp;
    const OKLCH_PATTERN: RegExp;
    const HEX_PATTERN: RegExp;
    const HEX_ALPHA_PATTERN: RegExp;
    const Settings: IColorimetricSettings;
    function render(hex: string, alpha?: number): string;
    function spectre(value: number): number;
    function serialize(color: IColorValueSyntax): IColorHex;
    function validate(value: string): boolean;
    function adjust(color: string, amount: number): string;
    function resolveVariant(color: string, ...variants: string[]): string | number | undefined;
    function generates<T extends IColorKey>(key: T, color: string, drift?: number): IColorSlots;
    function alpha(color: string, alpha: number): string;
    function generateVariants<T extends string>(key: T, color: string, drift?: number): IColorSlots;
    function generateVariant(color: string, index: number, drift?: number): string;
    function byteValues(value: number): number;
    function primary(color: number, m: number): number;
    function invert(color: IColorValueSyntax): string;
    function red(color: IColorValueSyntax): number;
    function green(color: IColorValueSyntax): number;
    function blue(color: IColorValueSyntax): number;
    function hue(color: IColorValueSyntax, amount?: number): string;
    function saturate(color: IColorValueSyntax, amount?: number): string;
    function scale(color: IColorValueSyntax, amount?: number, sens?: boolean): string;
    function lightness(color: IColorValueSyntax, amount?: number): string;
    function darkness(color: IColorValueSyntax, amount?: number): string;
    function whiteness(color: IColorValueSyntax, amount?: number): string;
    function blackness(color: IColorValueSyntax, amount?: number): string;
    function intensity(color: IColorValueSyntax): number;
    function getOpacity(color: IColorValueSyntax): number;
    class Hex {
        static toString(hexColor: string): string;
        static decimal(value: number): string;
        static toOklch(hex: string): IColorOklch;
        static toRgb(color: IColorHex): IColorRgb;
        static toRgba(color: IColorHex): IColorRgbAlpha;
    }
    class Xyz {
        static toLab({ x, y, z }: IColorXyz): IColorLab;
        static toRgb({ x, y, z }: IColorXyz): IColorRgb;
    }
    class Hsl {
        static to(color: IColorValueSyntax): IColorHslProps;
        static toRgb(hsl: IColorHslProps): string;
    }
    class Rgba {
        static toHex(red: number, green: number, blue: number): string;
        static alphaToHex(red: number, green: number, blue: number, alpha: number): string;
        static toString(color: IColorValueSyntax): string;
        static toAlphaString(color: IColorValueSyntax, alpha: number): string;
        static toXyz({ red, green, blue }: IColorRgb): IColorXyz;
    }
    const Oklch: IColorimetricAlgo<IColorOklch> & IOklchAlgo;
    class Lch {
        static toString(color: IColorLch): string;
        static toOklch({ lightness, chroma, hue, alpha }: IColorLch): IColorOklch;
        static toLab({ lightness, chroma, hue }: IColorLch): IColorLab;
    }
    class Lab {
        static toString({ l, a, b }: IColorLab): string;
        static toLch({ l, a, b }: IColorLab): IColorLch;
        static toXyz({ l, a, b }: IColorLab): IColorXyz;
    }
}
