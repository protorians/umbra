import type { IClimbing, IClimbingAsyncTask, IClimbingNext, IClimbingTask, IClimbingYield } from "../types/index.js";
export declare class Climbing<R> implements IClimbing<R> {
    readonly entries: Array<R>;
    readonly callback: IClimbingAsyncTask<R>;
    readonly strictMode: boolean;
    responses: Array<R>;
    prepared: IClimbingTask<R> | undefined;
    yield: IClimbingYield<R | undefined>;
    constructor(entries: Array<R>, callback: IClimbingAsyncTask<R>, strictMode?: boolean);
    trigger(done: IClimbingNext<R>, start?: number): this;
    create(entries: Array<R>, callback: IClimbingAsyncTask<R>): IClimbingYield<R | undefined>;
    next(prepared: IClimbingTask<R | undefined>, next: IClimbingNext<R>): boolean;
}
