import {IShortcutSequence, IShortcutTrigger, IShortcutSignalMap, IShortcut, IShortcutOptions} from "./types.js";
import {$ui, Environment, ISignalStack, IUiTarget, Signal} from "@protorians/core";
import {ShortcutScope} from "./enum.js";

/**
 * @description Créer un raccourci clavier avec la possibilité de faire des séquences sur un ou des éléments HTML
 */
export class Shortcut<T extends HTMLElement> implements IShortcut<T> {
    protected _shortcuts: IShortcutSequence[] = [];
    protected actives: Set<string> = new Set();
    protected buffer: string[] = [];
    protected timeout: number = 1000;
    protected timer?: number;
    protected enabled: boolean = true;

    /**
     * La liste des éléments HTML cible
     */
    readonly targets: T[];

    /**
     * Gestion des signaux
     */
    signal: ISignalStack<IShortcutSignalMap>

    /**
     * La liste des raccourcis
     */
    get shortcuts(): IShortcutSequence[] {
        return this._shortcuts;
    }

    /**
     * Détect si les cibles ont le focus
     */
    get focused(): boolean {
        return this.targets.some(target => target.contains(document.activeElement) || target === document.activeElement)
    }

    /**
     * @constructor
     * @example new Shortcut<HTMLElement>(target, options)
     * @param target
     * @param options
     */
    constructor(
        target?: IUiTarget<T>,
        readonly options: IShortcutOptions = {} as IShortcutOptions
    ) {
        this.targets = $ui<T>(target || document.documentElement as T);
        this.signal = new Signal.Stack<IShortcutSignalMap>();
        this.targets.forEach(target => {
            const scope = this.resolveScope(target, this.options.scope);
            if (scope) {
                scope.addEventListener("keydown", this.down.bind(this))
                scope.addEventListener("keyup", this.up.bind(this))
            }
        })
    }

    /**
     *
     * @param keys
     * @constructor
     */
    static Ctrl(keys: string): string {
        return `Control+${keys}`
    }

    /**
     *
     * @param keys
     * @constructor
     */
    static Shift(keys: string): string {
        return `Shift+${keys}`
    }

    /**
     *
     * @param keys
     * @constructor
     */
    static Meta(keys: string): string {
        return `Meta+${keys}`
    }

    /**
     *
     * @param keys
     * @constructor
     */
    static Alt(keys: string): string {
        return `Alt+${keys}`
    }

    /**
     *
     * @param keys
     * @constructor
     */
    static Command(keys: string): string {
        return `${(Environment.MacOs || Environment.iOS) ? 'Meta' : 'Control'}+${keys}`
    }

    /**
     *
     * @param keys
     * @constructor
     */
    static Option(keys: string): string {
        return `Alt+${keys}`
    }

    protected down(event: KeyboardEvent) {
        if (!this.enabled) return;

        const key = this.key(event);
        this.actives.add(key);
        this.buffer.push(key);

        this.shortcuts.forEach(({sequence, trigger}) => {
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


    protected up(event: KeyboardEvent) {
        this.actives.delete(this.key(event));
    }

    protected key(event: KeyboardEvent): string {
        const accumulate: string[] = [];

        if (event.metaKey) accumulate.push("meta");
        if (event.ctrlKey) accumulate.push("control");
        if (event.shiftKey) accumulate.push("shift");
        if (event.altKey) accumulate.push("alt");

        accumulate.push(event.key.toLowerCase());
        return accumulate.join("+");
    }

    protected matches(sequence: string[]): boolean {
        return (
            JSON.stringify(sequence) === JSON.stringify([...this.actives].slice(1)) ||
            JSON.stringify(sequence) === JSON.stringify(this.buffer.slice(1))
        );
    }

    /**
     * Activation de la détection
     */
    public enable(): this {
        this.enabled = true;
        this.signal.dispatch('enable', undefined);
        return this;
    }

    /**
     * Désactivation de la détection
     */
    public disable(): this {
        this.enabled = false;
        this.signal.dispatch('disable', undefined);
        return this;
    }

    /**
     * Résoudre la portée
     * @param target
     * @param scope
     */
    resolveScope(target: T, scope: ShortcutScope | undefined): T | HTMLElement | undefined {
        switch (scope) {
            case ShortcutScope.Self:
                return target;
            case ShortcutScope.Active:
                return document.activeElement instanceof HTMLElement ? document.activeElement : undefined;
            default:
                return document.documentElement;
        }
    }

    /**
     * Monter un raccourci
     * @param sequence
     * @param trigger
     */
    public mount(sequence: string[], trigger: IShortcutTrigger): this {
        this._shortcuts.push({sequence: sequence.map(k => k.toLowerCase()), trigger});
        this.signal.dispatch('mount', {sequence, trigger});
        return this;
    }

    /**
     * Démonter un raccourci
     * @param keys
     */
    public unmount(keys: string[]): this {
        this._shortcuts = this._shortcuts.filter(
            shortcut =>
                JSON.stringify(shortcut.sequence) !== JSON.stringify(keys.map(k => k.toLowerCase()))
        );
        this.signal.dispatch('unmount', keys);
        return this;
    }

    /**
     * Nettoyer les raccourcis
     */
    public clear(): this {
        this._shortcuts = [];
        return this;
    }

    /**
     * Destroy method to clean up the instance
     */
    destroy(): void {
        // Remove event listeners
        this.targets.forEach(target => {
            target.removeEventListener("keydown", this.down.bind(this));
            target.removeEventListener("keyup", this.up.bind(this));
        });

        // Clear all references
        this._shortcuts = [];
        this.actives.clear();
        this.buffer = undefined as any;
        this.signal = undefined as any;
        (this as any).targets = undefined;
        (this as any).enabled = undefined;
        (this as any).timeout = undefined;
    }
}

export function createShortcut<T extends HTMLElement>(
    keys: string[] | string,
    features: IShortcutTrigger | IShortcutOptions,
    target?: IUiTarget<T>,
): IShortcut<T> {
    const sequence: string[] = Array.isArray(keys) ? keys : [keys];
    const trigger = typeof features === 'function' ? features : features.trigger || (() => void (0));
    const options = typeof features === 'object' ? features : {trigger: (() => void (0))};
    return (new Shortcut<T>(target, options)).mount(sequence, trigger)
}
