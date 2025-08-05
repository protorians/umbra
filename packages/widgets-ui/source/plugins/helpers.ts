import {IRuleColorSet, IRulePayload, IRuleValue} from "../types/index.js";
import {ComputeType, RuleType} from "../enums.js";
import {NumberUtility} from "@protorians/core";
import {ColorPalette} from "@protorians/widgets";

/**
 * Computes and returns a value based on the provided type and payload details.
 *
 * @param {Object} payload - The input payload for computation.
 * @param {any} payload.value - The value to compute or process.
 * @param {RuleType} payload.type - The type of the rule determining computation logic.
 * @param {Compilator} payload.compilator - The compilator utility to aid in the computation.
 * @return {string|any} The computed value as a string when applicable, or the original value.
 */
export function computeValue({value, type, compilator}: IRulePayload): IRuleValue {
    if (type === RuleType.Synthetic || type === RuleType.Customize) {
        return value;
    } else {
        return NumberUtility.isNumber(String(value))
            ? `${compilator.compute<number>(ComputeType.Spacing, parseInt(String(value || '1')))}px`
            : value;
    }
}

/**
 * Computes and returns the grid configuration as a string based on the provided rule payload.
 *
 * @param {IRulePayload} payload - The rule payload containing the type and value to compute the grid configuration.
 * @return {string} The computed grid configuration as a string.
 */
export function computeGrids(payload: IRulePayload): string {
    let value: string = `repeat(${payload.value}, minmax(0, 1fr))`;

    if (payload.value === 'none') value = 'none';
    else if (payload.value === 'subgrid') value = 'subgrid';
    else if (payload.type === RuleType.Synthetic || payload.type === RuleType.Customize) value = `${computeValue(payload)}`

    return value;
}

/**
 * Computes the grid layout value based on the given payload.
 *
 * @param {IRulePayload} payload - An object containing the properties required to compute the grid value. It must include a `value` property, which determines the grid layout.
 * @return {string} A string representing the computed grid layout. The value could be `1 / -1` for 'full', `auto` for 'auto', or a span calculated from the `value` in the payload.
 */
export function computeGridSpan(payload: IRulePayload): string {
    if (payload.value === 'full') return `1 / -1`;
    if (payload.value === 'auto') return `auto`;
    return `span ${payload.value} / span ${payload.value}`
}

export function computeGrid(payload: IRulePayload): string {
    if (payload.value === 'full') return `1 / -1`;
    if (payload.value === 'auto') return `auto`;
    return `${payload.value}`
}

/**
 * Computes and generates a set of color variables based on the provided key and compiles them into the specified configuration.
 *
 * @param {Object} payload - The payload containing key and compilator details.
 * @param {*} payload.value - The key used to determine the color and its variations.
 * @param {Object} payload.compilator - The compilator instance used for injecting and managing configurations.
 * @return {Object} An object containing generated color variables and a reference to the computed color value.
 */
export function computeColor({value: key, compilator}: IRulePayload): IRuleColorSet {
    const index = String(key).split('-')[0];
    const variables = compilator.configs?.findVariables(`--color-${index}`);
    const output: Record<string, string | undefined> = {};

    if (variables) {
        for (const {layer, section, value} of variables) {
            const payload = {layer, priority: false,}

            if (section === 'root') {
                output.default = `light-dark(var(--color-light-${key}), var(--color-dark-${key}))`;
                compilator.inject({
                    ...payload,
                    rules: {
                        [`--color-${key}`]: output.default,
                    }
                })
            } else {
                output[section] = ColorPalette.generate(value, String(key));
                compilator.inject({
                    ...payload,
                    selector: `@media (prefers-color-scheme: ${section})`,
                    rules: {
                        [`--color-${section}-${key}`]: output[section],
                    }
                })
            }
        }
    }

    return {
        ...output,
        value: `var(--color-${String(key).trim()})`,
    };
}