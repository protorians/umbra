"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberUtility = void 0;
var NumberUtility;
(function (NumberUtility) {
    function isNumber(number) {
        return !isNaN(parseInt(`${number}`));
    }
    NumberUtility.isNumber = isNumber;
    function adjust(value, from = 0, to = 100) {
        return value < from ? from : (value > to ? to : value);
    }
    NumberUtility.adjust = adjust;
    function percent(value) {
        return clamp(value, 0, 100);
    }
    NumberUtility.percent = percent;
    function decimalPercent(value) {
        return clamp(value, 0, 1);
    }
    NumberUtility.decimalPercent = decimalPercent;
    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
    NumberUtility.clamp = clamp;
    function floated(value) {
        return !isNaN(value) && parseFloat(String(value)) === Number(value) && value % 1 !== 0;
    }
    NumberUtility.floated = floated;
    function extract(value) {
        if (typeof value === "number")
            return [value];
        return [...value.toString().matchAll(/-?\d+(\.\d+)?/g)].map(x => x[0] * 1);
    }
    NumberUtility.extract = extract;
    function isEven(value) {
        return value % 2 === 0;
    }
    NumberUtility.isEven = isEven;
    function pad(value, length = 2, char = '0', right = false) {
        value = String(value);
        if (value.length >= length)
            return value;
        const padding = char.repeat(length - value.length);
        return right ? value + padding : padding + value;
    }
    NumberUtility.pad = pad;
})(NumberUtility || (exports.NumberUtility = NumberUtility = {}));
