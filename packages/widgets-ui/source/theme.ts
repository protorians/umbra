import type {IColoringLayer, ITheme, IThemeSettings} from "./types/index.js";
import {$ui, Environment, IUiTarget, unCamelCase} from "@protorians/core";
import {
    Color,
    IButtonAttributes, IButtonAttributesBase,
    IChildren,
    ICommonAttributes,
    IStyleSheet,
    IWidgetDeclaration, IWidgetNode,
    Style,
    WidgetException
} from "@protorians/widgets";
import {LayerVariant} from "./enums.js";
import {
    ThemeAlert,
    type ThemeAlertProps,
    ThemeButton,
    type ThemeButtonProps,
    ThemeDialog, ThemeDialogProps,
    ThemeHelmet,
    type ThemeHelmetProps,
    ThemeLayer,
    type ThemeLayerProps,
    ThemeModal,
    ThemeNavbar,
    type ThemeNavbarProps,
    ThemeProgress,
    type ThemeProgressProps,
    ThemeScrollArea,
    type ThemeScrollAreaProps,
    ThemeSheet,
    type ThemeSheetProps,
    ThemeSkeleton,
    type ThemeSkeletonProps,
    ThemeView,
    type ThemeViewProps
} from "./composites/index.js";
import {IModalOptions} from "./kits/index.js";
import {ThemeAlertDialog} from "./composites/alert-dialog/index.js";
import {ThemeAlertDialogProps} from "./composites/alert-dialog/type.js";


export class WidgetTheme implements ITheme {

    protected _repository: HTMLStyleElement | undefined;
    protected _settings: Partial<IThemeSettings>;
    protected _stylesheet: IStyleSheet | undefined;

    protected prepareSettings(settings: Partial<IThemeSettings>): Partial<IThemeSettings> {
        return {
            radius: '0',
            radiusMin: '0',
            radiusMax: '0rem',
            blurred: '1.5rem',
            spacing: '.2rem',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: Color.tint_100,
            shadow: `none`,
            ...(settings || {})
        };
    }

    constructor(settings?: Partial<IThemeSettings>) {
        this._settings = this.prepareSettings(settings as IThemeSettings);
        this.syncSettings();
    }

    get name(): string {
        return 'default'
    };

    get selector(): string {
        return `[widget\\:theme="${this.name}"]`
    }

    get repository(): HTMLStyleElement | undefined {
        if (Environment.Client) {
            this._repository = this._repository || document.createElement("style");
            this._repository.setAttribute("widget:theming", `${this.name}`);
            document.head.append(this._repository);
        }
        return this._repository;
    }

    get settings(): Partial<IThemeSettings> {
        return this._settings;
    }

    get stylesheets(): IStyleSheet {
        this._stylesheet = this._stylesheet || Style({
            backdropFilter: 'none',
            borderWidth: '0px',
            borderStyle: 'solid',
            borderColor: 'transparent',
            boxSizing: 'border-box',
            boxShadow: '0 0 .3rem rgba(0, 0, 0, 0.05)',
            borderRadius: 'var(--widget-radius, .7rem)',
        })
        return this._stylesheet;
    }

    getSetting<K extends keyof IThemeSettings>(name: K): IThemeSettings[K] | undefined {
        return this._settings[name] || undefined;
    }

    setSetting<K extends keyof IThemeSettings>(key: K, value: IThemeSettings[K] | undefined): this {
        this._settings[key] = value
        return this;
    }

    setSettings(settings: IThemeSettings): this {
        Object.entries(settings).forEach(([key, value]) => this._settings[key] = value)
        return this;
    }

    syncSettings(): this {
        const repo = this.repository;
        if (repo) {
            const style: string[] = []
            Object.entries(this.settings).forEach(([key, value]) => {
                style.push(`--widget-${unCamelCase(key)}: ${value}`);
            });
            repo.innerHTML = `${this.selector}{${style.join(';')}}`;
        }
        return this;
    }

    attach(target: IUiTarget<HTMLElement>): this {
        $ui(target).forEach(element => element.setAttribute("widget:theme", `${this.name}`))
        return this;
    }

    detach(target: IUiTarget<HTMLElement>): this {
        $ui(target).forEach(element => element.removeAttribute("widget:theme"))
        return this;
    }

