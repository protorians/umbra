export function createSetterMethods<I extends Object, B extends Object>(instance: I, blueprints: B) {
    for (const blueprint of Object.keys(blueprints)) {
        instance[blueprint as any] = (value: B[keyof B]) => {
            blueprints[blueprint as any] = value;
            return instance;
        };
    }
    return instance;
} 