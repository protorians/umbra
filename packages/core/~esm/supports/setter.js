export function createSetterMethods(instance, blueprints) {
    for (const blueprint of Object.keys(blueprints)) {
        instance[blueprint] = (value) => {
            blueprints[blueprint] = value;
            return instance;
        };
    }
    return instance;
}
