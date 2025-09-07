var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Color, Column, createRef, createState, Kit, Layer, Override, Stack, Structurable } from "@protorians/widgets";
export class ProgressKit extends Kit {
    _value = 0;
    percent = createState(0);
    indeterminate = createState(false);
    computePercent(value = 1) {
        return (value / (this.options.total || 100)) * 100;
    }
    computeValue(value = 1) {
        return (value * (this.options.total || 100)) / 100;
    }
    get value() {
        return this._value;
    }
    track() {
        const ref = createRef();
        const style = {
            backgroundColor: Color.text,
            transition: 'all 250ms ease-out',
        };
        const isColumn = this.options.direction === 'column' || this.options.direction === 'column-reverse';
        const handler = (widget, percent) => {
            const style = {};
            if (isColumn)
                style.height = `${percent}%`;
            if (!isColumn)
                style.width = `${percent}%`;
            widget.style(style);
        };
        if (isColumn)
            style.width = '100%';
        if (!isColumn)
            style.height = '100%';
        this.percent.effect(percent => ref.current ? handler(ref.current, percent || 0) : void (0));
        return Layer({
            ref,
            style,
            signal: {
                mount: ({ widget }) => handler(widget, this.value || this.options.value || 0)
            },
            children: []
        });
    }
    bar() {
        const size = this.options.size || '128px';
        const weight = this.options.weight || '10px';
        const style = {
            flexDirection: `${this.options.direction || 'row'}`,
            overflow: 'hidden',
            backgroundColor: Color.text_100_a1,
            borderRadius: 'var(--widget-radius-max, 2rem)',
        };
        const isColumn = this.options.direction === 'column' || this.options.direction === 'column-reverse';
        const track = this.track();
        if (isColumn) {
            style.height = size;
            style.width = weight;
        }
        if (!isColumn) {
            style.width = size;
            style.height = weight;
        }
        return Stack({
            role: 'progressbar',
            ariaLabel: this.options.label || 'progress',
            ariaValuemin: 0,
            ariaValuenow: this.options.value || 0,
            ariaValuemax: this.options.total || 100,
            style,
            children: track,
        });
    }
    main() {
        const bar = this.bar();
        this.percent.effect(percent => {
            bar.attribute({
                ariaValuenow: percent || 0,
            });
        });
        this.set(this.options.value || 0);
        return Column({
            children: [
                bar,
            ]
        });
    }
    set(value) {
        const total = this.options.total || 100;
        if (value <= total && value >= 0) {
            this._value = value;
            this.percent.set(this.computePercent(value));
        }
        return this;
    }
    increment() {
        this.percent.set(this.percent.value + this.computeValue());
        return this;
    }
    decrement() {
        this.percent.set(this.percent.value - this.computeValue());
        return this;
    }
    pending(value) {
        this.indeterminate.set(value);
        return this;
    }
}
__decorate([
    Structurable
], ProgressKit.prototype, "track", null);
__decorate([
    Structurable
], ProgressKit.prototype, "bar", null);
__decorate([
    Override()
], ProgressKit.prototype, "main", null);
