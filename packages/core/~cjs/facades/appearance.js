"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppearance = createAppearance;
exports.useAppearance = useAppearance;
const supports_1 = require("../supports");
function createAppearance(stylesheet) {
    return useAppearance().sheet(stylesheet);
}
function useAppearance() {
    return (new supports_1.CoreAppearance());
}
