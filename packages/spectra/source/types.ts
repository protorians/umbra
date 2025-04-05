export type ISpectraClassListBlueprint = Set<string>;

export type ISpectraChild = string | number | ISpectra | ISpectraAsyncChild | null | undefined;

export type ISpectraAsyncChild = Promise<ISpectraChild[]> | Promise<ISpectraChild>;

export type ISpectraRawChildren = ISpectraChild | ISpectraChild[];

export type ISpectraChildren = ISpectraRawChildren | ISpectraAsyncChild;

export type ISpectraStyleKeys = keyof CSSStyleDeclaration | 'paddingX' | 'paddingY' | 'marginX' | 'marginY';

export type ISpectraStyleValue = string | number;

export type ISpectraStyleValues = Partial<{
    [K in ISpectraStyleKeys]: ISpectraStyleValue;
}>

export type ISpectraStyleBlueprint = Map<ISpectraStyleKeys, ISpectraStyleValue>;

export type ISpectraAttributes = {
    [K: string]: string | null;
}

export type ISpectraAttributesBlueprint = Map<string, string | null | undefined>;

export interface ISpectraBlueprint {
    attributes: ISpectraAttributesBlueprint;
    style: ISpectraStyleBlueprint;
    classList: ISpectraClassListBlueprint;
    children: ISpectraChildren;
}

export interface ISpectra {
    get tagName(): string;

    get blueprint(): ISpectraBlueprint;

    get tree(): ISpectraRawChildren[];

    classname(classname: string | string[]): this;

    style(styles: ISpectraStyleValues): this;

    attributes(attributes: ISpectraAttributes): this;

    text(children: ISpectraChildren): this;

    children(children: ISpectraChildren): this;

    render(): Promise<string>;
}