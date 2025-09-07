"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionUtility = void 0;
var FunctionUtility;
(function (FunctionUtility) {
    function isAncestor(origin, child) {
        return child.prototype instanceof origin;
    }
    FunctionUtility.isAncestor = isAncestor;
})(FunctionUtility || (exports.FunctionUtility = FunctionUtility = {}));
