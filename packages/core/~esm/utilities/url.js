import { ObjectUtility } from "./object.js";
export var UrlUtility;
(function (UrlUtility) {
    function paramsObject(searchParams) {
        if (searchParams) {
            searchParams = searchParams.trim();
            const out = {};
            const f = searchParams.substring(0, 1);
            (f == "?" ? searchParams.substring(1) : searchParams).split("&").forEach(param => {
                const eq = param.split("=");
                const name = eq[0];
                if (name != "child") {
                    out[name] = (eq[1]);
                }
            });
            return out;
        }
        return undefined;
    }
    UrlUtility.paramsObject = paramsObject;
    function urlParams(params) {
        return ObjectUtility.toString(params, { eq: "=", joiner: "&" });
    }
    UrlUtility.urlParams = urlParams;
})(UrlUtility || (UrlUtility = {}));
