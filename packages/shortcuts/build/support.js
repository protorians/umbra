import { $ui, Environment, Signal } from "@protorians/core";
import { ShortcutScope } from "./enum.js";
export class Shortcut {
    options;
    _shortcuts = [];
    actives = new Set();
    buffer = [];
    timeout = 1000;
    timer;
    enabled = true;
    targets;
    signal;
    get shortcuts() {
        return this._shortcuts;
    }
    get focused() {
        return this.targets.some(target => target.contains(document.activeElement) || target === document.activeElement);
    }
    constructor(target, options = {}) {
        this.options = options;
        this.targets = $ui(target || document.documentElement);
        this.signal = new Signal.Stack();
        this.targets.forEach(target => {
            const scope = this.resolveScope(target, this.options.scope);
            if (scope) {
                scope.addEventListener("keydown", this.down.bind(this));
                scope.addEventListener("keyup", this.up.bind(this));
            }
        });
    }
    static Ctrl(keys) {
        return `Control+${keys}`;
    }
    static Shift(keys) {
        return `Shift+${keys}`;
    }
    static Meta(keys) {
        return `Meta+${keys}`;
    }
    static Alt(keys) {
        return `Alt+${keys}`;
    }
    static Command(keys) {
        return `${(Environment.MacOs || Environment.iOS) ? 'Meta' : 'Control'}+${keys}`;
    }
    static Option(keys) {
        return `Alt+${keys}`;
    }
    down(event) {
        if (!this.enabled)
            return;
        const key = this.key(event);
        this.actives.add(key);
        this.buffer.push(key);
        this.shortcuts.forEach(({ sequence, trigger }) => {
            if (this.matches(sequence)) {
                if (this.options.prevent === true)
                    event.preventDefault();
                if (this.options.focused && !this.focused) {
                    this.signal.dispatch('unfocused', event);
                    return;
                }
                this.signal.dispatch('trigger', event);
                trigger(event);
                this.buffer = [];
                this.actives.clear();
            }
        });
        clearTimeout(this.timer);
        this.timer = window.setTimeout(() => {
            this.buffer = [];
        }, this.options.timeout || this.timeout);
    }
    up(event) {
        this.actives.delete(this.key(event));
    }
    key(event) {
        const accumulate = [];
        if (event.metaKey)
            accumulate.push("meta");
        if (event.ctrlKey)
            accumulate.push("control");
        if (event.shiftKey)
            accumulate.push("shift");
        if (event.altKey)
            accumulate.push("alt");
        accumulate.push(event.key.toLowerCase());
        return accumulate.join("+");
    }
    matches(sequence) {
        return (JSON.stringify(sequence) === JSON.stringify([...this.actives].slice(1)) ||
            JSON.stringify(sequence) === JSON.stringify(this.buffer.slice(1)));
    }
    enable() {
        this.enabled = true;
        this.signal.dispatch('enable', undefined);
        return this;
    }
    disable() {
        this.enabled = false;
        this.signal.dispatch('disable', undefined);
        return this;
    }
    resolveScope(target, scope) {
        switch (scope) {
            case ShortcutScope.Self:
                return target;
            case ShortcutScope.Active:
                return document.activeElement instanceof HTMLElement ? document.activeElement : undefined;
            default:
                return document.documentElement;
        }
    }
    mount(sequence, trigger) {
        this._shortcuts.push({ sequence: sequence.map(k => k.toLowerCase()), trigger });
        this.signal.dispatch('mount', { sequence, trigger });
        return this;
    }
    unmount(keys) {
        this._shortcuts = this._shortcuts.filter(shortcut => JSON.stringify(shortcut.sequence) !== JSON.stringify(keys.map(k => k.toLowerCase())));
        this.signal.dispatch('unmount', keys);
        return this;
    }
    clear() {
        this._shortcuts = [];
        return this;
    }
    destroy() {
        this.targets.forEach(target => {
            target.removeEventListener("keydown", this.down.bind(this));
            target.removeEventListener("keyup", this.up.bind(this));
        });
        this._shortcuts = [];
        this.actives.clear();
        this.buffer = undefined;
        this.signal = undefined;
        this.targets = undefined;
        this.enabled = undefined;
        this.timeout = undefined;
    }
}
export function createShortcut(keys, features, target) {
    const sequence = Array.isArray(keys) ? keys : [keys];
    const trigger = typeof features === 'function' ? features : features.trigger || (() => void (0));
    const options = typeof features === 'object' ? features : { trigger: (() => void (0)) };
    return (new Shortcut(target, options)).mount(sequence, trigger);
}
