import type {IFormControllerWidget} from "../types/index.js";
import {WidgetException} from "../errors/index.js";

export class FormController {
    protected _widget: IFormControllerWidget | undefined

    get widget(): IFormControllerWidget {
        if (!this._widget) throw (new WidgetException(`No widget bond`)).show()
        return this._widget as IFormControllerWidget
    }

    bind(widget: IFormControllerWidget): this {
        this._widget = widget;
        return this;
    }

}