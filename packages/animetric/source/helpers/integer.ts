export function round(value: number, digit: number = 3): number {
    return parseFloat(value.toFixed(digit));
}

export function toPercent(percent: number): number {
    return percent < 0 ? 0 : (percent > 100 ? 100 : percent);
}