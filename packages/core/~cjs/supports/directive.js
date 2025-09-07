"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Directives = void 0;
const enums_1 = require("./enums");
class Directives {
    constructor() {
        this._stack = new Map();
    }
    stack() {
        return this._stack;
    }
    get directives() {
        const entries = {};
        for (const [key, value] of this._stack.entries())
            entries[key] = value;
        return entries;
    }
    directive(id) {
        return this._stack.get(id);
    }
    add(id, value) {
        this._stack.set(id, value);
        return this;
    }
    remove(id) {
        this._stack.delete(id);
        return this;
    }
    clear() {
        this._stack.clear();
        return this;
    }
    process(value, type, args) {
        for (const [id, directive] of Object.entries(this.directives)) {
            const parsed = directive({ value, type, args });
            if (parsed === enums_1.TreatmentQueueStatus.Exit || parsed === enums_1.TreatmentQueueStatus.Cancel)
                return value;
            else if (parsed === enums_1.TreatmentQueueStatus.SnapOut)
                this.remove(id);
            else if (typeof parsed !== 'undefined')
                value = parsed;
        }
        return value;
    }
}
exports.Directives = Directives;
