"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClimbing = useClimbing;
const supports_1 = require("../supports");
function useClimbing(entries, callback) {
    return new supports_1.Climbing(entries, callback);
}
