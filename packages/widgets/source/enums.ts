export enum HttpMethod {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
    OPTION = 'OPTION',
}

export enum ColorSchemeType {
    Light = 'light',
    Dark = 'dark',
}

export enum ColorimetricType {
    Hex = 'hex',
    Oklch = 'oklch',
}

export enum IntersectionDetector {
    Ratio = "ratio",
    Intersecting = "intersecting",
}

export enum Axis2D {
    X = 'x',
    Y = 'y',
}

export enum Axis3D {
    X = 'x',
    Y = 'y',
    Z = 'z',
}

export enum FloatPosition {
    Top = 'top',
    Right = 'right',
    Bottom = 'bottom',
    Left = 'left',
}

export enum Position {
    Top = 'top',
    Right = 'right',
    Bottom = 'bottom',
    Left = 'left',
    Center = 'center',
}

export enum PositionX {
    Right = 'right',
    Left = 'left',
    Center = 'center',
}

export enum PositionY {
    Top = 'top',
    Bottom = 'bottom',
    Center = 'center',
}

export enum InsertionPosition {
    BeforeBegin = 'BeforeBegin',
    BeforeEnd = 'BeforeEnd',
    AfterBegin = 'AfterBegin',
    AfterEnd = 'AfterEnd',
}

export enum InsertionSiblingPosition {
    Before = 'before',
    After = 'After',
}

export enum EdgePosition {
    Start = 'start',
    Center = 'center',
    End = 'end',
}

export enum AligningDirection {
    Row = 'row',
    RowReverse = 'row-reverse',
    Column = 'column',
    ColumnReverse = 'column-reverse',
}

export enum AligningProperty {
    JustifyContent = "justify-content",
    AlignItems = "align-items",
    AlignSelf = "align-self",
    AlignContent = "align-content",
}

export enum Aligning {
    Start = 'start',
    Center = 'center',
    End = 'end',
    Left = 'left',
    Right = 'right',
    FlexStart = 'flex-start',
    FlexEnd = 'flex-end',
    SpaceBetween = 'space-between',
    SpaceAround = 'space-around',
    SpaceEvenly = 'space-evenly',
    Normal = 'normal',
    Stretch = 'stretch',
    SafeCenter = 'safe center',
    UnsafeCenter = 'unsafe center',
    First = 'first',
    FirstBaseline = 'first baseline',
    Last = 'last',
    LastBaseline = 'last baseline',
    Inherit = 'inherit',
    Initial = 'initial',
    Unset = 'unset',
}

export enum TransitionMode {
    Entry = 'entry',
    Out = 'out',
}

export enum ToggleOption {
    Visibility = 'visibility',
    Activity = 'activity',
    Interactivity = 'interactivity',
    Stase = 'stase',
}

export enum TextAligning {
    Left = 'left',
    Center = 'center',
    Right = 'right',
    Justify = 'justify',
}

export enum Sizer {
    XS = 'x-small',
    S = 'small',
    M = 'medium',
    L = 'large',
    XL = 'x-large',
}

export enum AbsoluteUnit {
    Cm = 'cm',
    Mm = 'mm',
    In = 'in',
    Px = 'px',
    Pt = 'pt',
    Pc = 'pc',
}

export enum RelativeUnit {
    Em = 'em',
    Ex = 'ex',
    Ch = 'ch',
    Rem = 'rem',
    Vw = 'vw',
    Vh = 'vh',
    VMin = 'vmin',
    VMax = 'vmax',
    Percent = '%',
}

export enum WidgetsNativeProperty {
    Signal = 'signal',
    Stase = 'stase',
    Ref = 'ref',
    Children = 'children',
    Style = 'style',
    ClassName = 'className',
    Data = 'data',
    Nsa = 'nsa',
    On = 'on',
    Listen = 'listen',
    Features = 'features',
    Elevate = 'elevate',
}

export enum WidgetElevation {
    None = 0,
    Base = 9,
    Standard = 49,
    Float = 99,
    Overlay = 999,
    Critical = 9999,
}

export enum PopupType {
    Menu = "menu",
    Listbox = "listbox",
    Tree = "tree",
    Grid = "grid",
    Dialog = "dialog",
    Custom = "custom",
}

export enum AriaLayoutRole {
    Banner = "banner",
    Complementary = "complementary",
    ContentInfo = "contentinfo",
    Form = "form",
    Main = "main",
    Navigation = "navigation",
    Region = "region",
    Search = "search",
}

export enum AriaWidgetRole {
    Alert = "alert",
    AlertDialog = "alertdialog",
    Button = "button",
    Checkbox = "checkbox",
    Dialog = "dialog",
    Grid = "grid",
    GridCell = "gridcell",
    Link = "link",
    Log = "log",
    Marquee = "marquee",
    Menu = "menu",
    MenuBar = "menubar",
    MenuItem = "menuitem",
    MenuItemCheckbox = "menuitemcheckbox",
    MenuItemRadio = "menuitemradio",
    Option = "option",
    ProgressBar = "progressbar",
    Radio = "radio",
    RadioGroup = "radiogroup",
    Scrollbar = "scrollbar",
    Slider = "slider",
    SpinButton = "spinbutton",
    Status = "status",
    Switch = "switch",
    Tab = "tab",
    TabList = "tablist",
    TabPanel = "tabpanel",
    TextBox = "textbox",
    Timer = "timer",
    Tooltip = "tooltip",
    Tree = "tree",
    TreeItem = "treeitem",
}

export enum AriaContainerRole {
    Application = "application",
    Article = "article",
    Cell = "cell",
    ColumnHeader = "columnheader",
    Definition = "definition",
    Directory = "directory",
    Document = "document",
    Feed = "feed",
    Figure = "figure",
    Group = "group",
    Heading = "heading",
    Img = "img",
    List = "list",
    ListBox = "listbox",
    ListItem = "listitem",
    Math = "math",
    None = "none",
    Presentation = "presentation",
    Row = "row",
    RowGroup = "rowgroup",
    RowHeader = "rowheader",
    Separator = "separator",
    Table = "table",
    Term = "term",
    Toolbar = "toolbar",
}

export enum AriaLiveRegionRole {
    Alert = "alert",
    Log = "log",
    Marquee = "marquee",
    Status = "status",
    Timer = "timer",
}
