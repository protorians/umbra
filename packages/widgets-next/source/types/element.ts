import type {IDynamicParametersBag, IStaticParametersBag} from "@protorians/parameters-bag";

export interface IWidgetElement {
    get context(): any;

    get signal(): any;

    get states(): any;

    get props(): any;

    get styles(): any;

    style(declaration: any): this;

    prop(key: string, value: any): this;

    remount(): this;

    mount(): this;

    unmount(): void;

    destroy(): void;

    render(): this;

    clone(): this;
}

export interface IClassNameParameterBag extends IStaticParametersBag<any> {
}

export interface IDatasetAttributeParameterBag extends IDynamicParametersBag<any> {
}

export interface IAttributeParameterBag extends IDynamicParametersBag<any> {
}