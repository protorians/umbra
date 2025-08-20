export namespace NumberUtility {

    /**
     * Determines whether the provided input is a valid number.
     *
     * @param {string | number} number - The input value to be checked.
     * @return {boolean} Returns true if the input is a valid number, otherwise false.
     */
    export function isNumber(number: string | number): boolean {
        return !isNaN(parseInt(`${number}`));
    }

    /**
     * Adjusts a given number to ensure it falls within a specified range.
     * If the number is below the minimum value (`from`), it will return the minimum.
     * If the number is above the maximum value (`to`), it will return the maximum.
     * Otherwise, it returns the original number.
     *
     * @param {number} value - The number to be adjusted.
     * @param {number} [from=0] - The lower bound of the range (default is 0).
     * @param {number} [to=100] - The upper bound of the range (default is 100).
     * @return {number} The adjusted number constrained within the range specified.
     */
    export function adjust(value: number, from: number = 0, to: number = 100): number {
        return value < from ? from : (value > to ? to : value);
    }

    /**
     * Adjusts the given percentage value to ensure it is within the range of 0 to 100.
     *
     * @param {number} value - The percentage value to be adjusted.
     * @return {number} The adjusted percentage value, constrained between 0 and 100.
     */
    export function percent(value: number): number {
        return clamp(value, 0, 100)
    }

    /**
     * Adjusts a numeric value to ensure it falls within the decimal percentage range of 0 to 1.
     * If the value is less than 0, it will return 0. If the value is greater than 1, it will return 1.
     * Otherwise, it will return the value as is.
     *
     * @param {number} value - The numeric value to be adjusted to the decimal percentage range.
     * @return {number} The adjusted value, constrained between 0 and 1.
     */
    export function decimalPercent(value: number): number {
        return clamp(value, 0, 1)
    }

    /**
     * Clamps a number between a minimum and maximum value.
     * @example clamp(10, 0, 20) // 10
     * clamp(30, 0, 20) // 20
     * clamp(-10, 0, 20) // 0
     */
    export function clamp(value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max);
    }


    /**
     * Determines if a given number is a floating-point number.
     *
     * @param {number} value - The number to be evaluated.
     * @return {boolean} Returns true if the number is a floating-point number, otherwise false.
     */
    export function floated(value: number): boolean {
        return !isNaN(value) && parseFloat(String(value)) === Number(value) && value % 1 !== 0;
    }

    /**
     * Extracts all numeric values from a given input, which can be either a string or a number.
     * If the input is a number, it returns an array containing that number.
     * If the input is a string, it extracts all numeric substrings, including decimal and negative numbers.
     *
     * @param {string | number} value - The input value from which to extract numbers. It can be a string or a number.
     * @return {number[]} Array of extracted numbers. If no numbers are found in the input, returns an empty array.
     */
    export function extract(value: string | number): number[] {
        if (typeof value === "number") return [value];
        return [...value.toString().matchAll(/-?\d+(\.\d+)?/g)].map(x => (x[0] as any) * 1);
    }


    export function isEven(value: number): boolean {
        return value % 2 === 0;
    }

    /**
     * Pads a string with a character to a given length
     * @example
     * pad('123', 5) // '00123'
     * pad('123', 5, '-', true) // -> '123--'
     */
    export function pad(value: string | number, length: number = 2, char: string = '0', right: boolean = false): string {
        value = String(value);
        if (value.length >= length) return value;

        const padding = char.repeat(length - value.length);
        return right ? value + padding : padding + value;
    }

}