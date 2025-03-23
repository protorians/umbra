export function isNumber(number: string | number): boolean {
    return !isNaN(parseInt(`${number}`));
}

export function adjustPercent(value: number) {
    return value < 0 ? 0 : (value > 100 ? 100 : value);
}

export function adjustDecimalPercent(value: number) {
    return value < 0 ? 0 : (value > 1 ? 1 : value);
}

export function pad(numeric: string, length: number = 2): string {
    return (new Array(length).join('0') + numeric).slice(-length);
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}


export function extractNumbers(value: string | number) {
    if (typeof value === "number") return [value];
    return [...value.toString().matchAll(/-?\d+(\.\d+)?/g)].map(x => (x[0] as any) * 1);
}