import type {
    IStyleOptions,
    IStyleSettings,
    IStyleSheet,
    IStyleSheetDeclarations, IStyleAliasDictionary, IWidgetNode,
} from "./types/index.js";
import {RelativeUnit} from "./enums.js";
import {RemMetric} from "./metric.js";
import {Environment, unCamelCase, IDictionary, Dictionary, MetricRandom} from "@protorians/core";


/**
 * The `StyleWidget` class provides a modular approach to manage and manipulate
 * CSS styles dynamically for web components. It implements the `IStyleSheet`
 * interface to ensure uniformity across style management processes such as
 * declaration parsing, rule synchronization, and widget binding.
 */
export class StyleWidget implements IStyleSheet {

    /**
     * Represents the style settings configuration.
     *
     * @property {number} bytes The base unit size (in bytes) used for styling calculations.
     * @property {RelativeUnit} unit The relative unit type used for scaling (e.g., Rem, Em, etc.).
     * @property {number} spacing The default spacing value used in the style settings.
     * @property {number} corner The rounding value for corners, defining the radius of border edges.
     */
    static settings: IStyleSettings = {
        bytes: 4,
        unit: RelativeUnit.Rem,
        spacing: 4,
        corner: 0,
    };

    /**
     * A dictionary instance that maps style aliases to their corresponding style alias dictionary.
     *
     * @description This variable serves as a central storage for mapping style alias keys
     *              to detailed style alias dictionaries, facilitating quick lookups
     *              and associations in styling configurations.
     */
    static alias: IDictionary<IStyleAliasDictionary> = new Dictionary<IStyleAliasDictionary>();

    /**
     * A variable that holds a reference to an HTMLStyleElement or is undefined.
     * It is typically used to manage a dynamically created style element within the application.
     * If undefined, it indicates that the style element has not been initialized or assigned yet.
     */
    protected _repository: HTMLStyleElement | undefined = undefined;

    protected _related: IWidgetNode<any, any> | undefined;

    /**
     * Represents a collection of rules stored as an array of strings.
     *
     * This variable is used to hold a list of rules or constraints that can
     * be processed or referenced within the application logic.
     *
     * It is initialized as an empty array by default and can be updated
     * dynamically to include specific rule definitions as needed.
     */
    protected _rules: string[] = [];

    /**
     * Represents a CSS selector string.
     *
     * This variable is used to target specific elements or groups of elements
     * within a DOM structure for styling or manipulation purposes.
     *
     * Default Value: '.globals' (selects the root element of the document, typically the <html> element in an HTML document).
     */
    protected _selector: string = '.globals';

    /**
     * Indicates whether the current state or entity is locked.
     *
     * When set to true, it typically represents that certain operations
     * or changes are restricted. If false, it allows modifications or interactions.
     *
     * Default Value: false.
     */
    protected locked: boolean = false;

    protected _associates: Map<object, IStyleSheet> = new Map<object, IStyleSheet>();

    /**
     * Represents a declaration of style sheets.
     * This object holds style sheet rules and their associated properties.
     * It is used for defining and manipulating CSS styles programmatically.
     */
    public declarations: IStyleSheetDeclarations = {} as IStyleSheetDeclarations;

    /**
     * Converts the given numeric or string value into a formatted string with a metric unit if the value is numeric.
     *
     * @param {string | number} value - The value to be formatted. If a number is provided, it appends the default unit from settings. If a string is provided, it returns the string unprocessed.
     * @return {string} The resulting formatted string with or without a unit appended.
     */
    static unit(value: string | number): string {
        // const check = (/^-?\d+(\.\d+)?$/).test(value.toString());

        if (typeof value == 'number') {
            return RemMetric.parse(`${parseFloat(value.toString())}${this.settings.unit}`);
        } else return (value.toString())
    }

    /**
     * Constructs an instance of the class with the provided style options.
     *
     * @param {IStyleOptions} [options] - The style options object to configure the instance.
     *                                     Defaults to an empty object if not specified.
     */
    constructor(public readonly options: IStyleOptions = {} as IStyleOptions) {
        this.locked = options.lock || false;
        this._selector = options.fingerprint || '.globals';
    }

    /**
     * Retrieves the current status of the locked state.
     *
     * @return {boolean} True if the state is locked, otherwise false.
     */
    get status(): boolean {
        return this.locked;
    }

