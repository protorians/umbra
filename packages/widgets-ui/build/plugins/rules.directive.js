import { Compilate } from "./compilate.js";
export class RulesDirectives {
    static _stack = new Map();
    static get directives() {
        const entries = {};
        for (const [key, value] of this._stack.entries())
            entries[key] = value;
        return entries;
    }
    static add(alias, callable) {
        this._stack.set(alias, callable);
        return this;
    }
    static get(alias) {
        return this._stack.get(alias);
    }
    static remove(alias) {
        this._stack.delete(alias);
        return this;
    }
    static clear() {
        this._stack.clear();
        return this;
    }
}
export function getRules() {
    return RulesDirectives.directives;
}
export function getRule(alias) {
    return RulesDirectives.get(alias);
}
export function addRule(options) {
    Compilate.setRulePriority(options.alias, options.order || 0);
    RulesDirectives.add(options.alias, (payload) => options.callable(payload));
    return addRule;
}
export function removeRule(alias) {
    RulesDirectives.remove(alias);
    return removeRule;
}
export function clearRules() {
    RulesDirectives.clear();
}
