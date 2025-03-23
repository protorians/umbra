import type {ITheme, IThemeSettings} from "./types/index.js";
import {$ui, Environment, IUiTarget, unCamelCase} from "@protorians/core";
import {IWidgetNode, WidgetException} from "@protorians/widgets";


export class CommonTheme implements ITheme {

    protected _repository: HTMLStyleElement | undefined;
    protected _settings: Partial<IThemeSettings>;

    constructor(settings?: Partial<IThemeSettings>) {
        this._settings = this.prepareSettings(settings || {} as IThemeSettings);
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

    getSetting<K extends keyof IThemeSettings>(name: K): string | undefined {
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

    protected prepareSettings(settings: Partial<IThemeSettings>): Partial<IThemeSettings> {
        return settings;
    }


    Accordion(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Alert(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    AlertDialog(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
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

    Button(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
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

    Dialog(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
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

    Helmet(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
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

    Layer(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    List(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Menubar(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Modal(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Navbar(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
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

    Progress(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    RadioGroup(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Resizable(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    ScrollArea(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    SelectOptions(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Separator(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Sheet(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Sidebar(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

    Skeleton(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
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

    View(declaration: any): IWidgetNode<any, any> | undefined {
        throw (new WidgetException(`Not implemented : ${JSON.stringify(declaration)}`))
    }

}