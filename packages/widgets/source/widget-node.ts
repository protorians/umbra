import type {
    IAttributes,
    ICallable,
    IChildren,
    IChildrenSupported,
    IContext,
    IEngine,
    IGlobalAttributes,
    IGlobalEventMap,
    IGlobalEventPayload,
    IMeasure,
    INativeProperties,
    IPrimitive,
    IPropStack,
    IRef,
    IStateStack,
    IStringToken,
    IStyleDeclaration,
    IStyleSheet,
    IStyleSheetDeclarations,
    IWidgetDeclaration,
    IWidgetElement,
    IWidgetNode, IWidgetSideCallableOptions,
    IWidgetSignalMap,
} from "./types/index.js";
import {
    Environment,
    type ISignalStack,
    IUiTarget,
    MetricRandom,
    Signal,
    TextUtility,
    TreatmentQueueStatus,
} from "@protorians/core";
import {ToggleOption, ObjectElevation, WidgetsNativeProperty, Displaying} from "./enums.js";
import {Widgets} from "./widgets.js";
import {StyleWidget} from "./style.js";
import {ISpectraElement, SpectraElement} from "@protorians/spectra";


/**
 * An array containing all the properties of `WidgetsNativeProperty` object.
 * This variable is populated using the `Object.values` method,
 * which retrieves all values of enumerable string-keyed properties from the `WidgetsNativeProperty` object.
 *
 * Typically used to access the list of native properties associated with widgets in a structured format.
 */
export const WidgetNativeProperties = Object.values(WidgetsNativeProperty)

/**
 * Represents a context-aware widget that maintains its properties, state, and associated engine,
 * allowing dynamic interaction and updates based on its context.
 *
 * @template P - The type of properties stack (IPropStack) used by the widget.
 * @template S - The type of state stack (IStateStack) used by the widget.
 * @implements IContext<P, S>
 */
export class ContextWidget<P extends IPropStack, S extends IStateStack> implements IContext<P, S> {

    /**
     * Represents the root node of a widget hierarchy.
     *
     * This variable is either an instance of `IWidgetNode` with generic type parameters
     * for data and configuration, or it may be undefined if no root node is present.
     *
     * @type {IWidgetNode<any, any> | undefined}
     */
    public root: IWidgetNode<any, any> | undefined;

    /**
     * Represents the properties for a component or functionality.
     * Can include various configuration options to customize behavior or appearance.
     */
    public props: P;

    /**
     * Represents the state of a component or system.
     *
     * This variable signifies the current state or condition to be used
     * for managing and controlling the component's behavior or flow of execution.
     */
    public state: S;

    /**
     * Represents the engine instance, which is either an implementation of the generic interface `IEngine`
     * or undefined. The `IEngine` interface is parameterized with two generic types for flexibility in type usage.
     *
     * The `engine` variable can be used to facilitate operations or functionalities provided by the `IEngine`
     * implementation, allowing the handling of specific logic through the methods and properties defined by
     * the interface. When the value is undefined, it implies that no engine instance is currently assigned.
     *
     * This variable is typically intended for scenarios that require dependency injection or dynamic assignment
     * of an engine implementation.
     */
    public engine: IEngine<any, any> | undefined

    constructor(
        public readonly widget: IWidgetNode<any, any>,
        props?: P,
        state?: S,
    ) {
        this.props = props || {} as P
        this.state = state || {} as S
    }

}

/**
 * Represents a widget node within the application that manages the lifecycle, context, and state of an associated HTMLElement.
 *
 * @template E The type of HTMLElement this widget node represents.
 * @template A The type of attributes associated with this widget node.
 */
export class WidgetNode<E extends HTMLElement, A extends IAttributes> implements IWidgetNode<E, A> {

    /**
     * Represents a widget element interface designed to handle specific functionality and data of a widget.
     * This is a generic type where `E` defines the type of element it encapsulates or operates on.
     *
     * @template E - The type parameter representing the element type associated with this widget element.
     */
    readonly element: IWidgetElement<E>;

    /**
     * A unique identifier represented as a string, typically used to track or verify data integrity.
     * The `_fingerprint` variable can serve as a hash or checksum to ensure that the associated
     * data has not been tampered with or corrupted.
     */
    protected _fingerprint: string;

