import { type IStyleSheetDeclarations } from "@protorians/widgets";
import type { IColoringLayer, ITheme } from "../types/index.js";
export declare class BoxStyle {
    static Container(theme: ITheme, coloring: IColoringLayer): IStyleSheetDeclarations;
    static Buttons(theme: ITheme, coloring: IColoringLayer): IStyleSheetDeclarations;
    static Content(): IStyleSheetDeclarations;
    static Icon(): IStyleSheetDeclarations;
}
