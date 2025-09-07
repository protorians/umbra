import {IDynamicParameterBag, IStaticParameterBag} from "./parameter";

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
}


export interface IStyleParameterBag extends IDynamicParameterBag<any> {
}

export interface IClassNameParameterBag extends IStaticParameterBag<any> {
}

export interface IDatasetAttributeParameterBag extends IDynamicParameterBag<any> {
}

export interface IAttributeParameterBag extends IDynamicParameterBag<any> {
}