    /**
     * A boolean variable indicating whether the widget or process is ready for operation.
     * - `true`: The widget is ready and operational.
     * - `false`: The widget is not ready yet.
     */
    protected _isConnected: boolean = false;

    /**
     * Represents a variable used to store a reference, which can either be an instance
     * of IRef containing generic types E and A or undefined.
     *
     * IRef is expected to be an interface or type that encapsulates a reference
     * structure or behavior. The actual implementation and use depend on the specific
     * context of the program.
     */
    protected _reference: IRef<E, A> | undefined;

    /**
     * Represents the HTML tag name associated with a component or element.
     *
     * This variable can be used to specify or identify the intended HTML element type
     * that should be rendered or manipulated.
     *
     * The default value is 'div'.
     */
    protected _tag: string = 'div';

    /**
     * Represents an object containing attributes of type `A`.
     * This variable is initialized as an empty object and is explicitly typed to ensure it maintains properties
     * as defined by the `A` type.
     */
    protected _attributes: A = {} as A;

    /**
     * Represents the native properties of a given entity or component.
     * This variable is typed with a generic interface `INativeProperties<E, A>`, where:
     * - `E` typically denotes the entity type.
     * - `A` represents the associated attributes or metadata.
     * It is initialized as an empty object cast to the `INativeProperties<E, A>` type.
     */
    protected _props: INativeProperties<E, A> = {} as INativeProperties<E, A>;

    /**
     * Private variable representing a signal stack interface for widget signal maps.
     * This is used to manage a stack of signals related to widgets and their associated
     * events or actions. The generic types E and A define the structure of signals
     * emitted and actions taken by the widgets respectively.
     *
     * @template E - The type of the events associated with the widget signals.
     * @template A - The type defining the actions or payloads corresponding to the events.
     * @private
     */
    protected _signal: ISignalStack<IWidgetSignalMap<E, A>>;

    /**
     * Indicates whether the current state or resource is locked.
     *
     * The `_locked` variable is a boolean flag used to determine if
     * a specific operation or access is restricted. When set to `true`,
     * it signifies that the resource or operation is locked and cannot
     * be modified or accessed. When `false`, the resource or operation
     * is available for interaction.
     */
    protected _locked: boolean = false;

    /**
     * Represents the current execution context for the application or process.
     *
     * The `_context` variable holds an instance of `IContext<any, any>`, which provides
     * contextual information, configuration, or services needed during runtime. It may be
     * undefined if no context is explicitly provided or available.
     *
     * Type: IContext<any, any> | undefined
     */
    protected _context: IContext<any, any> | undefined = undefined;

    /**
     * Represents the stylesheet object or definition for the application or component.
     * It can either be an instance of IStyleSheet or remain undefined if no stylesheet is provided or required.
     */
    protected _stylesheet: IStyleSheet | undefined = undefined;

    /**
     * Represents the mounted state of a component or element.
     *
     * The `_mounted` variable is a boolean flag that indicates whether a component
     * or element has been successfully mounted or initialized.
     *
     * - `true` indicates that the component is currently mounted.
     * - `false` (default value) indicates that the component is not mounted or has been unmounted.
     */
    protected _mounted: boolean = false;

    /**
     * Constructor for creating a new widget instance.
     *
     * @param {IWidgetDeclaration<E, A>} declaration - The widget declaration object containing configuration and initialization details.
     */
    constructor(declaration: IWidgetDeclaration<E, A>) {
        this.extractProperties(declaration);
        this.element = Environment.Client
            ? document.createElement(this.tag) as E
            : new SpectraElement(this.tag)
        this._fingerprint = `${MetricRandom.CreateAlpha(6).join('')}-${MetricRandom.Create(10).join('')}`;
        this._signal = new Signal.Stack;
        this.mount(() => this._isConnected = true);
    }

    /**
     * Apply the style declarations associated with the component.
     *
     * @return {IStyleSheetDeclarations | undefined} The style declarations object if defined, otherwise undefined.
     */
    static get style(): IStyleSheetDeclarations | undefined {
        return undefined;
    }

    /**
     * Retrieves the attributes associated with the current context.
     *
     * @return {IAttributes | undefined} the attribute object if available, or undefined if no attributes are set.
     */
    static get attributes(): IAttributes | undefined {
        return undefined;
    }

    /**
     * Retrieves the child node(s) associated with the widget.
     *
     * @return {IWidgetNode<any, any> | undefined} The child node(s) of the widget, or undefined if no children exist.
     */
    static get children(): IWidgetNode<any, any> | undefined {
        return undefined
    }

