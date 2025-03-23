import type {IWidgetNode} from "@protorians/widgets";
import type {IUiTarget} from "@protorians/core";

export type IThemeSettings = {
    blurred: string;
    borderWidth: string;
    borderStyle: string;
    borderColor: string;
    radius: string;
    colorScheme: string;
    fontFamily: string;
    fontSize: string;
    fontLine: string;
    fontSpacing: string;
    fontAlign: string;
    spacing: string;
    gap: string;
    transitionDuration: string;
    transitionTiming: string;
    transitionDelay: string;
    animationDuration: string;
    animationTiming: string;
    animationDelay: string;
};

export type IThemeCompositeKeys =
    | "Helmet"
    | "Frame"
    | "Accordion"
    | "Alert"
    | "AlertDialog"
    | "AspectRatio"
    | "Avatar"
    | "Badge"
    | "Breadcrumb"
    | "Button"
    | "Calendar"
    | "Card"
    | "Carousel"
    | "Chart"
    | "Checkbox"
    | "Collapsible"
    | "Combobox"
    | "Command"
    | "ContextMenu"
    | "DataTable"
    | "DatePicker"
    | "Dialog"
    | "Drawer"
    | "DropdownMenu"
    | "View"
    | "HoverCard"
    | "Indicator"
    | "Input"
    | "InputOTP"
    | "Label"
    | "Layer"
    | "List"
    | "Menubar"
    | "Modal"
    | "NavigationMenu"
    | "Navbar"
    | "Pagination"
    | "Popover"
    | "Progress"
    | "RadioGroup"
    | "Resizable"
    | "ScrollArea"
    | "SelectOptions"
    | "Separator"
    | "Sheet"
    | "Sidebar"
    | "Skeleton"
    | "Slider"
    | "Sonner"
    | "Switch"
    | "Table"
    | "Tabs"
    | "Textarea"
    | "Toast"
    | "Toggle"
    | "ToggleGroup"
    | "Tooltip";

export type IThemeComposite<T> = (declaration: T) => IWidgetNode<any, any> | undefined;

export type IThemeScheme = {
    [K in IThemeCompositeKeys]: IThemeComposite<any>;
}


export interface ITheme extends IThemeScheme {
    get name(): string;

    get selector(): string;

    get settings(): Partial<IThemeSettings>;

    get repository(): HTMLStyleElement | undefined;

    getSetting(name: string): string | undefined;

    setSetting<K extends keyof IThemeSettings>(key: K, value: IThemeSettings[K] | undefined): this;

    setSettings(settings: IThemeSettings): this;

    syncSettings(): this;

    attach(target?: IUiTarget<HTMLElement>): this;

    detach(target?: IUiTarget<HTMLElement>): this
}