export class RefWidget {
    widget;
    get current() {
        return this.widget;
    }
    attach(widget) {
        if (typeof this.widget !== 'undefined')
            return this;
        this.widget = widget;
        return this;
    }
    detach() {
        if (typeof this.widget === 'undefined')
            return;
        this.widget = undefined;
    }
}
export function createRef() {
    return new RefWidget();
}
