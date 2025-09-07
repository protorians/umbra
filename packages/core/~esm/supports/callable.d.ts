export declare namespace Callable {
    function safe<T extends []>(fn: Function, args?: T): number | NodeJS.Timer;
    function every<T extends []>(fn: Function, args?: T, timeout?: number): number | NodeJS.Timer;
    function delay<T extends []>(fn: Function, args?: T, timeout?: number): number | NodeJS.Timer;
}
