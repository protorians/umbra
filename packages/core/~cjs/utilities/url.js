"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlUtility = void 0;
const object_1 = require("./object");
var UrlUtility;
(function (UrlUtility) {
    function paramsObject(searchParams) {
        if (searchParams) {
            searchParams = searchParams.trim();
            const out = {};
            const f = searchParams.substring(0, 1);
            (f == '?' ? searchParams.substring(1) : searchParams).split('&').forEach(param => {
                const eq = param.split('=');
                const name = eq[0];
                if (name != 'child') {
                    out[name] = (eq[1]);
                }
            });
            return out;
        }
        return undefined;
    }
    UrlUtility.paramsObject = paramsObject;
    function urlParams(params) {
        return object_1.ObjectUtility.toString(params, { eq: '=', joiner: '&' });
    }
    UrlUtility.urlParams = urlParams;
})(UrlUtility || (exports.UrlUtility = UrlUtility = {}));
