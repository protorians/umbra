import type {
    IView,
    IEncapsulatorConfigs, IWidgetNode,
    ICallablePayload, IAttributes,
    IViewStates,
    IViewProperties, IEncapsulatorStack,
} from "./types/index.js";
import {WidgetException} from "./errors/index.js";
import {StateWidget} from "./hooks/index.js";


export class Views {

}

/**
 * ViewWidget is a class that implements the IView interface and serves as a basis
 * for creating widgets with state management, property binding, and lifecycle management.
 *
 * It is designed for managing stateful or stateless widgets within the encapsulation
 * of IEncapsulatorConfigs configurations.
 *
 * Functionalities of this class include:
 * - Managing widget instance and states
 * - Bootstrap and defusing logic for lifecycle control
 * - Construction of the widget with specific configurations
 */
export class ViewWidget implements IView {

    /**
     * Represents an instance of the IView interface or undefined.
     *
     * This variable is used to reference the current view instance, which
     * adheres to the structure defined by the IView interface. If no instance
     * is assigned, the variable will remain undefined.
     *
     * @type {IView | undefined}
     */
    protected static _instance: IView | undefined;

    /**
     * Represents a widget node which may be of type `IWidgetNode` with generic parameters
     * or undefined. Used to manage and interact with a specific widget component.
     *
     * @type {IWidgetNode<any, any> | undefined}
     */
    protected static _widget: IWidgetNode<any, any> | undefined;

    /**
     * Configuration object for encapsulator settings.
     *
     * @property {boolean} stateless
     * Determines whether the encapsulator operates in a stateless mode.
     *
     * @property {any | undefined} main
     * The main entry or component of the encapsulator. Undefined if not set.
     *
     * @property {any | undefined} bootstrapper
     * The bootstrapper module or function to initialize the encapsulator. Undefined if not set.
     *
     * @property {any | undefined} defuser
     * The defuser or deactivation function associated with the encapsulator. Undefined if not set.
     *
     * @property {Array<any>} properties
     * List of properties associated with the encapsulator. Defaults to an empty array if not provided.
     *
     * @property {Array<any>} states
     * List of states managed by the encapsulator. Defaults to an empty array if not provided.
     *
     * @property {Object} options
     * Additional options for customizing the encapsulator's behavior. Defaults to an empty object if not provided.
     */
    static _default_configs: IEncapsulatorConfigs = {
        stateless: true,
        main: undefined,
        bootstrapper: undefined,
        defuser: undefined,
        properties: [],
        states: [],
        options: {},
    }
    static _configs: IEncapsulatorStack = new Map<string, IEncapsulatorConfigs>();

    /**
     * The `props` variable is a readonly object that adheres to the `IViewProperties` interface.
     * It is designed to hold properties related to a view.
     *
     * @type {Readonly<IViewProperties<any>>}
     */
    static props: Readonly<IViewProperties<any>> = {}

    /**
     * Represents the states of a view and is declared as a read-only object.
     * This structure ensures that its properties cannot be modified after
     * initialization.
     *
     * @type {Readonly<IViewStates<any>>}
     */
    static states: Readonly<IViewStates<any>> = {}

    /**
     * Retrieves the current instance of the IView, if it exists.
     *
     * @return {IView | undefined} The current instance of IView if available, otherwise undefined.
     */
    static get instance(): IView | undefined {
        return this._instance
    }

    /**
     * Retrieves the current widget associated with the instance.
     *
     * @return {IWidgetNode<any, any> | undefined} The widget instance if available, otherwise undefined.
     */
    static get widget(): IWidgetNode<any, any> | undefined {
        return this._widget
    }


    static _getConfigs() {
        return this._configs.get(this.name)
    }


    /**
     * Subscribes a provided ViewWidget instance to the current context.
     *
     * @param {ViewWidget} value - The ViewWidget instance to subscribe.
     * @return {typeof this} - Returns the class itself to allow method chaining.
     */
    static subscribe(value: ViewWidget): typeof this {
        this._instance = value;
        return this;
    }

    /**
     * Initializes and executes the bootstrap process for the given payload.
     *
     * @param {ICallablePayload<E, A, IWidgetNode<E, A>>} payload - The payload object that provides necessary data for bootstrapping, including the parent element, attributes, and widget node information.
     * @return {void} This method does not return any value.
     */
    static bootstrap<E extends HTMLElement, A extends IAttributes>(payload: ICallablePayload<E, A, IWidgetNode<E, A>>): void {
        const configs = this._getConfigs();

        if (typeof configs !== 'object') return;
        if (typeof configs.bootstrapper === 'undefined') return;
        if (this._instance && typeof this._instance[configs.bootstrapper] !== 'function') return;
        if (this._instance) this._instance[configs.bootstrapper].apply(this._instance, [payload]);
    }

    /**
     * Disarms the functionality of a given payload by invoking a specified defuser method
     * on the current instance, if configured and available.
     *
     * @param {ICallablePayload<E, A, undefined>} payload - The payload to be passed
     * to the defuser method. Contains the data and context to be processed.
     * @return {void} This method does not return a value.
     */
    static defuse<E extends HTMLElement, A extends IAttributes>(payload: ICallablePayload<E, A, undefined>): void {
        const configs = (this.constructor as any)._getConfigs();

        if (typeof configs !== 'object') return;
        if (typeof configs.defuser === 'undefined') return;
        if (this._instance && typeof this._instance[configs.defuser] !== 'function') return;
        if (this._instance) this._instance[configs.defuser].apply(this._instance, [payload]);
    }

