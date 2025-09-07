export function round(value, digit = 3) {
    return parseFloat(value.toFixed(digit));
}
export function toPercent(percent) {
    return percent < 0 ? 0 : (percent > 100 ? 100 : percent);
}
