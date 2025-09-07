import { type IColoringLayer, type IThemeSettings, IThemeStylesheet, LayerVariant, WidgetTheme } from "@widgetui/core";
import { type IAttributes, ICommonAttributes, type IWidgetDeclaration, type IWidgetNode } from "@protorians/widgets";
import { type IThemeAccordionOptions, IThemeCardOptions, type IThemeSelectOptions, type ThemeAlertDialogOptions, ThemeSheetOptions } from "@widgetui/core/composites";
import { type ICarouselCallable, type ICarouselOptions } from "@widgetui/core/kits/index.js";
export declare class KatonTheme extends WidgetTheme {
    get name(): string;
    protected prepareSettings(settings: Partial<IThemeSettings>): Partial<IThemeSettings>;
    get stylesheet(): IThemeStylesheet;
    outlineColoringResolves(color: LayerVariant): IColoringLayer;
    coloringResolves(color: LayerVariant): IColoringLayer;
    Accordion(declaration: IThemeAccordionOptions): IWidgetNode<any, any> | undefined;
    AlertDialog(declaration: ThemeAlertDialogOptions): IWidgetNode<any, any> | undefined;
    Card(declaration: IWidgetDeclaration<HTMLElement, IThemeCardOptions & IAttributes>): IWidgetNode<any, any>;
    Carousel(declaration: ICarouselOptions | ICarouselCallable): IWidgetNode<any, any> | undefined;
    Select(declaration: IThemeSelectOptions): IWidgetNode<any, any> | undefined;
    Sheet(declaration: IWidgetDeclaration<HTMLElement, Partial<ThemeSheetOptions> & ICommonAttributes>): any;
}
