import type { IFormAttributes, IFormControllerWidget } from "../types/index.js";
export declare class FormController<A extends IFormAttributes> {
    protected _widget: IFormControllerWidget<A> | undefined;
    get widget(): IFormControllerWidget<A>;
    bind(widget: IFormControllerWidget<A>): this;
    payload<T>(): T;
    static getPayload<T>(widget: IFormControllerWidget<any>): T;
}
