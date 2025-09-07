import { ObjectUtility } from "../utilities/index.js";
var syncObjectArray = ObjectUtility.syncObjectArray;
export function TokenList() {
    let entries = [];
    return {
        get length() {
            return entries.length;
        },
        get value() {
            return entries.join(" ");
        },
        toString() {
            return entries.join(" ");
        },
        add(...tokens) {
            tokens.forEach((token) => {
                if (!this.contains(token)) {
                    entries[entries.length] = token;
                }
            });
            syncObjectArray(this, entries);
            return this;
        },
        contains(token) {
            return entries.includes(token);
        },
        item(index) {
            return entries[index] || null;
        },
        remove(...tokens) {
            entries = entries.filter((token) => !tokens.includes(token));
            syncObjectArray(this, entries);
            return this;
        },
        replace(token, newToken) {
            let responses = [];
            entries.forEach((value, index) => {
                if (value === token) {
                    entries[index] = newToken;
                    responses[responses.length] = true;
                    return;
                }
                responses[responses.length] = false;
            });
            syncObjectArray(this, entries);
            return responses.every((response) => response);
        },
        supports(token) {
            return this.contains(token);
        },
        toggle(token, force) {
            if (force !== true) {
                if (this.contains(token)) {
                    this.remove(token);
                    return false;
                }
                else {
                    this.add(token);
                    return true;
                }
            }
            else {
                this.add(token);
                return true;
            }
        },
        forEach(callback, thisArg) {
            entries.forEach((token, index) => callback.apply(thisArg, [token, index, this]));
            return this;
        },
    };
}