    /**
     * Sets the status to a specified value and updates the locked state.
     * Also triggers synchronization to reflect the status change.
     *
     * @param {boolean} value - The new status to be assigned. A boolean value indicating the desired state.
     */
    set status(value: boolean) {
        this.locked = value;
        this.sync()
    }

    /**
     * Retrieves or creates and returns an HTMLStyleElement associated with the repository.
     * If the environment is client-side, it initializes the repository as a 'style' element if it doesn't already exist,
     * sets its attributes, appends it to the document head, and then returns it.
     * If the environment is not client-side, it returns undefined.
     *
     * @return {HTMLStyleElement | undefined} The HTMLStyleElement representing the repository
     * in a client-side environment, or undefined in a non-client environment.
     */
    get repository(): HTMLStyleElement | undefined {
        if (Environment.Client) {
            this._repository = this._repository || document.createElement('style');
            this._repository.setAttribute('widget:stylesheet', this._selector || 'common');
            document.head.append(this._repository);
            return this._repository;
        }
        return undefined;
    }

    /**
     * Retrieves the rules as a single string, where each rule is joined by a newline character.
     *
     * @return {string} A string representation of all rules separated by newline characters.
     */
    get rules(): string {
        return this._rules.join("\n");
    }

    /**
     * Getter method for retrieving the selector property.
     * @return {string} The value of the selector.
     */
    get selector(): string {
        return this._selector;
    }

    /**
     * Clears all the defined rules and declarations in the current object.
     *
     * @return {this} The current instance of the object for method chaining.
     */
    clear(): this {
        this._rules = [];
        this.declarations = {};
        return this;
    }

    /**
     * Parses a property name and value into a string of CSS declarations,
     * resolving any aliases and applying necessary formatting or units.
     *
     * @param {string} key - The CSS property name or alias to parse.
     * @param {string | number} value - The value of the property, which may include a number or string.
     * @return {string} A string containing the formatted CSS declarations.
     */
    parseProperty(key: string, value: string | number): string {
        const accumulate: string[] = [];
        const aliases = StyleWidget.alias.get(key);
        value = StyleWidget.unit(value);

        if (aliases) {
            aliases
                .map(alias =>
                    accumulate.push(`${unCamelCase(alias.toString())}:${value}`)
                )
        } else {
            accumulate.push(`${key.startsWith('--') ? key : unCamelCase(key)}:${value}`);
        }

        return accumulate.join(';');
    }

    /**
     * Parses a given style declaration object or stylesheet into a string representation of CSS rules.
     *
     * @param {IStyleSheetDeclarations | IStyleSheet | undefined} declaration - The style declaration object or stylesheet to be parsed. It supports nested declarations or undefined values.
     * @param {string} [selector] - An optional CSS selector to be associated with the rules being parsed.
     * @return {string | undefined} A string representation of the parsed CSS rules, or undefined if the input is invalid or not provided.
     */
    parse(declaration: IStyleSheetDeclarations | IStyleSheet | undefined, selector?: string): string | undefined {

        if (!declaration) return;

        else if ((declaration instanceof StyleWidget)) {
            this.parse(declaration.declarations, selector);
        } else if (typeof declaration == 'object') {

            const cumulate = Object.entries(declaration)
                .map(([key, tree]) =>
                    this.parse(tree as IStyleSheetDeclarations, key))

            selector = typeof selector != 'undefined'
                ? `${selector.replace(/&/gi, this._selector)}`
                : this._selector;

            this._rules.push(`${selector}{${cumulate.join(';')}}`)

        } else if (selector) {
            return `${this.parseProperty(selector, declaration)}`
        }


        return undefined
    }

    /**
     * Merges the given declarations into the current instance's declarations.
     *
     * @param {IStyleSheetDeclarations | IStyleSheet | undefined} declarations - The declarations to merge.
     * If the input is an instance of StyleWidget, its declarations are merged. If it is undefined or not provided, an empty object is merged.
     * @return {this} Returns the current instance for method chaining.
     */
    merge(declarations: IStyleSheetDeclarations | IStyleSheet | undefined): this {
        this.declarations = {
            ...this.declarations,
            ...(
                (declarations instanceof StyleWidget)
                    ? declarations.declarations
                    : declarations || {}
            )
        }
        return this;
    }

