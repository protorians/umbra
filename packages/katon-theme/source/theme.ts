import {type IColoringLayer, type IThemeSettings, IThemeStylesheet, LayerVariant, WidgetTheme} from "@widgetui/core";
import {
    Color,
    type IAttributes,
    ICommonAttributes,
    type IWidgetDeclaration,
    type IWidgetNode,
    Style,
} from "@protorians/widgets";
import {KatonModalAnimations} from "./animations/modal.js";
import {
    type IThemeAccordionOptions,
    IThemeCardOptions,
    type IThemeSelectOptions,
    type IThemeSelectStyles,
    type ThemeAlertDialogOptions, ThemeSheetOptions,
} from "@widgetui/core/composites";
import {type ICarouselCallable, type ICarouselOptions, ICarouselStyles,} from "@widgetui/core/kits/index.js";


export class KatonTheme extends WidgetTheme {

    get name(): string {
        return 'katon';
    }

    protected prepareSettings(settings: Partial<IThemeSettings>): Partial<IThemeSettings> {
        settings = super.prepareSettings(settings);
        settings.gap = '.5rem';
        settings.gapMin = '.3rem';
        settings.gapMax = '1.2rem';
        settings.radius = '1.2rem';
        settings.radiusMin = '0.7rem';
        settings.radiusMax = '2rem';
        settings.blurred = '5rem';
        settings.spacing = '1rem';
        settings.borderWidth = '2px';
        settings.borderStyle = 'solid';
        settings.borderColor = Color.tint;
        settings.shadow = `0 0 .3rem rgba(0,0,0,.05)`;
        return settings;
    }

    get stylesheet(): IThemeStylesheet {
        this._stylesheet = this._stylesheet || {
            root: Style({
                color: Color.text,
                backgroundColor: Color.tint_heavy,
            }),
            texture: Style({
                backdropFilter: `blur(${this.settings.blurred || 0})`,
                boxSizing: 'border-box',
                boxShadow: '0 0 .3rem rgba(0, 0, 0, 0.05)',
                borderRadius: this.settings.radiusMin,
                borderWidth: this.settings.borderWidth,
                borderStyle: this.settings.borderStyle,
                borderColor: this.settings.borderColor,
                backgroundColor: Color.tint_weak_a7,
            }),
        }
        return this._stylesheet;
    }

    outlineColoringResolves(color: LayerVariant): IColoringLayer {
        switch (color) {
            case LayerVariant.Text:
                return {fore: 'text', back: null, edge: 'text',}

            case LayerVariant.Primary:
                return {fore: 'one', back: null, edge: 'one',}

            case LayerVariant.Secondary:
                return {fore: 'three', back: null, edge: 'three',}

            case LayerVariant.Error:
                return {fore: 'error', back: null, edge: 'error',}

            case LayerVariant.Success:
                return {fore: 'success', back: null, edge: 'success',}

            case LayerVariant.Info:
                return {fore: 'text', back: null, edge: 'text-200-a2',}

            case LayerVariant.Warning:
                return {fore: 'warning', back: null, edge: 'warning',}

            case LayerVariant.Link:
                return {fore: 'text', back: null, edge: 'one',}

            case LayerVariant.White:
                return {fore: 'white', back: null, edge: "white",}

            case LayerVariant.Black:
                return {fore: 'black', back: null, edge: "black",}

            case LayerVariant.Revert:
                return {fore: 'text-400', back: null, edge: "text-400",}

            case LayerVariant.Transparent:
                return {fore: 'text', back: null, edge: 'text',}

            default:
                return {fore: 'text', back: null, edge: 'text-400',}
        }
    }

