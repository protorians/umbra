import type { IClimbingAsyncTask } from "../types/index.js";
import { Climbing } from "../supports/index.js";
export declare function useClimbing<R>(entries: Array<R>, callback: IClimbingAsyncTask<R>): Climbing<R>;
