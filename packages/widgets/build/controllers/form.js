import { WidgetException } from "../errors/index.js";
export class FormController {
    _widget;
    get widget() {
        if (!this._widget)
            throw (new WidgetException(`No widget bond`)).show();
        return this._widget;
    }
    bind(widget) {
        this._widget = widget;
        return this;
    }
    payload() {
        const payload = {};
        (new FormData(this._widget?.clientElement)).forEach((value, key) => payload[key] = value);
        return payload;
    }
    static getPayload(widget) {
        return (new FormController()).bind(widget).payload();
    }
}
