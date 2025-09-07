import { ComputeType, RuleType } from "../enums.js";
import { NumberUtility } from "@protorians/core";
import { ColorPalette, SizeExpression } from "@protorians/widgets";
export function isSizeExpression(expression) {
    return expression ? Object.values(SizeExpression).includes(String(expression)) : false;
}
export function computeSizeExpression({ value, compilator }, index, fallback) {
    let variable = (value && isSizeExpression(value))
        ? compilator.configs?.findVariables(`--${index}-${value}`)?.[0]?.value || undefined
        : (compilator.configs?.findVariables(`--${index}-${value}`)?.[0]?.value || undefined);
    variable = variable || compilator.configs?.findVariables(`--${fallback}-${value}`)?.[0]?.value || undefined;
    return variable;
}
export function computeValue(payload) {
    if (payload.type === RuleType.Synthetic || payload.type === RuleType.Customize) {
        return payload.value;
    }
    else {
        return NumberUtility.isNumber(String(payload.value))
            ? `${payload.compilator.compute(ComputeType.Spacing, parseInt(String(payload.value || '1')))}px`
            : payload.value;
    }
}
export function computeGrids(payload) {
    let value = `repeat(${payload.value}, minmax(0, 1fr))`;
    if (payload.value === 'none')
        value = 'none';
    else if (payload.value === 'subgrid')
        value = 'subgrid';
    else if (payload.type === RuleType.Synthetic || payload.type === RuleType.Customize)
        value = `${computeValue(payload)}`;
    return value;
}
export function computeGridSpan(payload) {
    if (payload.value === 'full')
        return `1 / -1`;
    if (payload.value === 'auto')
        return `auto`;
    return `span ${payload.value} / span ${payload.value}`;
}
export function computeGrid(payload) {
    if (payload.value === 'full')
        return `1 / -1`;
    if (payload.value === 'auto')
        return `auto`;
    return `${payload.value}`;
}
export function computeColor({ value: key, compilator }) {
    const index = String(key).split('-')[0];
    const variables = compilator.configs?.findVariables(`--color-${index}`);
    const output = {};
    if (variables) {
        for (const { layer, section, value } of variables) {
            const payload = { layer, priority: false, };
            if (section === 'root') {
                output.default = `light-dark(var(--color-light-${key}), var(--color-dark-${key}))`;
                compilator.inject({
                    ...payload,
                    rules: {
                        [`--color-${key}`]: output.default,
                    }
                });
            }
            else {
                output[section] = ColorPalette.generate(value, String(key));
                compilator.inject({
                    ...payload,
                    selector: `:root, :host`,
                    rules: {
                        [`--color-${section}-${key}`]: `${output[section]} !important`,
                    }
                });
            }
        }
    }
    return {
        ...output,
        value: `var(--color-${String(key).trim()})`,
    };
}
