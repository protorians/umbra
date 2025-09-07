"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextUtility = void 0;
var TextUtility;
(function (TextUtility) {
    function addSlashes(text) {
        return text.replace(new RegExp("'", 'g'), "\\'");
    }
    TextUtility.addSlashes = addSlashes;
    function stripSlashes(text) {
        return text.replace(new RegExp("\\'", 'g'), "'");
    }
    TextUtility.stripSlashes = stripSlashes;
    function stripHTMLTags(text) {
        return text.replace(/<\/?[^>]+(>|$)/g, "");
    }
    TextUtility.stripHTMLTags = stripHTMLTags;
    function unCamelCase(value, separator = '-') {
        let t = value.replace(/[A-Z]/g, letter => `${separator}${letter.toLowerCase()}`);
        t = t.startsWith('-') && !t.startsWith('--')
            ? t.slice(1) : t;
        return t;
    }
    TextUtility.unCamelCase = unCamelCase;
    function camelCase(value) {
        return value.trim().replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
    }
    TextUtility.camelCase = camelCase;
    function fixExponent(x) {
        let value = `${x}`;
        if (Math.abs(x) < 1.0) {
            let e = parseInt(x.toString().split('e-')[1]);
            if (e) {
                x *= Math.pow(10, e - 1);
                value = `0.${new Array(e).join('0')}${x.toString().substring(2)}`;
            }
        }
        else {
            let e = parseInt(x.toString().split('+')[1]);
            if (e > 20) {
                e -= 20;
                x /= Math.pow(10, e);
                value = `${x}${(new Array(e + 1)).join('0')}`;
            }
        }
        return value;
    }
    TextUtility.fixExponent = fixExponent;
    function slugify(str) {
        str = str.replace(/^\s+|\s+$/g, '');
        str = str.toLowerCase();
        const from = "ãàáäâáº½èéëêìíïîõòóöôùúüûñç·/_,:;";
        const to = "aaaaaeeeeeiiiiooooouuuunc------";
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
        str = str.replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
        return str;
    }
    TextUtility.slugify = slugify;
    function ucFirstLetter(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
    TextUtility.ucFirstLetter = ucFirstLetter;
    function lcFirstLetter(value) {
        return value.charAt(0).toLowerCase() + value.slice(1);
    }
    TextUtility.lcFirstLetter = lcFirstLetter;
    function trimSpace(data) {
        return data.replace(/ /g, '');
    }
    TextUtility.trimSpace = trimSpace;
    function ucWords(data, strict = false) {
        return data.split(' ').map(frag => frag.charAt(0).toUpperCase() + (strict ? frag.slice(1).toLowerCase() : frag.slice(1))).join(' ');
    }
    TextUtility.ucWords = ucWords;
    function randomName(length = 10) {
        const provider = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let out = [];
        for (let index = 0; index < length; index++) {
            out.push(provider.charAt(Math.floor(Math.random() * provider.length)));
        }
        return out.join('');
    }
    TextUtility.randomName = randomName;
    function logTime(date) {
        return (date || (new Date())).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });
    }
    TextUtility.logTime = logTime;
    function logDateTime(date) {
        return (date || (new Date())).toLocaleTimeString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });
    }
    TextUtility.logDateTime = logDateTime;
    function snapSequence(rex, input) {
        let x = 0;
        return input.replace(rex, () => `$${++x}`);
    }
    TextUtility.snapSequence = snapSequence;
    function parseSequence(sequence, dictionary) {
        let x = 0;
        return sequence.replace(/\$\d+/g, () => `${dictionary[x++] || "0"}`);
    }
    TextUtility.parseSequence = parseSequence;
    function kebabCase(value) {
        return unCamelCase(camelCase(value), '-');
    }
    TextUtility.kebabCase = kebabCase;
    function snakeCase(value) {
        return unCamelCase(camelCase(value), '_');
    }
    TextUtility.snakeCase = snakeCase;
    function capitalize(value) {
        return value.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }
    TextUtility.capitalize = capitalize;
    function truncate(value, length, suffix = '...') {
        if (value.length <= length)
            return value;
        return value.slice(0, length) + suffix;
    }
    TextUtility.truncate = truncate;
    function isStringable(value) {
        return value === "string" || value === "bigint" || value === "number";
    }
    TextUtility.isStringable = isStringable;
})(TextUtility || (exports.TextUtility = TextUtility = {}));
