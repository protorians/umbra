import { RelativeUnit } from "./enums.js";
import { RemMetric } from "./metric.js";
import { Environment, Dictionary, MetricRandom, TextUtility } from "@protorians/core";
export class StyleWidget {
    options;
    static settings = {
        bytes: 4,
        unit: RelativeUnit.Rem,
        spacing: 4,
        corner: 0,
    };
    static alias = new Dictionary();
    _repository = undefined;
    _related;
    _definitions = [];
    _selector = '.globals';
    locked = false;
    _associates = new Map();
    _associateSelector;
    declarations = {};
    static unit(value) {
        if (typeof value == 'number') {
            return RemMetric.parse(`${parseFloat(value.toString())}${this.settings.unit}`);
        }
        else
            return (value.toString());
    }
    constructor(options = {}) {
        this.options = options;
        this.locked = options.lock || false;
        this._selector = options.fingerprint || '.globals';
    }
    get status() {
        return this.locked;
    }
    set status(value) {
        this.locked = value;
        this.sync();
    }
    get repository() {
        if (Environment.Client) {
            this._repository = this._repository || document.createElement('style');
            this._repository.setAttribute('widget:stylesheet', this._selector || 'common');
            document.head.append(this._repository);
            return this._repository;
        }
        return undefined;
    }
    get definitions() {
        return this._definitions.join("\n");
    }
    get selector() {
        return this._selector;
    }
    get associateSelector() {
        return this._associateSelector;
    }
    clear() {
        this._definitions = [];
        this.declarations = {};
        return this;
    }
    parseProperty(key, value) {
        const accumulate = [];
        const aliases = StyleWidget.alias.get(key);
        value = StyleWidget.unit(value);
        if (aliases) {
            aliases
                .map(alias => accumulate.push(`${TextUtility.unCamelCase(alias.toString())}:${value}`));
        }
        else {
            accumulate.push(`${key.startsWith('--') ? key : TextUtility.unCamelCase(key)}:${value}`);
        }
        return accumulate.join(';');
    }
    parse(declaration, selector) {
        if (!declaration)
            return;
        else if ((declaration instanceof StyleWidget)) {
            if (selector?.startsWith('@')) {
                const accumulate = Object.entries(declaration.declarations)
                    .map(([key, value]) => {
                    if (value instanceof StyleWidget) {
                        const values = Object.entries(value.declarations)
                            .map(([k, v]) => `${this.parseProperty(k, v)}`);
                        return `${key.replace(/&/gi, this._selector)}{${values.join(';')}}`;
                    }
                    return `${key.replace(/&/gi, this._selector)}{${this.parse(value)}}`;
                });
                this._definitions.push(`${selector}{${accumulate.join(' ')}}`);
            }
            else
                return this.parse(declaration.declarations, selector);
        }
        else if (typeof declaration == 'object') {
            const cumulate = Object.entries(declaration)
                .map(([key, tree]) => this.parse(tree, key));
            selector = typeof selector != 'undefined'
                ? `${selector.replace(/&/gi, this._selector)}`
                : this._selector;
            this._definitions.push(`${selector}{${cumulate.join(';')}}`);
        }
        else if (selector) {
            return `${this.parseProperty(selector, declaration)}`;
        }
        return undefined;
    }
    merge(declarations) {
        this.declarations = {
            ...this.declarations,
            ...((declarations instanceof StyleWidget)
                ? declarations.declarations
                : declarations || {})
        };
        return this;
    }
    sync(declarations) {
        if (this.locked)
            return this;
        this._definitions = [];
        const merged = this.merge(declarations || {}).declarations;
        this.parse(merged, undefined);
        if (this.repository && (this.options.attach === true || typeof this.options.attach === 'undefined')) {
            this.repository.innerHTML = this._definitions.join("\n");
        }
        return this;
    }
    bind(widget) {
        this._selector = `.${widget.fingerprint}`;
        this.locked = true;
        widget.className(widget.fingerprint);
        widget.signal.listen('mount', () => {
            this.locked = false;
            this.sync();
        });
        this._related = widget;
        return this.merge(widget.props.style).sync();
    }
    remove(key) {
        (!Array.isArray(key) ? `${key}`.split(' ') : key)
            .forEach(k => this.declarations[k] = undefined);
        return this.sync();
    }
    update(key, value) {
        this.declarations[key] = value;
        return this.sync();
    }
    hover(declarations) {
        this.merge({ '&:hover': Style(declarations) });
        return this;
    }
    focus(declarations) {
        this.merge({
            '&:focus-with': Style(declarations),
            '&:focus': Style(declarations),
        });
        return this;
    }
    blur(declarations) {
        this.merge({ '&:focusout': Style(declarations) });
        return this;
    }
    autofill(declarations) {
        this.merge({ '&:is(:-webkit-autofill, :autofill)': Style(declarations) });
        return this;
    }
    when(state, declarations) {
        const accumulate = {};
        (Array.isArray(state) ? state : [state]).forEach(s => accumulate[`&:${s}`] = Style(declarations));
        this.merge(accumulate);
        return this;
    }
    after(declarations) {
        this.merge({ '&::after': Style(declarations) });
        return this;
    }
    before(declarations) {
        this.merge({ '&::before': Style(declarations) });
        return this;
    }
    isole(state, declarations) {
        const accumulate = {};
        (Array.isArray(state) ? state : [state]).forEach(s => accumulate[`&::${s}`] = Style(declarations));
        this.merge(accumulate);
        return this;
    }
    keyframes(name, declarations) {
        this.merge({ [`@keyframes ${name}`]: Style(declarations) });
        return this;
    }
    supports(directive, declarations) {
        this.merge({ [`@supports ${directive}`]: Style(declarations) });
        return this;
    }
    scope(directive, declarations) {
        this.merge({ [`@scope ${directive}`]: Style(declarations) });
        return this;
    }
    property(directive, declarations) {
        this.merge({ [`@property ${directive}`]: Style(declarations) });
        return this;
    }
    viewTransition(directive, declarations) {
        this.merge({ [`@view-transition ${directive}`]: Style(declarations) });
        return this;
    }
    container(directive, declarations) {
        this.merge({ [`@container ${directive}`]: Style(declarations) });
        return this;
    }
    media(directive, declarations) {
        this.merge({ [`@media ${directive}`]: Style(declarations) });
        return this;
    }
    rule(rule, directive, declarations) {
        this.merge({ [`@${rule} ${directive}`]: Style(declarations) });
        return this;
    }
    associate(declarations) {
        if (!(this._associates.get(declarations))) {
            this._associateSelector = this._associateSelector || `${MetricRandom.CreateAlpha(7).join('')}-${MetricRandom.Create(10).join('')}`;
            const fingerprint = `${this._selector}.${this._associateSelector}`;
            const style = new StyleWidget({ attach: true, lock: false, fingerprint });
            style.merge(declarations).sync();
            this._associates.set(declarations, style);
            this._related?.className(fingerprint.split('.').join(' '));
        }
        return this;
    }
    associated(declarations) {
        return this._associates.get(declarations);
    }
    unassociate(declarations) {
        const exists = this._associates.get(declarations);
        if (exists && this._associateSelector) {
            this._associates.delete(declarations);
            this._related?.removeClassName(this._associateSelector);
        }
        return this;
    }
}
export class InlineStyleWidget {
    options;
    _attached = new Map();
    _declarations = {};
    constructor(options = {}) {
        this.options = options;
    }
    compute() {
        const accumulate = [];
        for (const [key, value] of Object.entries(this._declarations)) {
            if (typeof value !== 'function') {
                accumulate.push(`${key}:${String(value)}`);
            }
        }
        return accumulate;
    }
    assign(widget, key, value) {
        if (widget?.clientElement)
            widget.clientElement.style[key] = value;
        return this;
    }
    sync(widget) {
        const fingerprint = widget?.fingerprint;
        for (const w of (fingerprint ? [this._attached.get(fingerprint)] : [...this._attached.values()]))
            if (w)
                for (const [key, value] of Object.entries(this._declarations))
                    this.assign(w, key, value);
        return this;
    }
    attach(widget) {
        if (widget.clientElement) {
            this._attached.set(widget.fingerprint, widget);
            this.sync(widget);
        }
        return this;
    }
    detach() {
        this._attached.clear();
        return this;
    }
    remove(key) {
        throw new Error(`Method not implemented. ${key}`);
    }
    update(key, value) {
        throw new Error(`Method not implemented. ${key}=${value}`);
    }
    merge(declaration) {
        this._declarations = { ...this._declarations, ...declaration };
        return this;
    }
    clear() {
        throw new Error("Method not implemented.");
    }
    toString() {
        return this.compute().join(';');
    }
}
export function Style(declaration) {
    return new StyleWidget({
        attach: true,
    }).merge(declaration);
}
