import * as path from "node:path";
import * as url from "url";
export var ArcaneString;
(function (ArcaneString) {
    function nameable(name) {
        return (name.includes('/') || name.includes('\\'))
            ? slugify(name)
            : (name).split('?')[0];
    }
    ArcaneString.nameable = nameable;
    function nameFromUrl(currentUrl) {
        return !currentUrl ? null : path.basename(url.parse(currentUrl).pathname || "");
    }
    ArcaneString.nameFromUrl = nameFromUrl;
    function slugify(data) {
        return data
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "-")
            .replace(/[^a-zA-Z0-9 ]/g, "-")
            .trim()
            .replace(/\s+/g, "-")
            .toLowerCase();
    }
    ArcaneString.slugify = slugify;
    function trimSpace(data) {
        return data.replace(/ /g, '');
    }
    ArcaneString.trimSpace = trimSpace;
    function ucFirst(data, strict = false) {
        return data.charAt(0).toUpperCase() + (strict ? data.slice(1).toLowerCase() : data.slice(1));
    }
    ArcaneString.ucFirst = ucFirst;
    function ucWords(data, strict = false) {
        return data.split(' ').map(frag => frag.charAt(0).toUpperCase() + (strict ? frag.slice(1).toLowerCase() : frag.slice(1))).join(' ');
    }
    ArcaneString.ucWords = ucWords;
    function random(length = 10) {
        const provider = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const out = [];
        for (let index = 0; index < length; index++) {
            out.push(provider.charAt(Math.floor(Math.random() * provider.length)));
        }
        return out.join('');
    }
    ArcaneString.random = random;
    function logTime(date = undefined) {
        return (date || (new Date())).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });
    }
    ArcaneString.logTime = logTime;
    function logDateTime(date = undefined) {
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
    ArcaneString.logDateTime = logDateTime;
})(ArcaneString || (ArcaneString = {}));
