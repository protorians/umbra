"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ui = $ui;
function $ui(target, scope) {
    return typeof target === 'string' ? Array.from((scope || document).querySelectorAll(target)) : (Array.isArray(target) ? target : [target]);
}
