
export type IClimbingTask<R> = Generator<Promise<R>, void, IClimbingNext<R>>;

export type IClimbingYield<R> = (index: number) => IClimbingTask<R>;

export type IClimbingAsyncTask<R> = (index: number) => Promise<R> | undefined;

export type IClimbingNext<R> = ((instance: IClimbing<R>) => any) | undefined;


export interface IClimbing<R> {

  responses: Array<R>

  prepared: IClimbingTask<R> | undefined;

  yield: IClimbingYield<R | undefined>;

  trigger(done: IClimbingNext<R>, start?: number): this;

  create(entries: Array<R>, callback: IClimbingAsyncTask<R>): IClimbingYield<R | undefined>;

  next(prepared: IClimbingTask<R>, next: IClimbingNext<R>): boolean;

}

