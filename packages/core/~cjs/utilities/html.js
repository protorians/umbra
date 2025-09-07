"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlUtility = void 0;
var HtmlUtility;
(function (HtmlUtility) {
    function escape(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/'/g, '&apos;')
            .replace(/"/g, '&quot;')
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;');
    }
    HtmlUtility.escape = escape;
    function unescape(text) {
        return text
            .replace(/&amp/g, '&')
            .replace(/&apos/g, "'")
            .replace(/&quot/g, '"')
            .replace(/&gt/g, '>')
            .replace(/&lt/g, '<');
    }
    HtmlUtility.unescape = unescape;
    function ascendingPath(child, validator) {
        let node = child.parentElement;
        while (node != null) {
            if (validator(node)) {
                return node;
            }
            node = node.parentElement;
        }
        return undefined;
    }
    HtmlUtility.ascendingPath = ascendingPath;
})(HtmlUtility || (exports.HtmlUtility = HtmlUtility = {}));