    /**
     * Mounts the provided widget and potentially returns it.
     *
     * @param {IWidgetNode<E, A>} widget - The widget node to mount. It includes an element of type `E` and attributes of type `A`.
     * @return {IWidgetNode<E, A> | void | undefined} The mounted widget node, or undefined/void if no value is returned.
     */
    static mount<E extends HTMLElement, A extends IAttributes>(
        widget: IWidgetNode<E, A>
    ): IWidgetNode<E, A> | void | undefined {
        return widget
    }

    /**
     * Unmounts the specified widget, performing any necessary cleanup tasks and detaching it from the DOM or parent component.
     *
     * @param {IWidgetNode<E, A>} widget - The widget node to be unmounted. This represents the component or element to be removed.
     * @returns {IWidgetNode<E, A> | void | undefined} The unmounted widget node, or undefined if no widget is returned after unmounting. Returns void if no specific value is needed.
     */
    static unmount<E extends HTMLElement, A extends IAttributes>(
        widget: IWidgetNode<E, A>
    ): IWidgetNode<E, A> | void | undefined {
        return widget
    }

    /**
     * Retrieves the tag associated with this instance.
     *
     * @return {string} The tag value.
     */
    get tag(): string {
        return this._tag;
    }

    /**
     * Getter method that retrieves the fingerprint value.
     *
     * @return {string} The fingerprint of the current instance.
     */
    get fingerprint(): string {
        return this._fingerprint;
    }

    /**
     * Checks the connection state.
     *
     * @return {boolean} Returns true if the connection is established, otherwise false.
     */
    get isConnected(): boolean {
        return this._isConnected || ((Environment.Client && this.clientElement) ? this.clientElement.isConnected : false);
    }

    /**
     * Retrieves the client element if the environment is a client.
     *
     * @return {E | undefined} The client element of type E if available, otherwise undefined.
     */
    get clientElement(): E | undefined {
        return Environment.Client ? this.element as E || undefined : undefined;
    }

    /**
     * Retrieves the server-side element if the environment is not a client.
     *
     * @return {ISpectraElement | undefined} The server-side element if available, or undefined if the environment is a client or the element is not defined.
     */
    get serverElement(): ISpectraElement | undefined {
        return Environment.Client ? undefined : (this.element as ISpectraElement) || undefined;
    }

    /**
     * Gets the children associated with the current instance.
     *
     * @return {IChildren<IChildrenSupported>} The children property of the current instance.
     */
    get children(): IChildren<IChildrenSupported> {
        return this._props.children;
    }

    /**
     * Gets the attributes of the object.
     *
     * @return {A} The current attributes.
     */
    get attributes(): A {
        return this._attributes;
    }

    /**
     * Retrieves the properties associated with the current instance.
     *
     * @return {INativeProperties<E, A>} The properties of the current instance.
     */
    get props(): INativeProperties<E, A> {
        return this._props;
    }

    /**
     * Retrieves a collection of dataset attributes associated with the element
     * and returns them as an object, with keys converted to camelCase format.
     *
     * Uses different methods to fetch dataset attributes depending on whether the
     * environment is client-side or server-side. For client-side, it accesses `dataset`
     * directly. For server-side, it filters the element's blueprint attributes that start with `data-`.
     *
     * @return {IGlobalAttributes} An object containing dataset attributes with camelCase keys.
     */
    get datasets(): IGlobalAttributes {
        const dataset = {}
        const entries = Environment.Client
            ? Object.entries(this.clientElement?.dataset || {})
            : [...this.serverElement?.blueprint.attributes.entries() || []]
                .filter(x => x.toString().startsWith('data-'))

        for (const [key, value] of entries) dataset[TextUtility.camelCase(key)] = value;

        return dataset;
    }

    /**
     * Retrieves the current reference associated with the instance.
     *
     * @return {IRef<E, A> | undefined} The reference object if available, otherwise undefined.
     */
    get reference(): IRef<E, A> | undefined {
        return this._reference || undefined;
    }

    /**
     * Retrieves the locked state of the current object.
     * Indicates whether the object is in a locked state.
     *
     * @return {boolean} True if the object is locked, otherwise false.
     */
    get locked(): boolean {
        return this._locked
    }

