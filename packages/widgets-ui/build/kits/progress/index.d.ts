import { IProgress, IProgressLayout, IProgressOptions } from "./type.js";
import { IKit, IState, Kit } from "@protorians/widgets";
export declare class ProgressKit extends Kit<Partial<IProgressLayout>, IProgressOptions> implements IProgress, IKit<Partial<IProgressLayout>, IProgressOptions> {
    protected _value: number;
    percent: IState<number>;
    indeterminate: IState<boolean>;
    protected computePercent(value?: number): number;
    protected computeValue(value?: number): number;
    get value(): number;
    track(): import("@protorians/widgets").WidgetNode<HTMLElement, import("@protorians/widgets").ICommonAttributes>;
    bar(): import("@protorians/widgets").StackWidget;
    main(): import("@protorians/widgets").ColumnStackWidget;
    set(value: number): this;
    increment(): this;
    decrement(): this;
    pending(value: boolean): this;
}
