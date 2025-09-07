export interface IProgress {
    set(value: number): this;
    get(): number;
    increment(): this;
    decrement(): this;
    total(value: number): this;
}