    /**
     * Synchronizes the stylesheet by merging the given declarations with the existing ones,
     * parsing them into rules, and optionally updating the repository if attached.
     *
     * @param {IStyleSheetDeclarations} [declarations] - Optional style declarations to merge with the existing rules.
     * @return {this} Returns the current instance for chaining.
     */
    sync(declarations?: IStyleSheetDeclarations): this {
        if (this.locked) return this;

        this._rules = [];

        const merged = this.merge(declarations || {}).declarations;
        this.parse(merged as IStyleSheetDeclarations, undefined)

        if (this.repository && (this.options.attach === true || typeof this.options.attach === 'undefined')) {
            this.repository.innerHTML = this._rules.join("\n");
        }
        return this;
    }

    /**
     * Binds the given widget to the current instance, applying its properties and synchronizing its state.
     *
     * @param {IWidgetNode<any, any>} widget - The widget to be bound, providing its properties and state to synchronize.
     * @return {this} Returns the current instance for method chaining after applying the widget's properties and synchronizing state.
     */
    bind(widget: IWidgetNode<any, any>): this {
        this._selector = `.${widget.fingerprint}`;
        this.locked = true;

        widget.className(widget.fingerprint);
        widget.signal.listen('mount', () => {
            this.locked = false;
            this.sync();
        })

        this._related = widget;
        return this.merge(widget.props.style).sync();
    }

    /**
     * Removes one or more style declarations by their key(s) from the current stylesheet declarations.
     *
     * @param {K | K[]} key - The key or an array of keys representing the style declarations to be removed.
     * @return {this} The current instance for method chaining.
     */
    remove<K extends keyof IStyleSheetDeclarations>(key: K | K[]): this {
        (!Array.isArray(key) ? `${key}`.split(' ') : key as (keyof IStyleSheetDeclarations)[])
            .forEach(k => this.declarations[k] = undefined)
        return this.sync();
    }

    /**
     * Updates the value of a specific key in the style sheet declarations and synchronizes the changes.
     *
     * @param {K} key - The key in the style sheet declarations to be updated.
     * @param {IStyleSheetDeclarations[K]} value - The new value to set for the specified key.
     * @return {this} Returns the current instance after applying the update and synchronization.
     */
    update<K extends keyof IStyleSheetDeclarations>(key: K, value: IStyleSheetDeclarations[K]): this {
        this.declarations[key] = value;
        return this.sync();
    }


    /**
     * Associates a given set of stylesheet declarations with this instance.
     * If the declarations are not already associated, a new style widget is created and synchronized.
     * This method also updates the related object's class name when applicable.
     *
     * @param {IStyleSheetDeclarations} declarations The stylesheet declarations to be associated with this instance.
     * @return {this} Returns the instance for method chaining.
     */
    associate(declarations: IStyleSheetDeclarations): this {
        if (!(this._associates.get(declarations))) {
            const fingerprint = `${this._selector}.${MetricRandom.CreateAlpha(7).join('')}-${MetricRandom.Create(10).join('')}`
            const style = new StyleWidget({attach: true, lock: false, fingerprint});

            style.merge(declarations).sync()
            this._associates.set(declarations, style)
            this._related?.className(fingerprint.split('.').join(' '));
        }
        return this;
    }

    /**
     * Retrieves the associated IStyleSheet for the given IStyleSheetDeclarations.
     *
     * @param {IStyleSheetDeclarations} declarations - The style sheet declarations to find the associated style sheet for.
     * @return {IStyleSheet | undefined} The associated IStyleSheet if found, otherwise undefined.
     */
    associated(declarations: IStyleSheetDeclarations): IStyleSheet | undefined {
        return this._associates.get(declarations);
    }

    /**
     * Removes the association between the provided declarations and the current instance.
     *
     * @param {IStyleSheetDeclarations} declarations - The declarations to be unassociated from the current instance.
     * @return {this} The current instance after unassociating the provided declarations.
     */
    unassociate(declarations: IStyleSheetDeclarations): this {
        const exists = this._associates.get(declarations);
        if (exists) {
            this._associates.delete(declarations);
            // this._related?.className(fingerprint.split('.').join(' '));
        }
        console.warn('exists', exists, declarations)
        return this;
    }
}

/**
 * Creates a new StyleWidget instance, attaches it by default, and merges the provided declarations.
 *
 * @param {IStyleSheetDeclarations} declaration - A set of style declarations to be merged into the StyleWidget.
 */
export function Style(declaration: IStyleSheetDeclarations) {
    return new StyleWidget({
        attach: true,
    }).merge(declaration)
}