    /**
     * Sets the locked state of the object and triggers the appropriate lock or unlock behavior.
     *
     * @param {boolean} value - A boolean indicating whether the object should be locked (true) or unlocked (false).
     */
    set locked(value: boolean) {
        this._locked = value;
        if (this._locked) this.lock()
        else this.unlock();
    }

    /**
     * Gets the signal stack associated with the widget signal map.
     *
     * @return {ISignalStack<IWidgetSignalMap<E, A>>} The signal stack instance used for managing widget signals.
     */
    get signal(): ISignalStack<IWidgetSignalMap<E, A>> {
        return this._signal;
    }

    /**
     * Retrieves and returns the measurement properties of the current element.
     * The properties include position, dimensions, and bounding rectangle details.
     * If the environment is client-side and the element is available, the bounding client rect is returned.
     * If not, default values are returned for all properties.
     *
     * @return {IMeasure} An object containing the measurement details such as x, y, top, bottom, left, right, width, and height.
     */
    get measure(): IMeasure {
        return {
            x: 0,
            y: 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0,
            ...(Environment.Client ? this.clientElement?.getBoundingClientRect().toJSON() : {}),
        }
    }

    /**
     * Retrieves the associated stylesheet, initializing it if it has not been set.
     * The method ensures that a singleton instance of the stylesheet is created and bound to the current context.
     *
     * @return {IStyleSheet} The initialized or previously instantiated stylesheet instance.
     */
    get stylesheet(): IStyleSheet {
        this._stylesheet = this._stylesheet || (new StyleWidget()).bind(this);
        return this._stylesheet;
    }

    /**
     * Retrieves the current context associated with the instance.
     *
     * @return {IContext<any, any> | undefined} The context object if available, or undefined if no context is set.
     */
    get context(): IContext<any, any> | undefined {
        return this._context;
    }

    /**
     * Sets the context for the current instance.
     *
     * @param {IContext<any, any>} [context] - The context to be used for the current instance.
     * @return {this} The current instance with the updated context.
     */
    useContext(context?: IContext<any, any>): this {
        this._context = context;
        // this._context = this._context || context;
        return this;
    }

    /**
     * Registers a callback function to be executed when the 'construct' signal is emitted.
     *
     * @param {ICallable<E, A, undefined>} callback - The callback function to be invoked.
     * @return {this} The current instance for method chaining.
     */
    construct(callback: ICallable<E, A, undefined>): this {
        this._signal.listen('construct', callback);
        return this;
    }

    /**
     * Registers a callback to be executed when a 'mount' signal is emitted.
     * Ensures the callback is only executed once during the mounting phase.
     *
     * @param {ICallable<E, A, IWidgetNode<E, A>>} callback - The function to execute when the mount signal is triggered. The callback receives the payload of the signal.
     * @return {this} Returns the current instance to allow method chaining.
     */
    mount(callback: ICallable<E, A, IWidgetNode<E, A>>): this {
        this._signal.listen('mount', payload => {
            if (!this._mounted) {
                this._mounted = true;
                return callback(payload);
            }
        });
        return this;
    }

    /**
     * Unmounts the component and triggers the provided callback when the component is unmounted.
     *
     * @param {ICallable<E, A, undefined>} callback - A callable function to be invoked with the payload when the component is unmounted.
     * @return {this} Returns the current instance for method chaining.
     */
    unmount(callback: ICallable<E, A, undefined>): this {
        this._signal.listen('unmount', payload => {
            if (this._mounted) {
                this._mounted = false;
                return callback(payload);
            }
        });
        return this;
    }

    /**
     * Registers a callback to be executed when the widget is ready. If the widget is already ready,
     * the callback is invoked immediately. Otherwise, it defers execution until the widget has been
     * mounted and becomes ready.
     *
     * @param {ICallable<E, A, IWidgetNode<E, A>>} callback - The function to be executed when the widget is ready.
     * @return {this} Returns the current instance of the widget.
     */
    ready(callback: ICallable<E, A, IWidgetNode<E, A>>): this {
        if (!this._isConnected && this.context?.root) {
            callback({
                root: this.context?.root,
                widget: this,
                payload: this,
            })
        } else this.signal.listen('mount', (payload) => {
            callback(payload)
            return TreatmentQueueStatus.SnapOut
        })
        return this;
    }

