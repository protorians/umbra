import {IProgress, IProgressLayout, IProgressOptions} from "./type.js";
import {
    Color,
    Column, createRef,
    createState,
    IKit,
    IState,
    IStyleSheetDeclarations, IWidgetNode,
    Kit, Layer,
    Override,
    Stack,
    Structurable
} from "@protorians/widgets";


export class ProgressKit extends Kit<Partial<IProgressLayout>, IProgressOptions> implements IProgress, IKit<Partial<IProgressLayout>, IProgressOptions> {

    // protected static layoutSlugs: (keyof IProgressLayout)[] = []
    protected _value: number = 0;

    percent: IState<number> = createState<number>(0);
    indeterminate: IState<boolean> = createState<boolean>(false);

    protected computePercent(value: number = 1): number {
        return (value / (this.options.total || 100)) * 100;
    }

    protected computeValue(value: number = 1): number {
        return (value * (this.options.total || 100)) / 100;
    }

    get value(): number {
        return this._value;
    }

    @Structurable track() {
        const ref = createRef()
        const style: IStyleSheetDeclarations = {
            backgroundColor: Color.text,
            transition: 'all 250ms ease-out',
        }
        const isColumn = this.options.direction === 'column' || this.options.direction === 'column-reverse';
        const handler = (
            widget: IWidgetNode<any, any>,
            percent: number
        ) => {
            const style: IStyleSheetDeclarations = {};
            if (isColumn) style.height = `${percent}%`;
            if (!isColumn) style.width = `${percent}%`;
            widget.style(style);
        }

        if (isColumn) style.width = '100%';
        if (!isColumn) style.height = '100%';

        this.percent.effect(percent =>
            ref.current ? handler(ref.current, percent || 0) : void (0))

        return Layer({
            ref,
            style,
            signal: {
                mount: ({widget}) =>
                    handler(widget, this.value || this.options.value || 0)
            },
            children: []
        })
    }

    @Structurable bar() {
        const size: number | string = this.options.size || '128px';
        const weight: number | string = this.options.weight || '10px';
        const style: IStyleSheetDeclarations = {
            flexDirection: `${this.options.direction || 'row'}`,
            overflow: 'hidden',
            backgroundColor: Color.text_100_a1,
            borderRadius: 'var(--widget-radius-max, 2rem)',
        }
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
        })
    }

    @Override() main() {
        const bar = this.bar();

        this.percent.effect(percent => {
            bar.attribute({
                ariaValuenow: percent || 0,
            })
        })

        this.set(this.options.value || 0)
        return Column({
            children: [
                bar,
            ]
        });
    }


    set(value: number): this {
        const total = this.options.total || 100;
        if (value <= total && value >= 0) {
            this._value = value;
            this.percent.set(this.computePercent(value));
        }
        return this;
    }

    increment(): this {
        this.percent.set(this.percent.value + this.computeValue());
        return this;
    }

    decrement(): this {
        this.percent.set(this.percent.value - this.computeValue());
        return this;
    }

    pending(value: boolean): this {
        this.indeterminate.set(value);
        return this;
    }

}