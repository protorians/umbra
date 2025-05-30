import {WidgetTheme, type IThemeSettings, LayerVariant, type IColoringLayer} from "@widgetui/core";
import {IStyleSheet, IWidgetNode, Style,} from "@protorians/widgets";
import {Color} from "@protorians/widgets";
import {KatonModalAnimations} from "./animations/modal.js";
import {
    IThemeAccordionOptions, IThemeSelectOptions, IThemeSelectStyles,
    type ThemeAlertDialogOptions,
} from "@widgetui/core/composites";


export class KatonTheme extends WidgetTheme {

    get name(): string {
        return 'katon';
    }

    protected prepareSettings(settings: Partial<IThemeSettings>): Partial<IThemeSettings> {
        settings = super.prepareSettings(settings);

        settings.gap = '.5rem';
        settings.radius = '1.2rem';
        settings.radiusMin = '0.7rem';
        settings.radiusMax = '2rem';
        settings.blurred = '1.5rem';
        settings.spacing = '.4rem';
        settings.borderWidth = '2px';
        settings.borderStyle = 'solid';
        settings.borderColor = Color.tint_100;
        settings.shadow = `0 0 1rem rgba(0,0,0,.1)`;

        return settings;
    }

    get stylesheets(): IStyleSheet {
        this._stylesheet = this._stylesheet || Style({
            backdropFilter: `blur(${this.settings.blurred||0})`,
            boxSizing: 'border-box',
            boxShadow: '0 0 .3rem rgba(0, 0, 0, 0.05)',
            borderRadius: this.settings.radiusMin,
            borderWidth: this.settings.borderWidth,
            borderStyle: this.settings.borderStyle,
            borderColor: this.settings.borderColor,
            backgroundColor: Color.tint_100_a8,
        })

        return this._stylesheet;
    }

    outlineColoringResolves(color: LayerVariant): IColoringLayer {
        switch (color) {
            case LayerVariant.Text:
                return {fore: 'text', back: null, edge: 'text-a1',}

            case LayerVariant.Primary:
                return {fore: 'one', back: null, edge: 'one',}

            case LayerVariant.Secondary:
                return {fore: 'three', back: null, edge: 'three',}

            case LayerVariant.Error:
                return {fore: 'error', back: null, edge: 'error',}

            case LayerVariant.Success:
                return {fore: 'success', back: null, edge: 'success',}

            case LayerVariant.Info:
                return {fore: 'text', back: null, edge: 'text-a2',}

            case LayerVariant.Warning:
                return {fore: 'warning', back: null, edge: 'warning',}

            case LayerVariant.Link:
                return {fore: 'one', back: null, edge: null,}

            case LayerVariant.White:
                return {fore: 'white', back: null, edge: "white-800",}

            case LayerVariant.Black:
                return {fore: 'black', back: null, edge: "black-800",}

            case LayerVariant.Revert:
                return {fore: 'text-100', back: null, edge: "text-100",}

            default:
                return {fore: 'text', back: null, edge: 'text-100-a7',}
        }
    }

    coloringResolves(color: LayerVariant): IColoringLayer {
        switch (color) {
            case LayerVariant.Text:
                return {fore: 'text', back: null, edge: null,}

            case LayerVariant.Primary:
                return {fore: 'white', back: 'one', edge: 'one-100',}

            case LayerVariant.Secondary:
                return {fore: 'white', back: 'three', edge: 'three-100',}

            case LayerVariant.Error:
                return {fore: 'white', back: 'error', edge: 'error-100',}

            case LayerVariant.Success:
                return {fore: 'white', back: 'success', edge: 'success-100',}

            case LayerVariant.Info:
                return {fore: 'text', back: 'tint', edge: 'tint-100',}

            case LayerVariant.Warning:
                return {fore: 'white', back: 'warning', edge: 'warning-100',}

            case LayerVariant.Link:
                return {fore: 'one', back: null, edge: null,}

            case LayerVariant.White:
                return {fore: 'black', back: 'white', edge: "white-800",}

            case LayerVariant.Black:
                return {fore: 'white', back: 'black', edge: "black-800",}

            case LayerVariant.Revert:
                return {fore: 'tint-100', back: "text", edge: "tint-100-a1",}

            default:
                return {fore: 'text', back: 'tint-100-a8', edge: 'tint-100',}
        }
    }

    Accordion(declaration: IThemeAccordionOptions): IWidgetNode<any, any> | undefined {
        declaration.styles = declaration.styles || {};
        declaration.styles.widget = {
            ...this.stylesheets.declarations,
            backgroundColor: 'transparent',
            overflow: 'hidden',
            ...(declaration.styles.widget || {}),
        }
        declaration.styles.item = {
            '&:last-child > *': Style({
                borderBottomWidth: '0'
            }),
            ...(declaration.styles.item || {}),
        }
        declaration.styles.trigger = {
            ...this.stylesheets.declarations,
            borderRadius: '0',
            borderWidth: '0',
            paddingX: 1,
            paddingY: .7,
            borderBottomWidth: `calc(${this.settings.borderWidth} / 2)`,
            userSelect: 'none',
            '-webkit-user-select': 'none',
            '& > button': Style({backgroundColor: 'transparent',}),
            ...(declaration.styles.trigger || {}),
        }
        declaration.styles.content = {
            borderBottomWidth: `calc(${this.settings.borderWidth} / 2)`,
            borderStyle: this.settings.borderStyle,
            borderColor: Color.text_100_a1,
            '& > *': Style({
                padding: 1
            }),
            ...(declaration.styles.content || {}),
        }

        return super.Accordion(declaration);
    }

    AlertDialog(declaration: ThemeAlertDialogOptions): IWidgetNode<any, any> | undefined {
        return super.AlertDialog({
            ...declaration,
            animateIn: KatonModalAnimations.entry,
            animateOut: KatonModalAnimations.exit,
        });
    }


    Select(declaration: IThemeSelectOptions): IWidgetNode<any, any> | undefined {
        declaration.styles = {...declaration.styles} as IThemeSelectStyles;

        declaration.styles.widget = {
            padding: '0',
            minWidth: '192px',
            ...declaration.styles.widget,
        }

        declaration.styles.handler = {
            alignItems: 'center',
            ...this.stylesheets.declarations,
            paddingX: .8,
            paddingY: .5,
            ...declaration.styles.handler,
        }

        declaration.styles.arrow = {
            paddingX: .8,
            paddingY: .5,
            ...declaration.styles.arrow,
        }

        declaration.styles.options = {
            ...this.stylesheets.declarations,
            borderBottomWidth: `calc(${this.settings.borderWidth} / 2)`,
            borderRadius: this.settings.radiusMin,
            overflow: 'auto',
            maxHeight: '30vh',
            ...declaration.styles.options,
        }

        declaration.styles.option = {
            ...this.stylesheets.declarations,
            paddingX: .8,
            paddingY: .5,
            gap: .5,
            borderRadius: '0',
            borderWidth: '0',
            borderBottomWidth: `calc(${this.settings.borderWidth} / 2)`,
            ':last-child': Style({
                borderBottomWidth: '0',
            }),
            ...declaration.styles.option,
        }

        declaration.styles.selected = {
            color: Color.text,
            backgroundColor: Color.one_a1,
            borderColor: Color.one_a2,
            ...declaration.styles.selected,
        }

        return super.Select(declaration);
    }
}