    outlineColoring(color: LayerVariant): IColoringLayer {
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
                return {fore: 'text', back: null, edge: 'text',}

            case LayerVariant.Warning:
                return {fore: 'warning', back: null, edge: 'warning',}

            case LayerVariant.Link:
                return {fore: 'one', back: null, edge: null,}

            case LayerVariant.White:
                return {fore: 'white', back: null, edge: "white",}

            case LayerVariant.Black:
                return {fore: 'black', back: null, edge: "black",}

            case LayerVariant.Revert:
                return {fore: 'tint-100', back: null, edge: "tint-100",}

            default:
                return {fore: 'text', back: null, edge: 'text',}
        }
    }


    coloring(color: LayerVariant): IColoringLayer {
        switch (color) {
            case LayerVariant.Text:
                return {fore: 'text', back: null, edge: null,}

            case LayerVariant.Primary:
                return {fore: 'white', back: 'one', edge: 'one',}

            case LayerVariant.Secondary:
                return {fore: 'white', back: 'three', edge: 'three',}

            case LayerVariant.Error:
                return {fore: 'white', back: 'error', edge: 'error',}

            case LayerVariant.Success:
                return {fore: 'white', back: 'success', edge: 'success',}

            case LayerVariant.Info:
                return {fore: 'text', back: 'tint', edge: 'tint',}

            case LayerVariant.Warning:
                return {fore: 'white', back: 'warning', edge: 'warning',}

            case LayerVariant.Link:
                return {fore: 'one', back: null, edge: null,}

            case LayerVariant.White:
                return {fore: 'black', back: 'white', edge: "white",}

            case LayerVariant.Black:
                return {fore: 'white', back: 'black', edge: "black",}

            case LayerVariant.Revert:
                return {fore: 'tint-100', back: "text", edge: "text",}

            default:
                return {fore: 'text', back: 'tint-100', edge: 'tint-100',}
        }
    }

    Accordion(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Alert(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes & ThemeAlertProps>): IChildren<any> | undefined {
        return ThemeAlert(this, declaration);
    }

    AlertDialog(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes & ThemeAlertDialogProps>): IWidgetNode<any, any> | undefined {
        return ThemeAlertDialog(this, declaration);
    }

    AspectRatio(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Avatar(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Badge(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Breadcrumb(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Button(
        declaration: IWidgetDeclaration<HTMLButtonElement, ThemeButtonProps & IButtonAttributes & IButtonAttributesBase>
    ) {
        return ThemeButton(this, declaration)
    }

    Calendar(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Card(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Carousel(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Chart(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Checkbox(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Collapsible(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Combobox(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Command(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    ContextMenu(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    DataTable(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    DatePicker(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Dialog(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes & ThemeDialogProps>): IWidgetNode<any, any> | undefined {
        return ThemeDialog(this, declaration)
    }

    Drawer(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    DropdownMenu(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Frame(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Helmet(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes & ThemeHelmetProps>) {
        return ThemeHelmet(this, declaration)
    }

    HoverCard(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Indicator(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Input(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    InputOTP(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Label(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Layer(declaration: IWidgetDeclaration<HTMLElement, ThemeLayerProps & ICommonAttributes>) {
        return ThemeLayer(this, declaration)
    }

    List(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Menubar(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Modal(declaration: Omit<IWidgetDeclaration<HTMLElement, Partial<IModalOptions> & ICommonAttributes>, 'children'>) {
        return ThemeModal(declaration)
    }

    Navbar(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes & ThemeNavbarProps>) {
        return ThemeNavbar(this, declaration)
    }

    NavigationMenu(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Pagination(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Popover(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Progress(declaration: Omit<IWidgetDeclaration<HTMLElement, ThemeProgressProps & ICommonAttributes>, 'children'>): IWidgetNode<any, any> | undefined {
        return ThemeProgress(this, declaration);
    }

    RadioGroup(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Resizable(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    ScrollArea(declaration: IWidgetDeclaration<HTMLElement, ThemeScrollAreaProps & ICommonAttributes>) {
        return ThemeScrollArea(declaration)
    }

    SelectOptions(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Separator(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Sheet(declaration: IWidgetDeclaration<HTMLElement, Partial<ThemeSheetProps> & ICommonAttributes>) {
        return ThemeSheet(declaration)
    }

    Sidebar(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Skeleton(declaration: IWidgetDeclaration<HTMLElement, ThemeSkeletonProps & ICommonAttributes>,) {
        return ThemeSkeleton(this, declaration)
    }

    Slider(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Sonner(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Switch(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Table(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Tabs(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Textarea(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Toast(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Toggle(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    ToggleGroup(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Tooltip(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    View(declaration: IWidgetDeclaration<HTMLElement, ThemeViewProps & ICommonAttributes>,) {
        return ThemeView(declaration)
    }
}