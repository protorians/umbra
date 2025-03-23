// import {IProgress} from "../types/index.js";
// import {ISignalStack, Signal} from "@protorians/core";
//
//
// export class Progress implements IProgress {
//     protected current: ISignalStack<number> = new Signal.Stack;
//     protected limit: number = 100;
//
//     constructor(private readonly initial: number = 0) {
//     }
//
//     set(value: number): this {
//         this.current = value;
//         return this;
//     }
//
//     get(): number {
//         return this.current;
//     }
//
//     increment(): this {
//         this.current = this.current + (this.current * 0.1);
//         return this;
//     }
//
//     decrement(): this {
//         this.current = this.current - (this.current * 0.1);
//         return this;
//     }
//
//     total(value: number): this {
//         this.limit = value;
//         return this;
//     }
// }