import { $ui, Environment, TextUtility } from "@protorians/core";
import { Color, ObjectRounded, Style, WidgetException } from "@protorians/widgets";
import { LayerVariant } from "./enums.js";
import { ThemeAlert, ThemeButton, ThemeDialog, ThemeHelmet, ThemeLayer, ThemeModal, ThemeMenubar, ThemeProgress, ThemeScrollArea, ThemeSelect, ThemeSheet, ThemeSkeleton, ThemeView, ThemeAlertDialog, ThemeAspectRatio, ThemeAvatar, ThemeAccordion, ThemeBadge, ThemeAvatars, ThemeBreadcrumb, ThemeCard, ThemeCarousel, ThemeBellowMenuBar, ThemeNavbar, } from "./composites/index.js";
import { slimetric } from "@protorians/animetric";
export class WidgetTheme {
    _repository;
    _settings;
    _stylesheet;
    prepareSettings(settings) {
        return {
            radius: '0',
            radiusMin: '0',
            radiusMax: '0rem',
            radiusHigh: '7rem',
            blurred: '1.5rem',
            spacing: '.2rem',
            borderWidth: '1px',
            borderWidthMin: '.5px',
            borderWidthMax: '3px',
            borderStyle: 'solid',
            borderColor: Color.tint_100,
            shadow: `none`,
            transitionTiming: `ease-out`,
            transitionDuration: '250ms',
            ...(settings || {})
        };
    }
    constructor(settings) {
        this._settings = this.prepareSettings(settings);
        this.syncSettings();
    }
    get name() {
        return 'default';
    }
    ;
    get selector() {
        return `[widget\\:theme="${this.name}"]`;
    }
    get repository() {
        if (Environment.Client) {
            this._repository = this._repository || document.createElement("style");
            this._repository.setAttribute("widget:theming", `${this.name}`);
            document.head.append(this._repository);
        }
        return this._repository;
    }
    get settings() {
        return this._settings;
    }
    get stylesheet() {
        this._stylesheet = this._stylesheet || {
            root: Style({
                color: Color.text,
                backgroundColor: Color.tint_heavy,
            }),
            texture: Style({
                backdropFilter: 'none',
                borderWidth: '0px',
                borderStyle: 'solid',
                borderColor: 'transparent',
                boxSizing: 'border-box',
                boxShadow: '0 0 .3rem rgba(0, 0, 0, 0.05)',
                borderRadius: 'var(--widget-radius, .7rem)',
                backgroundColor: Color.tint,
            }),
        };
        return this._stylesheet;
    }
    getSetting(name) {
        return this._settings[name] || undefined;
    }
    setSetting(key, value) {
        this._settings[key] = value;
        return this;
    }
    setSettings(settings) {
        Object.entries(settings).forEach(([key, value]) => this._settings[key] = value);
        return this;
    }
    syncSettings() {
        const repo = this.repository;
        if (repo) {
            const style = [];
            Object.entries(this.settings).forEach(([key, value]) => {
                style.push(`--widget-${TextUtility.unCamelCase(key)}: ${value}`);
            });
            repo.innerHTML = `${this.selector}{${style.join(';')}}`;
        }
        return this;
    }
    attach(target) {
        $ui(target).forEach(element => element.setAttribute("widget:theme", `${this.name}`));
        return this;
    }
    detach(target) {
        $ui(target).forEach(element => element.removeAttribute("widget:theme"));
        return this;
    }
    outlineColoringResolves(color) {
        switch (color) {
            case LayerVariant.Text:
                return { fore: 'text', back: null, edge: 'text', };
            case LayerVariant.Primary:
                return { fore: 'one', back: null, edge: 'one', };
            case LayerVariant.Secondary:
                return { fore: 'three', back: null, edge: 'three', };
            case LayerVariant.Error:
                return { fore: 'error', back: null, edge: 'error', };
            case LayerVariant.Success:
                return { fore: 'success', back: null, edge: 'success', };
            case LayerVariant.Info:
                return { fore: 'text', back: null, edge: 'text', };
            case LayerVariant.Warning:
                return { fore: 'warning', back: null, edge: 'warning', };
            case LayerVariant.Link:
                return { fore: 'one', back: null, edge: null, };
            case LayerVariant.White:
                return { fore: 'white', back: null, edge: "white", };
            case LayerVariant.Black:
                return { fore: 'black', back: null, edge: "black", };
            case LayerVariant.Revert:
                return { fore: 'tint-100', back: null, edge: "tint-100", };
            case LayerVariant.Transparent:
                return { fore: 'text', back: null, edge: 'text', };
            default:
                return { fore: 'text', back: null, edge: 'text', };
        }
    }
    coloringResolves(color) {
        switch (color) {
            case LayerVariant.Text:
                return { fore: 'text', back: null, edge: null, };
            case LayerVariant.Primary:
                return { fore: 'white', back: 'one', edge: 'one', };
            case LayerVariant.Secondary:
                return { fore: 'white', back: 'three', edge: 'three', };
            case LayerVariant.Error:
                return { fore: 'white', back: 'error', edge: 'error', };
            case LayerVariant.Success:
                return { fore: 'white', back: 'success', edge: 'success', };
            case LayerVariant.Info:
                return { fore: 'text', back: 'tint', edge: 'tint', };
            case LayerVariant.Warning:
                return { fore: 'white', back: 'warning', edge: 'warning', };
            case LayerVariant.Link:
                return { fore: 'one', back: null, edge: null, };
            case LayerVariant.White:
                return { fore: 'black', back: 'white', edge: "white", };
            case LayerVariant.Black:
                return { fore: 'white', back: 'black', edge: "black", };
            case LayerVariant.Revert:
                return { fore: 'tint-100', back: "text", edge: "text", };
            case LayerVariant.Transparent:
                return { fore: 'text', back: null, edge: null, };
            default:
                return { fore: 'text', back: 'tint-weak', edge: 'tint-100', };
        }
    }
    roundedResolves(rounded) {
        switch (rounded) {
            case ObjectRounded.Small:
                return '0.2rem';
            case ObjectRounded.Medium:
                return '0.5rem';
            case ObjectRounded.Large:
                return '1rem';
            case ObjectRounded.Full:
                return '100%';
            default:
                return '0';
        }
    }
    animate(widget, options) {
        if (options.from)
            widget.style(options.from);
        return slimetric(widget.element, options);
    }
    Accordion(declaration) {
        return ThemeAccordion(this, declaration);
    }
    Alert(declaration) {
        return ThemeAlert(this, declaration);
    }
    AlertDialog(declaration) {
        return ThemeAlertDialog(this, declaration);
    }
    AspectRatio(declarations) {
        return ThemeAspectRatio(declarations);
    }
    Avatar(declaration) {
        return ThemeAvatar(this, declaration);
    }
    Avatars(declaration) {
        return ThemeAvatars(this, declaration);
    }
    Badge(declaration) {
        return ThemeBadge(this, declaration);
    }
    Breadcrumb(declaration) {
        return ThemeBreadcrumb(this, declaration);
    }
    Button(declaration) {
        return ThemeButton(this, declaration);
    }
    Calendar(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Card(declaration) {
        return ThemeCard(this, declaration);
    }
    Carousel(declaration) {
        return ThemeCarousel(declaration);
    }
    Chart(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Checkbox(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Collapsible(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Combobox(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Command(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    ContextMenu(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    DataTable(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    DatePicker(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Dialog(declaration) {
        return ThemeDialog(this, declaration);
    }
    Drawer(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    DropdownMenu(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Frame(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Helmet(declaration) {
        return ThemeHelmet(this, declaration);
    }
    HoverCard(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Indicator(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Input(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    InputOTP(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Layer(declaration) {
        return ThemeLayer(this, declaration);
    }
    List(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Menubar(declaration) {
        return ThemeMenubar(this, declaration);
    }
    Modal(declaration) {
        return ThemeModal(declaration);
    }
    Navbar(declaration) {
        return ThemeNavbar(this, declaration);
    }
    BellowMenubar(declarations) {
        return ThemeBellowMenuBar(this, declarations);
    }
    Pagination(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Popover(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Progress(declaration) {
        return ThemeProgress(this, declaration);
    }
    RadioGroup(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Resizable(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    ScrollArea(declaration) {
        return ThemeScrollArea(declaration);
    }
    Select(declaration) {
        return ThemeSelect(declaration);
    }
    Separator(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Sheet(declaration) {
        return ThemeSheet(declaration);
    }
    Sidebar(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Skeleton(declaration) {
        return ThemeSkeleton(this, declaration);
    }
    Slider(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Sonner(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Switch(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Table(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Tabs(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Textarea(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Toast(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Toggle(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    ToggleGroup(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    Tooltip(declaration) {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`));
    }
    View(declaration) {
        return ThemeView(this, declaration);
    }
}
