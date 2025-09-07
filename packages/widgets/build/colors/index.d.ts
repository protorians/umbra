import { ColorSchemeType } from "../enums.js";
import { type IColorExtended, type IColorKey, type IColorPaletteAlias, type IColorScheme, type IColorSlots, type IColorimetricAlgo } from "@protorians/colorimetric";
import { IStyleSheet, IStyleSheetDeclarations } from "../types/index.js";
export declare class ColorScheme {
    static generates(type: ColorSchemeType, declarations: IColorScheme): IColorSlots;
    static detect(): ColorSchemeType | undefined;
    static get scheme(): ColorSchemeType;
    static use(callable: (scheme: ColorSchemeType) => void): typeof this;
    static get current(): ColorSchemeType | undefined;
    static set current(scheme: ColorSchemeType | undefined);
    static switch(scheme: ColorSchemeType, target?: HTMLElement | undefined): void;
}
export declare class ColorPalette {
    protected static _stylesheet: IStyleSheet | undefined;
    protected static _algo: IColorimetricAlgo<any> | undefined;
    protected static declarations: IStyleSheetDeclarations;
    static light: Partial<IColorScheme>;
    static dark: Partial<IColorScheme>;
    static set algorithm(algo: IColorimetricAlgo<any>);
    static get algorithm(): IColorimetricAlgo<any>;
    static stylesheet(): IStyleSheet;
    static clear(): typeof this;
    static value<T extends IColorExtended<IColorKey>>(type: ColorSchemeType, name: T): string | undefined;
    static generate(color: string, key: string): string | undefined;
    static generateVariables<T extends IColorExtended<IColorKey>>(key: T, provider?: Partial<IColorScheme>): {
        name: string;
        lightName: string;
        darkName: string;
        value: string;
        light: string;
        dark: string;
    };
    static variable<T extends IColorExtended<IColorKey>>(key: T): string;
}
export declare const Color: IColorPaletteAlias;