    /**
     * Registers a callback function to be executed before a specific action or event.
     * The callback is triggered with the event ('before') and any associated data.
     *
     * @param {ICallable<E, A, undefined>} callback - The function to be called before the event. It receives the relevant event data as arguments.
     * @return {this} The current instance of the object, to allow for method chaining.
     */
    before(callback: ICallable<E, A, undefined>): this {
        this._signal.listen('before', callback);
        return this;
    }

    /**
     * Registers a callback to be executed after the main action or event.
     *
     * @param {ICallable<E, A, undefined>} callback - The callback function to be executed.
     * @return {this} The instance of the current object to allow method chaining.
     */
    after(callback: ICallable<E, A, undefined>): this {
        this._signal.listen('after', callback);
        return this;
    }


    /**
     * Retrieves the value of a specific state from the client element if available.
     *
     * @param {string} state - The state name to look up in the client element.
     * @return {(boolean|undefined)} The value of the specified state if defined, or undefined if the state is not defined or the client element is not available.
     */
    get(state: string): boolean | undefined {
        return Environment.Client ? (this.clientElement && typeof this.clientElement[state] !== "undefined" ? this.clientElement[state] : undefined) : undefined;
    }

    /**
     * Sets the specified state on the client element if running in a client environment.
     *
     * @param {string} state - The state value to be set on the client element.
     * @return {this} The current instance for method chaining.
     */
    set(state: string): this {
        if (Environment.Client && this.clientElement)
            this.clientElement[state] = state;
        return this;
    }

