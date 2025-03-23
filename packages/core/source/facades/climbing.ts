import type {IClimbingAsyncTask} from "../types";
import {Climbing} from "../supports";

export function useClimbing<R>(entries : Array<R>, callback : IClimbingAsyncTask<R>){
  return new Climbing(entries, callback)
}