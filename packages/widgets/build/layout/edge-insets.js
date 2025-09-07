import { NumberUtility } from "@protorians/core";
export function EdgeInsets({ ratio, x, y, size }) {
    ratio = NumberUtility.decimalPercent(ratio || 1);
    size = size || 1;
    let h = x || size || undefined;
    let v = y || size || undefined;
    if (h && !v)
        v = h * ratio;
    if (!h && v)
        h = v * ratio;
    return { x: h, y: v };
}
