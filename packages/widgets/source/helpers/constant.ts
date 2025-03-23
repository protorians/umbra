import {Aligning, AligningDirection, AligningProperty} from "../enums.js";

export function resolveDirection(dir: AligningDirection) {
  return (Object.values(AligningDirection) as string[]).includes(dir as string) ? dir : undefined;
}


export function resolveAlignmentProperty(property: AligningProperty) {
  return (Object.values(AligningProperty) as string[]).includes(property as string) ? property : undefined;
}

export function resolveAlignment(aligning: Aligning) {
  return (Object.values(Aligning) as string[])
    .includes(aligning as string) ? aligning : undefined;
}