    coloringResolves(color: LayerVariant): IColoringLayer {
        switch (color) {
            case LayerVariant.Text:
                return {fore: 'text', back: null, edge: null,}

            case LayerVariant.Primary:
                return {fore: 'white', back: 'one', edge: 'one-weak',}

            case LayerVariant.Secondary:
                return {fore: 'white', back: 'three', edge: 'three-weak',}

            case LayerVariant.Error:
                return {fore: 'white', back: 'error', edge: 'error-weak',}

            case LayerVariant.Success:
                return {fore: 'white', back: 'success', edge: 'success-weak',}

            case LayerVariant.Info:
                return {fore: 'text', back: 'tint', edge: 'tint-weak',}

            case LayerVariant.Warning:
                return {fore: 'white', back: 'warning', edge: 'warning-weak',}

            case LayerVariant.Link:
                return {fore: 'one', back: null, edge: null,}

            case LayerVariant.White:
                return {fore: 'black', back: 'white', edge: "white-weak",}

            case LayerVariant.Black:
                return {fore: 'white', back: 'black-a8', edge: "black-weak",}

            case LayerVariant.Revert:
                return {fore: 'tint', back: "text-a8", edge: "text-weak",}

            case LayerVariant.Transparent:
                return {fore: 'text', back: null, edge: null,}

            default:
                return {fore: 'text', back: 'tint-weak-a7', edge: 'tint-weak',}
        }
    }

    Accordion(declaration: IThemeAccordionOptions): IWidgetNode<any, any> | undefined {
        declaration.styles = declaration.styles || {};

        declaration.styles.widget = {
            // ...this.stylesheet.texture.declarations,
            borderRadius: this.settings.radius,
            borderStyle: this.settings.borderStyle,
            borderWidth: this.settings.borderWidth,
            borderColor: Color.tint_weak,
            overflow: 'hidden',
            ...(declaration.styles.widget || {}),
        };

        declaration.styles.item = {
            '&:last-child > *': Style({
                borderBottomWidth: '0'
            }),
            ...(declaration.styles.item || {}),
        };

        declaration.styles.trigger = {
            // ...this.stylesheet.texture.declarations,
            // borderRadius: '0',
            paddingX: 1,
            paddingY: .7,
            borderWidth: '0',
            borderStyle: this.settings.borderStyle,
            borderBottomWidth: this.settings.borderWidth,
            borderColor: Color.tint_weak,
            boxShadow: 'none',
            userSelect: 'none',
            '-webkit-user-select': 'none',
            '& > button': Style({backgroundColor: 'transparent',}),
            ...(declaration.styles.trigger || {}),
        };

        declaration.styles.content = {
            // borderBottomWidth: `calc(${this.settings.borderWidth} / 2)`,
            borderStyle: this.settings.borderStyle,
            borderColor: Color.text_100_a1,
            backgroundColor: Color.tint_heavy,
            '& > *': Style({
                padding: 1
            }),
            ...(declaration.styles.content || {}),
        };

        return super.Accordion(declaration);
    }

    AlertDialog(declaration: ThemeAlertDialogOptions): IWidgetNode<any, any> | undefined {
        return super.AlertDialog({
            ...declaration,
            animateIn: KatonModalAnimations.entry,
            animateOut: KatonModalAnimations.exit,
        });
    }

    Card(declaration: IWidgetDeclaration<HTMLElement, IThemeCardOptions & IAttributes>): IWidgetNode<any, any> {

        declaration.styles = declaration.styles || {};

        declaration.styles.widget = Style({
            gap: this.settings.gap,
            ...declaration.styles.widget?.declarations
        });

        declaration.styles.helmet = Style({
            gap: this.settings.gap,
            padding: this.settings.spacing,
            ...declaration.styles.helmet?.declarations
        });

        declaration.styles.actions = Style({
            gap: this.settings.gap,
            padding: this.settings.gap,
            ...declaration.styles.actions?.declarations
        });

        declaration.styles.children = Style({
            gap: this.settings.gap,
            paddingX: this.settings.spacing,
            ...declaration.styles.children?.declarations
        });

        declaration.styles.footer = Style({
            gap: this.settings.gap,
            padding: this.settings.spacing,
            ...declaration.styles.footer?.declarations
        });

        return super.Card(declaration);
    }

