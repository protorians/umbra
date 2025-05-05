import type {IFormAttributes, IFormControllerWidget} from "../types/index.js";
import {WidgetException} from "../errors/index.js";

export class FormController<A extends IFormAttributes> {
    protected _widget: IFormControllerWidget<A> | undefined;

    get widget(): IFormControllerWidget<A> {
        if (!this._widget) throw (new WidgetException(`No widget bond`)).show();
        return this._widget as IFormControllerWidget<A>;
    }

    bind(widget: IFormControllerWidget<A>): this {
        this._widget = widget;
        return this;
    }

    payload<T>() {
        const payload = {} as T;
        (new FormData(this._widget?.clientElement)).forEach((value, key) => payload[key] = value);
        return payload;
    }

    static getPayload<T>(widget: IFormControllerWidget<any>) {
        return (new FormController()).bind(widget).payload<T>()
    }

}