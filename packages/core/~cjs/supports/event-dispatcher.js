"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDispatcher = void 0;
class EventDispatcher {
    constructor() {
        this.propagations = {};
        this.entries = {};
    }
    listen(type, callback, force) {
        this.entries[type] = this.entries[type] || [];
        this.entries[type].push({ callback, force });
        this.propagations[type] = false;
        return this;
    }
    dispatch(type, data) {
        if (this.entries[type]) {
            this.entries[type].map((entry) => {
                if (this.propagations[type] === true) {
                    return;
                }
                const stop = entry.callback(data);
                if (stop === true) {
                    this.propagations[type] = true;
                }
            });
            this.propagations[type] = false;
        }
        return this;
    }
}
exports.EventDispatcher = EventDispatcher;