    /**
     * Clears the current context by invoking the engine's clear method, and sets up a signal listener for the 'mount' event
     * to clear the context if it has not been initialized yet.
     *
     * @return {this} The current instance for method chaining.
     */
    clear(): this {
        if (this._context) {
            this._context?.engine?.clear(this);
        }
        if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.clear(this);
            return TreatmentQueueStatus.SnapOut;
        });
        return this;
    }

    /**
     * Removes the current instance from the associated engine or context.
     * If the context is not immediately available, scheduling occurs to ensure it is removed upon mounting.
     *
     * @return {this} Returns the current instance for method chaining.
     */
    remove(): this {
        if (this._context) this._context?.engine?.remove(this);
        if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.remove(this);
            return TreatmentQueueStatus.SnapOut;
        });
        return this;
    }

    /**
     * Enables the current instance by invoking the associated engine's enable method.
     * If the context is not available, sets up a listener to enable the instance upon the 'mount' signal.
     *
     * @return {this} Returns the instance of the current object to allow method chaining.
     */
    enable(): this {
        if (this._context) this._context.engine?.enable(this);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.enable(this);
            return TreatmentQueueStatus.SnapOut;
        });
        return this;
    }

    /**
     * Disables the current instance within its context or sets up a signal listener
     * to disable when the context becomes available.
     *
     * @return Returns the current instance for chaining.
     */
    disable(): this {
        if (this._context) this._context.engine?.disable(this);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.disable(this);
            return TreatmentQueueStatus.SnapOut;
        });
        return this;
    }

    /**
     * Locks the current instance by utilizing the engine's lock mechanism if the instance has a valid context.
     * If the instance does not have a context, it sets up a listener for the 'mount' event
     * to subsequently lock the instance once the context is available.
     *
     * @return {this} Returns the current instance to allow method chaining.
     */
    lock(): this {
        if (this._context) this._context.engine?.lock(this);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.lock(this);
            return TreatmentQueueStatus.SnapOut;
        });
        return this;
    }

    /**
     * Sets the focus on the current context's engine if available. If the context
     * is not available, it listens for the 'mount' signal to set the focus once
     * the context becomes available.
     *
     * @return {this} Returns the instance of the current object for method chaining.
     */
    focus(): this {
        if (this._context) this._context.engine?.focus(this);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.focus(this);
            return TreatmentQueueStatus.SnapOut;
        });
        return this;
    }

    /**
     * Triggers a blur effect or action on the current instance.
     * If a context is available, it directly invokes the blur method on the corresponding engine.
     * If the context is not available, it sets up a listener for the 'mount' signal to ensure the blur action is executed when the context becomes available.
     *
     * @return {this} Returns the current instance to allow method chaining.
     */
    blur(): this {
        if (this._context) this._context.engine?.blur(this);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.blur(this);
            return TreatmentQueueStatus.SnapOut;
        });
        return this;
    }

    /**
     * Unlocks the current context or sets up a listener to unlock upon the 'mount' event.
     *
     * If a context is present, it attempts to unlock using the associated engine.
     * If a context is not present, it sets up a signal listener that triggers unlocking
     * on the 'mount' event.
     *
     * @return {this} The current instance for method chaining.
     */
    unlock(): this {
        if (this._context) this._context.engine?.unlock(this);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.unlock(this);
            return TreatmentQueueStatus.SnapOut;
        });
        return this;
    }

    /**
     * Triggers an event of the specified type on the current object.
     * If the context is not available at the time of triggering, it listens
     * for the "mount" signal to perform the trigger operation once the context is available.
     *
     * @param type The type of the event to trigger. Must be a key from the IGlobalEventMap interface.
     * @return Returns the current instance of the object to enable method chaining.
     */
    trigger(type: keyof IGlobalEventMap): this {
        if (this._context) this._context.engine?.trigger(this, type);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.trigger(this, type);
            return TreatmentQueueStatus.SnapOut;
        });
        return this;
    }

    /**
     * Updates the state of the current instance and triggers appropriate actions within the context or signal.
     *
     * @param {boolean} state - The new state to be set for the instance.
     * @return {this} Returns the instance for chaining purposes.
     */
    stase(state: boolean): this {
        if (this._context) this._context.engine?.stase(this, state);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.stase(this, state);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    /**
     * Retrieves the computed style value for a specific CSS property (token) of the current element.
     *
     * @param {keyof IStyleDeclaration} token - The CSS property whose computed style is to be retrieved.
     * @return {string | undefined} The computed style value of the specified property, or undefined if not available.
     */
    computedStyle(token: keyof IStyleDeclaration): string | undefined {
        return this.context?.engine?.computedStyle(this, token);
    }

    /**
     * Hides the current instance by interacting with the engine or setting up a listener
     * for the 'mount' signal to hide the instance when the context becomes available.
     *
     * @return {this} Returns the current instance for potential method chaining.
     */
    hide(): this {
        if (this._context) this._context.engine?.hide(this);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.hide(this);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    /**
     * Displays the current instance with the provided display options if applicable.
     * If a context is not available, it listens for the `mount` event to initiate the display process.
     *
     * @param {Displaying} [display] - Optional parameter specifying display options or configuration.
     * @return {this} The current instance for method chaining.
     */
    show(display?: Displaying): this {
        if (this._context) this._context.engine?.show(this, display);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.show(this, display);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    /**
     * Toggles the current state based on the provided option or context.
     * If a rendering context is already available, the toggle will
     * immediately execute. If there is no context, it listens for
     * a 'mount' signal to perform the toggle operation.
     *
     * @param {ToggleOption} [option] The optional toggle configuration to determine behavior.
     * @return {this} The same instance for method chaining.
     */
    toggle(option?: ToggleOption): this {
        if (this._context) this._context.engine?.toggle(this, option);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.toggle(this, option);
            return TreatmentQueueStatus.SnapOut;
        })
        return this
    }

    /**
     * Adjusts the widget's elevation level by modifying its style and z-index.
     *
     * @param {ObjectElevation} [elevation] - The desired elevation level. If not provided, defaults to `WidgetElevation.None`.
     * @return {this} The current instance of the widget for method chaining.
     */
    elevate(elevation?: ObjectElevation): this {
        this
            .stylesheet
            .merge({zIndex: elevation?.toString() || ObjectElevation.None})
            .sync()
        return this;
    }

    /**
     * Sets the data for the current instance using the provided dataset.
     *
     * @param {IGlobalAttributes} dataset - The dataset containing global attributes to be processed.
     * @return {this} Returns the current instance for method chaining.
     */
    data(dataset: IGlobalAttributes): this {
        if (this._context) this._context.engine?.data(this, dataset);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.data(this, dataset);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    /**
     * Updates or applies attributes to the current object. If the context is available, it immediately applies the attributes.
     * If the context is not available, it sets up a listener to apply the attributes upon a "mount" event.
     *
     * @param {Partial<A>} attributes - An object representing the partial set of attributes to be applied to the object.
     * @return {this} Returns the current instance of the object for method chaining.
     */
    attribute(attributes: Partial<A>): this {
        if (this._context) this._context.engine?.attribute(this, attributes);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.attribute(this, attributes);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    /**
     * Removes specified attributes from the element managed by the context's engine.
     *
     * @param {IGlobalAttributes} attributes - The attributes to be removed.
     * @return {this} Returns the current instance for method chaining.
     */
    attributeLess(attributes: IGlobalAttributes): this {
        if (this._context) this._context.engine?.attributeLess(this, attributes);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.attributeLess(this, attributes);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    /**
     * Applies a set of style declarations to the current context. If the context is not yet available,
     * the declarations will be deferred until the 'mount' event occurs.
     *
     * @param {IStyleSheetDeclarations} declaration - The style declarations to be applied.
     * @return {this} Returns the instance of the current object to allow chaining.
     */
    style(declaration: IStyleSheetDeclarations): this {
        if (this._context) this._context.engine?.style(this, declaration);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.style(this, declaration);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    /**
     * Sets the class name of the current instance based on the provided token.
     * If the context is available, it directly invokes the className method from the engine.
     * If the context is not available, it listens for the 'mount' signal to set the class name later.
     *
     * @param {IStringToken} token - The token representing the class name to be assigned.
     * @return {this} The current instance of the object for method chaining.
     */
    className(token: IStringToken): this {
        if (this._context) this._context.engine?.className(this, token);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.className(this, token);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    /**
     * Removes a class name from the current context or schedules for removal during mount if context is not available.
     *
     * @param {IStringToken} token - The token representing the class name to be removed.
     * @return {this} The current instance for method chaining.
     */
    removeClassName(token: IStringToken): this {
        if (this._context) this._context.engine?.removeClassName(this, token);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.removeClassName(this, token);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    /**
     * Replaces a class name token for the current object within the context's engine or adds a listener to handle the replacement on mount.
     *
     * @param {IStringToken} oldToken - The existing class name token to be replaced.
     * @param {IStringToken} token - The new class name token to replace the old one with.
     * @return {this} Returns the current instance for chaining.
     */
    replaceClassName(oldToken: IStringToken, token: IStringToken): this {
        if (this._context) this._context.engine?.replaceClassName(this, oldToken, token);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.replaceClassName(this, oldToken, token);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    /**
     * Clears the class name associated with the current context or sets up a signal to do so when the component is mounted.
     *
     * If the context exists, it immediately clears the class name using the associated engine.
     * If the context does not exist, it sets up a listener to clear the class name when the 'mount' signal is triggered.
     *
     * @return {this} Returns the instance for method chaining.
     */
    clearClassName(): this {
        if (this._context) this._context.engine?.clearClassName(this);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.clearClassName(this);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    /**
     * Updates the current instance with the provided data value. If a context is present,
     * it executes the value method of the associated engine immediately. Otherwise,
     * it listens for a 'mount' signal to execute the value method once the context is available.
     *
     * @param {IPrimitive} data - The data to be passed to the associated engine for processing.
     * @return {this} The current instance of the object for method chaining.
     */
    value(data: IPrimitive): this {
        if (this._context) this._context.engine?.value(this, data);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.value(this, data);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    /**
     * Inserts or processes the provided HTML code within the context of the current instance.
     *
     * @param {string} code - The HTML code to be processed or inserted.
     * @return {this} Returns the current instance for method chaining.
     */
    html(code: string): this {
        if (this._context) this._context.engine?.html(this, code);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.html(this, code);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    /**
     * Sets the content with the specified children and updates the context accordingly.
     *
     * @param {IChildren<IChildrenSupported>} children - The child elements or child data to set as content in the current context.
     * @return {this} The current instance for method chaining.
     */
    content(children: IChildren<IChildrenSupported>): this {
        if (this._context) this._context.engine?.content(this, children);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.content(this, children);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    /**
     * Attaches an event listener of a specified type to this object. The listener will trigger the provided callback when the event is fired.
     *
     * @param {T} type - The type of the event to listen for. This must be a key of `IGlobalEventMap`.
     * @param {ICallable<E, A, IGlobalEventPayload<T>>} callback - The function to execute when the event is triggered.
     * @param {boolean | AddEventListenerOptions} [options=false] - Optional parameter that specifies characteristics about the event listener.
     * @return {this} Returns the instance of this object to allow for method chaining.
     */
    listen<T extends keyof IGlobalEventMap>(
        type: T,
        callback: ICallable<E, A, IGlobalEventPayload<T>>,
        options: boolean | AddEventListenerOptions = false,
    ): this {
        if (this._context) this._context.engine?.listen(this, type, callback, options);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.listen(this, type, callback, options);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    /**
     * Registers an event listener for the specified event type.
     *
     * @template T The key representing the event type in the global event map.
     * @param {T} type The event type to listen for.
     * @param {ICallable<E, A, IGlobalEventPayload<T>> | null} callback The function to execute when the event is triggered, or `null` to remove the listener.
     * @return {this} The current instance for method chaining.
     */
    on<T extends keyof IGlobalEventMap>(type: T, callback: ICallable<E, A, IGlobalEventPayload<T>> | null): this {
        if (this._context) this._context.engine?.on(this, type, callback);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.on(this, type, callback);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }

    detachEvent<T extends keyof IGlobalEventMap>(type: T): this {
        if (this._context) this._context.engine?.detachEvent(this, type);
        else if (!this._context) this._signal.listen('mount', () => {
            this._context?.engine?.detachEvent(this, type);
            return TreatmentQueueStatus.SnapOut;
        })
        return this;
    }


    clone(): this {
        return new (this as any).constructor(structuredClone({...this.props, ...this.attributes}));
    }


    /**
     * Appends a child node or target to the current instance.
     * This method is used to add additional widget elements or UI targets to the current instance.
     *
     * @param {IWidgetNode<any, any> | IUiTarget<any>} children - The child node or UI target to append.
     * @return {this} The current instance for method chaining.
     */
    append(children: IWidgetNode<any, any> | IUiTarget<any>): this {
        if (Array.isArray(children))
            children.forEach(child => this.element?.append(child))

        else if (children instanceof WidgetNode) {
            this.element?.append(children.element)
            children.useContext(this._context)
        }
        return this;
    }

    prepend(children: IWidgetNode<any, any> | IUiTarget<any>): this {

        if (Array.isArray(children))
            children.forEach(child => this.element?.prepend(child))

        else if (children instanceof WidgetNode) {
            this.element?.prepend(children.element)
            children.useContext(this._context)
        }

        return this;
    }


    /**
     * Configures a callable function for client or server environments based on the provided options.
     *
     * @param {IWidgetSideCallableOptions<E>} callable - The options object specifying client and server callable functions.
     * @return {this} The current instance of the object for chaining.
     */
    callable(callable: IWidgetSideCallableOptions<E>): this {
        if (Environment.Client && this.clientElement && callable.client) callable.client(this.clientElement)
        if (!Environment.Client && this.serverElement && callable.server) callable.server(this.serverElement)
        return this;
    }

    /**
     * Extracts and organizes widget properties into attributes and native properties.
     *
     * @param {IWidgetDeclaration<E, A>} properties - The properties to be extracted and assigned.
     * @return {this} Returns the instance of the class for chaining.
     */
    protected extractProperties(properties: IWidgetDeclaration<E, A>): this {
        properties = properties || this._props || {};

        const _attributes = {} as A;
        const _props: INativeProperties<E, A> = {} as INativeProperties<E, A>;

        properties.children = properties.children || (this.constructor as typeof WidgetNode<E, A>).children;

        Object.keys(properties)
            .forEach((key) => {
                if (!(WidgetNativeProperties as string[]).includes(key)) _attributes[key] = properties[key];
                else _props[key] = properties[key];
            })

        this._attributes = {...((this.constructor as typeof WidgetNode<E, A>).attributes || {}), ..._attributes};
        this._props = _props;
        return this;
    }

}

/**
 * Constructs and renders a widget based on the provided widget node and context.
 *
 * @param {IWidgetNode<E, A>} widget - The widget node containing the details needed to construct the widget.
 * @param {IContext<P, S>} context - The context containing the property and state stacks as well as the engine to be used for rendering.
 * @return {string | E | undefined} The rendered widget, which may be a string representation, an HTML element, or undefined if rendering fails.
 */
export function WidgetBuilder<E extends HTMLElement, A extends IAttributes, P extends IPropStack, S extends IStateStack>(
    widget: IWidgetNode<E, A>,
    context: IContext<P, S>,
): string | E | undefined {
    const engine = ((Environment.Client) ? Widgets.Engine.client(widget) : Widgets.Engine.server(widget));
    context.engine = engine;
    return engine.render<P, S>(widget, context);
}