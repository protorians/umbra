import {AligningDirection, IKit, IState, IWidgetNode} from "@protorians/widgets";
import {ProgressType} from "./enum.js";
import {LayerVariant} from "../../enums.js";

export interface IProgressLayout {
    bar: IWidgetNode<any, any>;
    track: IWidgetNode<any, any>;
}

export interface IProgressOptions {
    type?: ProgressType;
    title?: string;
    label?: string;
    value?: number;
    total?: number;
    size?: number | string;
    weight?: number;
    outline?: boolean;
    indeterminate?: boolean;
    variant?: LayerVariant;
    direction?: AligningDirection;
}

export interface IProgressActionable {

    percent: IState<number>;

    get value(): number;

    set(value: number): this;

    increment(): this;

    decrement(): this;

    pending(value: boolean): this;

}

export interface IProgress extends IKit<Partial<IProgressLayout>, IProgressOptions>, IProgressActionable {
}