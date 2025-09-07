export var ArcaneObject;
(function (ArcaneObject) {
    function toNested(obj, nestedPath) {
        return nestedPath.split('.')
            .reduce((acc, key) => acc && acc[key], obj);
    }
    ArcaneObject.toNested = toNested;
    function unWrap(input, prefix, suffix) {
        const result = [];
        function deep(value) {
            if (Array.isArray(value)) {
                value.forEach(deep);
            }
            else if (typeof value === "object" && value !== null) {
                Object.values(value).forEach(deep);
            }
            else {
                result.push(`${prefix || ''}${String(value)}${suffix || ''}`);
            }
        }
        deep(input);
        return result;
    }
    ArcaneObject.unWrap = unWrap;
})(ArcaneObject || (ArcaneObject = {}));
