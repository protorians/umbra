import { IRuleColorSet, IRulePayload, IRuleValue } from "../types/index.js";
export declare function isSizeExpression(expression: IRuleValue): boolean;
export declare function computeSizeExpression({ value, compilator }: IRulePayload, index: string, fallback: string): IRuleValue;
export declare function computeValue(payload: IRulePayload): IRuleValue;
export declare function computeGrids(payload: IRulePayload): string;
export declare function computeGridSpan(payload: IRulePayload): string;
export declare function computeGrid(payload: IRulePayload): string;
export declare function computeColor({ value: key, compilator }: IRulePayload): IRuleColorSet;