    /**
     * Constructs an instance of the widget node based on the widget configuration.
     *
     * @param {T} [props] Optional properties to be passed to the widget instance during construction.
     * @return {IWidgetNode<any, any> | undefined} The constructed widget node, or undefined if creation fails.
     */
    static construct<T extends Object>(props?: T): IWidgetNode<any, any> | undefined {
        const configs = this._getConfigs();

        if (configs && !configs.main)
            throw (new WidgetException('Not View Main implemented')).show();

        let instance: IView | undefined = (
            configs && !configs.stateless
                ? (this._instance || new this())
                : new this()
        );

        if (configs && typeof configs.main !== 'undefined' && typeof instance[configs.main] !== 'function')
            throw (new WidgetException(`${configs.main} is not a function`)).show();

        if (configs && configs.properties) {
            configs.properties.forEach(name => {
                if (!instance) return;
                if (typeof instance[name] === 'undefined' || typeof instance[name] === 'function') return;
                Object.defineProperty(this.props, name, {
                    writable: false,
                    value: instance[name],
                })
            })
        }

        if (configs && configs.states && !configs.stateless) {
            configs.states.forEach(name => {
                if (!instance) return;
                if (typeof instance[name] === 'undefined') return;
                if (!(instance[name] instanceof StateWidget)) return;

                if (name in this.states)
                    Object.defineProperty(this.states, name, {
                        writable: false,
                        value: instance[name],
                    })
            })
        }

        this._widget = configs && typeof configs.main !== 'undefined'
            ? instance[configs.main].apply(instance, [props || {} as T]) as IWidgetNode<any, any> | undefined
            : undefined;

        this._widget?.attributeLess({ariaCurrent: "page"})

        // this._widget = (configs.stateless || !this._widget)
        //     ? instance[configs.main].apply(instance, [props || {} as T]) as IWidgetNode<any, any> | undefined
        //     : this._widget;

        this._widget?.signal.listen('mount', (context) => this.bootstrap(context))

        this._widget?.signal.listen('unmount', (payload) => {
            this.defuse.apply(instance, [payload]);
            if (configs && configs.stateless) {
                this._widget?.clear();
                instance = undefined;
            }
        })

        return this._widget
    }

    /**
     * Initializes a new instance of the ViewWidget class and subscribes the instance to a static subscription mechanism.
     * This ensures the instance is registered for updates or notifications handled by the class-level subscribe logic.
     */
    constructor() {
        (this.constructor as typeof ViewWidget).subscribe(this);
    }

}

/**
 * Represents a stateful view component extending the ViewWidget class.
 * It maintains internal states and configuration options for rendering
 * and interacting with the UI. This class leverages encapsulated configurations
 * to manage the structure and behavior of its components.
 *
 * The StatefulView class is primarily used for widget-based UI structures
 * requiring state and lifecycle management.
 *
 * It defines default encapsulator configurations with specific options for
 * statefulness, a main encapsulated view, and optional behavior or interaction handlers.
 *
 * Members:
 * - stateless: Indicates if the view is stateful (false by default).
 * - main: Defines the main encapsulated component of the view.
 * - bootstrapper: Provides optional functionality to initialize or bootstrap the component.
 * - defuser: Specifies optional defusing or teardown logic for the component.
 * - properties: Contains an array of properties relevant to the component's configuration.
 * - states: Represents various predefined states for the component.
 * - options: Stores miscellaneous configuration options that affect the view.
 *
 * Extends:
 * - ViewWidget: The base class providing fundamental widget behaviors and structure.
 *
 * Note: The encapsulated `_configs` object drives the configuration and behavior of the StatefulView instance.
 */
export class StatefulView extends ViewWidget {

    static _default_configs: IEncapsulatorConfigs = {
        stateless: false,
        main: undefined,
        bootstrapper: undefined,
        defuser: undefined,
        properties: [],
        states: [],
        options: {},
    }

}

/**
 * Represents a stateless view widget that extends the behavior of the ViewWidget.
 * This class is designed to be stateless, defined by its encapsulator configurations.
 * It does not maintain any internal states or rely on stateful logic, making it suitable
 * for use cases where such a design is required.
 *
 * Encapsulator-specific configurations for the StatelessView are predefined in the `_configs` property,
 * allowing controlled customization and integration when utilized in different contexts.
 *
 * The `stateless` flag is set to true, ensuring that the widget does not manage or depend on any internal state.
 * Properties, states, and options can be extended or overloaded depending on implementations that rely on the `StatelessView`.
 *
 * This class should be subclassed or used directly in contexts prioritizing lightweight and stateless UI components.
 */
export class StatelessView extends ViewWidget {

    static _default_configs: IEncapsulatorConfigs = {
        stateless: true,
        main: undefined,
        bootstrapper: undefined,
        defuser: undefined,
        properties: [],
        states: [],
        options: {},
    }

}