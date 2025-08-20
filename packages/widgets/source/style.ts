import type {
    IStyleOptions,
    IStyleSettings,
    IStyleSheet,
    IStyleSheetDeclarations,
    IStyleAliasDictionary,
    IWidgetNode,
    IStyleSheetPseudoClasses,
    IStyleSheetPseudoElements,
    IStyleSheetAtRules, IStyleSheetStrictCascade, IInlineStyleOptions,
    IInlineStyle,
    IStyleStrictDeclaration,
} from "./types/index.js";
import {RelativeUnit} from "./enums.js";
import {RemMetric} from "./metric.js";
import {Environment, IDictionary, Dictionary, MetricRandom, TextUtility} from "@protorians/core";


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
    protected _definitions: string[] = [];

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

    /**
     * A Map object used to associate a specific object with its corresponding IStyleSheet instance.
     * This allows for linking objects to their respective stylesheets, enabling customized or dynamic styling.
     *
     * Key: An object, typically representing a component or entity requiring a stylesheet.
     * Value: An instance of IStyleSheet associated with the given object.
     */
    protected _associates: Map<object, IStyleSheet> = new Map<object, IStyleSheet>();

    /**
     * A variable representing a CSS selector string used to associate
     * a specific element within the DOM. This selector may be employed
     * for querying or binding purposes in the context of DOM manipulation.
     *
     * If undefined, there is no specified association.
     *
     * Type: string | undefined
     */
    protected _associateSelector: string | undefined;

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
    get definitions(): string {
        return this._definitions.join("\n");
    }

    /**
     * Getter method for retrieving the selector property.
     * @return {string} The value of the selector.
     */
    get selector(): string {
        return this._selector;
    }

    /**
     * Retrieves the value of the associate selector.
     *
     * @return {string | undefined} The current value of the associate selector, or undefined if not set.
     */
    get associateSelector(): string | undefined {
        return this._associateSelector
    }

    /**
     * Clears all the defined rules and declarations in the current object.
     *
     * @return {this} The current instance of the object for method chaining.
     */
    clear(): this {
        this._definitions = [];
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
                    accumulate.push(`${TextUtility.unCamelCase(alias.toString())}:${value}`)
                )
        } else {
            accumulate.push(`${key.startsWith('--') ? key : TextUtility.unCamelCase(key)}:${value}`);
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
            if (selector?.startsWith('@')) {
                const accumulate = Object.entries(declaration.declarations)
                    .map(([key, value]) => {
                        if (value instanceof StyleWidget) {
                            const values = Object.entries(value.declarations)
                                .map(([k, v]) => `${this.parseProperty(k, v as any)}`)
                            return `${key.replace(/&/gi, this._selector)}{${values.join(';')}}`;
                        }
                        return `${key.replace(/&/gi, this._selector)}{${this.parse(value as IStyleSheetDeclarations)}}`;
                    });
                this._definitions.push(`${selector}{${accumulate.join(' ')}}`)
                // return accumulate.join(' ');
            } else return this.parse(declaration.declarations, selector);
        } else if (typeof declaration == 'object') {

            const cumulate = Object.entries(declaration)
                .map(([key, tree]) =>
                    this.parse(tree as IStyleSheetDeclarations, key))

            selector = typeof selector != 'undefined'
                ? `${selector.replace(/&/gi, this._selector)}`
                : this._selector;

            this._definitions.push(`${selector}{${cumulate.join(';')}}`)

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

        this._definitions = [];

        const merged = this.merge(declarations || {}).declarations;
        this.parse(merged as IStyleSheetDeclarations, undefined)

        if (this.repository && (this.options.attach === true || typeof this.options.attach === 'undefined')) {
            this.repository.innerHTML = this._definitions.join("\n");
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
     * Adds hover state styles to the current declaration block.
     *
     * @param {IStyleSheetDeclarations} declarations - The style declarations to apply specifically to the hover state.
     * @return {this} The instance of the class to allow method chaining.
     */
    hover(declarations: IStyleSheetDeclarations): this {
        this.merge({'&:hover': Style(declarations)});
        return this;
    }

    /**
     * Adds focus-specific styles to the stylesheet.
     * The provided declarations will be applied when the element is in a focused state.
     *
     * @param {IStyleSheetDeclarations} declarations - The style declarations to apply for the focus state.
     * @return {this} The current instance with the updated focus styles.
     */
    focus(declarations: IStyleSheetDeclarations): this {
        this.merge({
            '&:focus-with': Style(declarations),
            '&:focus': Style(declarations),
        });
        return this;
    }

    /**
     * Applies a blur effect by adding styles to handle focus-out events.
     *
     * @param {IStyleSheetDeclarations} declarations - The style declarations to be applied when the element loses focus.
     * @return {this} The current instance with the applied blur styles.
     */
    blur(declarations: IStyleSheetDeclarations): this {
        this.merge({'&:focusout': Style(declarations)});
        return this;
    }

    /**
     * Applies autofill-specific CSS declarations to the current style configuration.
     *
     * @param {IStyleSheetDeclarations} declarations - An object containing CSS declarations to be applied for autofill pseudo-classes.
     * @return {this} The instance of the class, allowing for method chaining.
     */
    autofill(declarations: IStyleSheetDeclarations): this {
        this.merge({'&:is(:-webkit-autofill, :autofill)': Style(declarations)});
        return this;
    }

    /**
     * Adds pseudo-class based style declarations to the style sheet.
     *
     * @param {IStyleSheetPseudoClasses | IStyleSheetPseudoClasses[]} state - The pseudo-class or an array of pseudo-classes to apply the declarations to.
     * @param {IStyleSheetDeclarations} declarations - The style declarations to be applied to the specified pseudo-classes.
     * @return {this} The current instance of the style sheet with the applied declarations.
     */
    when(state: IStyleSheetPseudoClasses | IStyleSheetPseudoClasses[], declarations: IStyleSheetDeclarations): this {
        const accumulate: IStyleSheetDeclarations = {};
        (Array.isArray(state) ? state : [state]).forEach(s => accumulate[`&:${s}`] = Style(declarations));
        this.merge(accumulate);
        return this;
    }

    /**
     * Adds an `::after` pseudo-element with the specified style declarations to the current style.
     *
     * @param {IStyleSheetDeclarations} declarations - The style declarations to be applied to the `::after` pseudo-element.
     * @return {this} The current instance with the updated styles.
     */
    after(declarations: IStyleSheetDeclarations): this {
        this.merge({'&::after': Style(declarations)});
        return this;
    }

    /**
     * Adds styles to the `::before` pseudo-element of the current element.
     *
     * @param {IStyleSheetDeclarations} declarations - An object containing the CSS declarations to apply to the `::before` pseudo-element.
     * @return {this} Returns the current instance for chaining purposes.
     */
    before(declarations: IStyleSheetDeclarations): this {
        this.merge({'&::before': Style(declarations)});
        return this;
    }

    /**
     * Adds pseudo-elements styles to the stylesheet by applying the given declarations.
     *
     * @param {IStyleSheetPseudoElements | IStyleSheetPseudoElements[]} state - The pseudo-element(s) to apply styles to. Can be a single pseudo-element or an array of pseudo-elements.
     * @param {IStyleSheetDeclarations} declarations - The style declarations to apply to the specified pseudo-element(s).
     * @return {this} The updated stylesheet instance with the added pseudo-element styles.
     */
    isole(state: IStyleSheetPseudoElements | IStyleSheetPseudoElements[], declarations: IStyleSheetDeclarations): this {
        const accumulate: IStyleSheetDeclarations = {};
        (Array.isArray(state) ? state : [state]).forEach(s => accumulate[`&::${s}`] = Style(declarations));
        this.merge(accumulate);
        return this;
    }


    /**
     * Defines a set of keyframes for animations by merging the provided style declarations.
     *
     * @param {string} name - The name of the keyframes animation.
     * @param {IStyleSheetStrictCascade} declarations - The style declarations to include within the keyframes.
     * @return {this} The current instance for method chaining.
     */
    keyframes(name: string, declarations: IStyleSheetStrictCascade): this {
        this.merge({[`@keyframes ${name}`]: Style(declarations)});
        return this;
    }

    /**
     * Adds a CSS `@supports` rule to the current style object with the provided directive and declarations.
     *
     * @param {string} directive - A CSS condition written as a string that is tested within the `@supports` rule.
     * @param {IStyleSheetStrictCascade} declarations - An object containing CSS declarations that are applied if the condition in the directive is met.
     * @return {this} The current style object, allowing for method chaining.
     */
    supports(directive: string, declarations: IStyleSheetStrictCascade): this {
        this.merge({[`@supports ${directive}`]: Style(declarations)});
        return this;
    }

    /**
     * Defines a scoped CSS directive and merges the provided declarations
     * under the specified directive scope.
     *
     * @param {string} directive - The name of the scope directive.
     * @param {IStyleSheetStrictCascade} declarations - The style declarations to be applied under the scope.
     * @return {this} The instance of the object for chaining further method calls.
     */
    scope(directive: string, declarations: IStyleSheetStrictCascade): this {
        this.merge({[`@scope ${directive}`]: Style(declarations)});
        return this;
    }

    /**
     * Defines a CSS custom property with the provided directive and declarations.
     *
     * @param {string} directive - The name of the custom property to be defined.
     * @param {IStyleSheetStrictCascade} declarations - The styles or rules to be applied within the custom property definition.
     * @return {this} The current instance to allow method chaining.
     */
    property(directive: string, declarations: IStyleSheetStrictCascade): this {
        this.merge({[`@property ${directive}`]: Style(declarations)});
        return this;
    }

    /**
     * Applies a view transition style directive to the stylesheet by merging it with the provided declarations.
     *
     * @param {string} directive - The specific view transition directive to apply.
     * @param {IStyleSheetStrictCascade} declarations - The style declarations to be associated with the given directive.
     * @return {this} The current instance with the applied view transition styles.
     */
    viewTransition(directive: string, declarations: IStyleSheetStrictCascade): this {
        this.merge({[`@view-transition ${directive}`]: Style(declarations)});
        return this;
    }

    /**
     * Adds a container rule to the style sheet with the specified directive and declarations.
     *
     * @param {string} directive - The container query directive defining the conditions for the container.
     * @param {IStyleSheetStrictCascade} declarations - The style declarations to be applied under the specified container directive.
     * @return {this} The current instance to allow for method chaining.
     */
    container(directive: string, declarations: IStyleSheetStrictCascade): this {
        this.merge({[`@container ${directive}`]: Style(declarations)});
        return this;
    }

    /**
     * Adds a media query to the stylesheet with the specified directive and style declarations.
     *
     * @param {string} directive - The media query directive (e.g., "max-width: 600px").
     * @param {IStyleSheetStrictCascade} declarations - The style declarations to apply within the media query.
     * @return {this} The current instance to allow method chaining.
     */
    media(directive: string, declarations: IStyleSheetStrictCascade): this {
        this.merge({[`@media ${directive}`]: Style(declarations)});
        return this;
    }

    /**
     * Creates a new rule in the stylesheet by merging the provided at-rule, directive,
     * and style declarations into the current stylesheet instance.
     *
     * @param {IStyleSheetAtRules} rule - The at-rule to be applied, such as `media` or `keyframes`.
     * @param {string} directive - Specific directive or condition for the at-rule, like a media query string.
     * @param {IStyleSheetStrictCascade} declarations - Object containing style properties and values for the rule.
     * @return {this} Returns the current stylesheet instance for method chaining.
     */
    rule(rule: IStyleSheetAtRules, directive: string, declarations: IStyleSheetStrictCascade): this {
        this.merge({[`@${rule} ${directive}`]: Style(declarations)});
        return this;
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
            this._associateSelector = this._associateSelector || `${MetricRandom.CreateAlpha(7).join('')}-${MetricRandom.Create(10).join('')}`;
            const fingerprint = `${this._selector}.${this._associateSelector}`
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
        if (exists && this._associateSelector) {
            this._associates.delete(declarations);
            this._related?.removeClassName(this._associateSelector);
        }
        return this;
    }
}


export class InlineStyleWidget implements IInlineStyle {

    protected _attached: Map<string, IWidgetNode<any, any>> = new Map()
    protected _declarations: IStyleStrictDeclaration = {} as IStyleStrictDeclaration;

    constructor(
        public readonly options: IInlineStyleOptions = {} as IInlineStyleOptions
    ) {
    }

    protected compute(): string[] {
        const accumulate: string[] = [];

        for (const [key, value] of Object.entries(this._declarations)) {
            if (typeof value !== 'function') {
                accumulate.push(`${key}:${String(value)}`);
            }
        }

        return accumulate;
    }

    protected assign<K extends keyof IStyleStrictDeclaration>(widget: IWidgetNode<any, any>, key: K, value: IStyleStrictDeclaration[K]): this {
        if (widget?.clientElement)
            widget.clientElement.style[key] = value;
        return this;
    }

    sync(widget?: IWidgetNode<any, any>): this {
        const fingerprint = widget?.fingerprint;
        for (const w of (fingerprint ? [this._attached.get(fingerprint)] : [...this._attached.values()]))
            if (w)
                for (const [key, value] of Object.entries(this._declarations))
                    this.assign(w, key as keyof IStyleStrictDeclaration, value)
        return this;
    }

    attach(widget: IWidgetNode<any, any>): this {
        if (widget.clientElement) {
            this._attached.set(widget.fingerprint, widget);
            this.sync(widget);
        }
        return this;
    }

    detach(): this {
        this._attached.clear()
        return this;
    }

    remove<K extends keyof IStyleStrictDeclaration>(key: K | K[]): this {
        throw new Error(`Method not implemented. ${key}`);
    }

    update<K extends keyof IStyleStrictDeclaration>(key: K, value: IStyleStrictDeclaration[K]): this {
        throw new Error(`Method not implemented. ${key}=${value}`);
    }

    merge(declaration?: IStyleStrictDeclaration): this {
        this._declarations = {...this._declarations, ...declaration};
        return this;
    }

    clear(): this {
        throw new Error("Method not implemented.");
    }

    toString(): string {
        return this.compute().join(';');
    }

}

/**
 * Creates a new StyleWidget instance, attaches it by default, and merges the provided declarations.
 *
 * @param {IStyleSheetDeclarations} declaration - A set of style declarations to be merged into the StyleWidget.
 */
export function Style(declaration: IStyleSheetDeclarations): IStyleSheet {
    return new StyleWidget({
        attach: true,
    }).merge(declaration)
}