    Carousel(declaration: ICarouselOptions | ICarouselCallable): IWidgetNode<any, any> | undefined {

        const styles: ICarouselStyles = {};

        styles.widget = Style({
            height: '30vh',
        });
        styles.wrapper = Style({});
        styles.items = Style({
            gap: this.settings.gap,
        });
        styles.item = Style({
            // ...this.stylesheet.texture.declarations,
        });
        styles.controls = Style({
            bottom: '0',
            left: '0',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        });
        styles.control = Style({
            cursor: 'pointer'
        });
        styles.previous = Style({});
        styles.next = Style({});
        styles.progress = Style({});
        styles.progressBar = Style({});
        styles.progressTrack = Style({});

        if (typeof declaration === 'function') {
            return super.Carousel(carousel => {
                const resolved = declaration(carousel);
                styles.widget?.merge(resolved.styles?.widget);
                styles.wrapper?.merge(resolved.styles?.wrapper);
                styles.items?.merge(resolved.styles?.items);
                styles.item?.merge(resolved.styles?.item);
                styles.controls?.merge(resolved.styles?.controls);
                styles.control?.merge(resolved.styles?.control);
                styles.previous?.merge(resolved.styles?.previous);
                styles.next?.merge(resolved.styles?.next);
                styles.progress?.merge(resolved.styles?.progress);
                styles.progressBar?.merge(resolved.styles?.progressBar);
                styles.progressTrack?.merge(resolved.styles?.progressTrack);
                resolved.styles = styles;
                return resolved;
            })
        } else {
            declaration.styles = declaration.styles || {};
            declaration.styles.widget = Style(styles.widget.declarations).merge(declaration.styles.widget?.declarations);
            declaration.styles.wrapper = Style(styles.wrapper.declarations).merge(declaration.styles.wrapper?.declarations);
            declaration.styles.items = Style(styles.items.declarations).merge(declaration.styles.items?.declarations);
            declaration.styles.item = Style(styles.item.declarations).merge(declaration.styles.item?.declarations);
            declaration.styles.controls = Style(styles.controls.declarations).merge(declaration.styles.controls?.declarations);
            declaration.styles.control = Style(styles.control.declarations).merge(declaration.styles.control?.declarations);
            declaration.styles.next = Style(styles.next.declarations).merge(declaration.styles.next?.declarations);
            declaration.styles.previous = Style(styles.previous.declarations).merge(declaration.styles.previous?.declarations);
            declaration.styles.progress = Style(styles.progress.declarations).merge(declaration.styles.progress?.declarations);
            declaration.styles.progressBar = Style(styles.progressBar.declarations).merge(declaration.styles.progressBar?.declarations);
            declaration.styles.progressTrack = Style(styles.progressTrack.declarations).merge(declaration.styles.progressTrack?.declarations);
            return super.Carousel(declaration);
        }
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
            ...this.stylesheet.texture.declarations,
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
            ...this.stylesheet.texture.declarations,
            borderBottomWidth: `calc(${this.settings.borderWidth} / 2)`,
            borderRadius: this.settings.radiusMin,
            overflow: 'auto',
            maxHeight: '30vh',
            ...declaration.styles.options,
        }

        declaration.styles.option = {
            ...this.stylesheet.texture.declarations,
            paddingX: .8,
            paddingY: .5,
            gap: .5,
            borderRadius: '0',
            borderWidth: '0',
            borderBottomWidth: `calc(${this.settings.borderWidth} / 2)`,
            '&:last-child': Style({
                borderBottomWidth: '0',
            }),
            ...declaration.styles.option,
        }

        declaration.styles.selected = {
            color: Color.text,
            backgroundColor: Color.one_a2,
            borderColor: Color.one_a2,
            ...declaration.styles.selected,
        }

        declaration.styles.focused = {
            color: Color.text,
            backgroundColor: Color.one_a1,
            ...declaration.styles.focused,
        }
        return super.Select(declaration);
    }

    Sheet(declaration: IWidgetDeclaration<HTMLElement, Partial<ThemeSheetOptions> & ICommonAttributes>): any {

        declaration.styles = {...declaration.styles};

        declaration.styles.back = {
            ...(declaration.styles.back || {}),
            backgroundColor: 'transparent',
        }
        declaration.styles.fore = {
            ...(declaration.styles.fore || {}),
            backgroundColor: Color.tint_a8,
            backdropFilter: 'blur(2rem)',
            width: `100vw`,
            borderRadius: this.settings.radiusMax,
            maxHeight: `100vh`,
            boxShadow: '0 0 2rem rgba(0, 0, 0, .7)'
        }

        return super.Sheet({
            ...declaration,
            animateIn: KatonModalAnimations.entry,
            animateOut: KatonModalAnimations.exit,
        });
    }
}

