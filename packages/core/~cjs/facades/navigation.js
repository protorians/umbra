"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNavigation = createNavigation;
const supports_1 = require("../supports");
function createNavigation(middleware) {
    const navigation = (new supports_1.Navigation());
    return middleware ? navigation.middleware(middleware) : navigation;
}
