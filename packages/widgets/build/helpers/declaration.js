export function declarationExplodes(props, targetKeys) {
    const extended = {};
    const declaration = {};
    Object.entries(props)
        .forEach(([key, value]) => {
        if (targetKeys.includes(key)) {
            extended[key] = value;
        }
        else {
            declaration[key] = value;
        }
    });
    return { extended, declaration };
}
