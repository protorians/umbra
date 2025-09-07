export function computeAnimetricEase(value, animetric) {
    return animetric.options.ease
        ? animetric.options.ease.compute(value) || value
        : value;
}
