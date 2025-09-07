export type ISpectraClassListBlueprint = Set<string>;
export type ISpectraChild = string | number | ISpectraElement | ISpectraAsyncChild | null | undefined;
export type ISpectraAsyncChild = Promise<ISpectraChild[]> | Promise<ISpectraChild>;
export type ISpectraRawChildren = ISpectraChild | ISpectraChild[];
export type ISpectraChildren = ISpectraRawChildren | ISpectraAsyncChild;
export type ISpectraStyleKeys = keyof CSSStyleDeclaration | 'paddingX' | 'paddingY' | 'marginX' | 'marginY';
export type ISpectraStyleValue = string | number;
export type ISpectraStyleValues = Partial<{
    [K in ISpectraStyleKeys]: ISpectraStyleValue;
}>;
export type ISpectraStyleBlueprint = Map<ISpectraStyleKeys, ISpectraStyleValue>;
export type ISpectraAttributes = {
    [K: string]: string | number | boolean | null;
};
export type ISpectraAttributesBlueprint = Map<string, string | null | undefined>;
export interface ISpectraBlueprint {
    attributes: ISpectraAttributesBlueprint;
    style: ISpectraStyleBlueprint;
    classList: ISpectraClassListBlueprint;
    children: ISpectraChildren;
}
export interface ISpectraElement {
    readonly tagName: string;
    get blueprint(): ISpectraBlueprint;
    get tree(): ISpectraRawChildren[];
    get attributes(): ISpectraAttributes;
    get dataset(): ISpectraAttributes;
    get textContent(): string;
    set textContent(value: string | null | undefined);
    get value(): string;
    set value(value: string | null | undefined);
    get removed(): boolean;
    classname(classname: string | string[]): this;
    style(styles: ISpectraStyleValues): this;
    attribute(attributes: ISpectraAttributes): this;
    data(attributes: ISpectraAttributes): this;
    prepend(children: ISpectraChildren): this;
    append(children: ISpectraChildren): this;
    appendChild(child: ISpectraElement): this;
    children(children: ISpectraChildren): this;
    remove(): void;
    render(): Promise<string>;
}
