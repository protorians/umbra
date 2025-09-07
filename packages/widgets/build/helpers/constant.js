import { Aligning, AligningDirection, AligningProperty } from "../enums.js";
export function resolveDirection(dir) {
    return Object.values(AligningDirection).includes(dir) ? dir : undefined;
}
export function resolveAlignmentProperty(property) {
    return Object.values(AligningProperty).includes(property) ? property : undefined;
}
export function resolveAlignment(aligning) {
    return Object.values(Aligning)
        .includes(aligning) ? aligning : undefined;
}
