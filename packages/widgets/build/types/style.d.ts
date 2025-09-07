import { AbsoluteUnit, RelativeUnit } from "../enums.js";
import { IWidgetNode } from "./index.js";
export interface IStyleAliasDictionary {
    [key: string]: Array<keyof CSSStyleDeclaration>;
}
export type IStyleStrictSupportedValue = string | number | undefined;
export type IStyleSupportedValue = object | IStyleStrictSupportedValue;
export type IStyleExtendedDeclaration = {
    'paddingX': IStyleSupportedValue;
    'paddingY': IStyleSupportedValue;
    'marginX': IStyleSupportedValue;
    'marginY': IStyleSupportedValue;
};
export type IStyleDeclaration = {
    [K in (keyof CSSStyleDeclaration | keyof IStyleExtendedDeclaration)]: IStyleSupportedValue;
};
export type IStyleStrictDeclaration = {
    [K in (keyof CSSStyleDeclaration | keyof IStyleExtendedDeclaration)]: IStyleStrictSupportedValue;
};
export type IStyleSettings = {
    bytes: number;
    unit: AbsoluteUnit | RelativeUnit;
    spacing?: string | number;
    corner?: string | number;
};
export type IStyleOptions = {
    attach?: boolean;
    lock?: boolean;
    fingerprint?: string;
};
export type IInlineStyleOptions = {
    fingerprint?: string;
};
export interface IInlineStyle {
    readonly options: IInlineStyleOptions;
    attach(widget: IWidgetNode<any, any>): this;
    detach(): this;
    sync(widget?: IWidgetNode<any, any>): this;
    remove<K extends keyof IStyleStrictDeclaration>(key: K | K[]): this;
    update<K extends keyof IStyleStrictDeclaration>(key: K, value: IStyleStrictDeclaration[K]): this;
    merge(declaration?: IStyleStrictDeclaration): this;
    clear(): this;
    toString(): string;
}
export type IStyleSheetCascade = {
    [K: string]: IStyleSheet | string | null | undefined;
};
export type IStyleSheetStrictCascade = {
    [K: string]: IStyleSheet | null | undefined;
};
export type IStyleSheetPropertyKey = `--${string}`;
export type IStyleSheetDeclarations = Partial<IStyleDeclaration> | IStyleSheetCascade;
export interface IStyleSheet {
    declarations: IStyleSheetDeclarations;
    readonly options: IStyleOptions;
    get repository(): HTMLStyleElement | undefined;
    get definitions(): string;
    get selector(): string;
    get associateSelector(): string | undefined;
    clear(): this;
    parse(declaration: IStyleSheetDeclarations | undefined, selector?: string): string | undefined;
    merge(declarations: IStyleSheetDeclarations | IStyleSheet | undefined): this;
    sync(declarations?: IStyleSheetDeclarations): this;
    bind(widget: IWidgetNode<any, any>): this;
    remove<K extends keyof IStyleSheetDeclarations>(key: K | K[]): this;
    update<K extends keyof IStyleSheetDeclarations>(key: K, value: IStyleSheetDeclarations[K]): this;
    hover(declarations: IStyleSheetDeclarations): this;
    focus(declarations: IStyleSheetDeclarations): this;
    blur(declarations: IStyleSheetDeclarations): this;
    autofill(declarations: IStyleSheetDeclarations): this;
    when(pseudoClass: IStyleSheetPseudoClasses | IStyleSheetPseudoClasses[], declarations: IStyleSheetDeclarations): this;
    after(declarations: IStyleSheetDeclarations): this;
    before(declarations: IStyleSheetDeclarations): this;
    isole(element: IStyleSheetPseudoElements | IStyleSheetPseudoElements[], declarations: IStyleSheetDeclarations): this;
    keyframes(name: string, declarations: IStyleSheetStrictCascade): this;
    supports(directive: string, declarations: IStyleSheetStrictCascade): this;
    scope(directive: string, declarations: IStyleSheetStrictCascade): this;
    property(directive: string, declarations: IStyleSheetStrictCascade): this;
    viewTransition(directive: string, declarations: IStyleSheetStrictCascade): this;
    container(directive: string, declarations: IStyleSheetStrictCascade): this;
    media(directive: string, declarations: IStyleSheetStrictCascade): this;
    rule(rule: IStyleSheetAtRules, directive: string, declarations: IStyleSheetStrictCascade): this;
    associate(declarations: IStyleSheetDeclarations): this;
    associated(declarations: IStyleSheetDeclarations): IStyleSheet | undefined;
    unassociate(declarations: IStyleSheetDeclarations): this;
}
export type IStyleSheetAtRules = 'keyframes' | 'charset' | 'color-profile' | 'container' | 'media' | 'supports' | 'document' | 'font-face' | 'font-feature-values' | 'font-palette-values' | 'page' | 'layer' | 'viewport' | 'import' | 'namespace' | 'counter-style' | 'position-try' | 'property' | 'scope' | 'starting-style' | 'view-transition';
export type IStyleSheetPseudoElements = 'after' | 'backdrop' | 'placeholder' | 'before' | 'checkmark' | 'column' | 'marker' | 'picker-icon' | 'grammar-error' | 'first-line' | 'first-letter' | 'details-content' | 'file-selector-button' | 'scroll-marker-group' | 'scroll-marker' | 'target-text' | 'selection' | 'cue' | 'spelling-error' | 'view-transition' | `view-transition-group(${string})` | `view-transition-new(${string})` | `view-transition-old(${string})` | `view-transition-image-pair(${string})` | `slotted(${string})` | `cue(${string})` | `scroll-button(${string})` | `picker(${string})` | `part(${string})` | `highlight(${string})`;
export type IStyleSheetPseudoClasses = 'active' | 'any-link' | `autofill(${string})` | 'blank' | 'current' | `current(${string})` | 'default' | 'defined' | 'dir(ltr)' | 'dir(rtl)' | 'disabled' | 'empty' | 'enabled' | 'first' | 'first-child' | 'first-of-type' | 'fullscreen' | 'focus-visible' | 'focus-within' | 'future' | 'buffering' | 'checked' | `is(${string})` | `has(${string})` | `host(${string})` | `host-context(${string})` | `not(${string})` | 'focus' | 'hover' | 'indeterminate' | 'in-range' | 'out-of-range' | 'invalid' | `lang(${string})` | 'last-child' | 'last-of-type' | 'scope' | 'root' | 'right' | 'left' | 'link' | 'local-link' | 'has-slotted' | `past(${string})` | `state(${string})` | `where(${string})` | `target-current(${string})` | `target-within(${string})` | 'user-invalid' | 'user-valid' | 'valid' | 'volume-locked' | 'visited' | 'target' | 'modal' | 'open' | 'modally-visible' | 'only-child' | 'only-of-type' | 'optional' | 'placeholder-shown' | 'read-only' | 'read-write' | 'required' | 'muted' | 'paused' | 'playing' | 'seeking' | 'stalled' | 'popover-open' | 'picture-in-picture' | `nth-child(${string})` | `nth-last-child(${string})` | `nth-last-of-type(${string})` | `nth-of-type(${string})`;
