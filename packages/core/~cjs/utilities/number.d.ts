export declare namespace NumberUtility {
    function isNumber(number: string | number): boolean;
    function adjust(value: number, from?: number, to?: number): number;
    function percent(value: number): number;
    function decimalPercent(value: number): number;
    function clamp(value: number, min: number, max: number): number;
    function floated(value: number): boolean;
    function extract(value: string | number): number[];
    function isEven(value: number): boolean;
    function pad(value: string | number, length?: number, char?: string, right?: boolean): string;
}
