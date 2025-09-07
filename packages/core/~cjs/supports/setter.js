"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSetterMethods = createSetterMethods;
function createSetterMethods(instance, blueprints) {
    for (const blueprint of Object.keys(blueprints)) {
        instance[blueprint] = (value) => {
            blueprints[blueprint] = value;
            return instance;
        };
    }
    return instance;
}
