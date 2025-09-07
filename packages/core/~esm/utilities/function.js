export var FunctionUtility;
(function (FunctionUtility) {
    function isAncestor(origin, child) {
        return child.prototype instanceof origin;
    }
    FunctionUtility.isAncestor = isAncestor;
})(FunctionUtility || (FunctionUtility = {}));
