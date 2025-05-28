import type {
    IRouter, IRouterBaseRoute,
    IRouterBaseScheme,
    IRouterConfig,
    IRouterRoute,
    IRouterScheme,
    IRouterSignalMap,
} from "./types/index.js";
import {WidgetException} from "./errors/index.js";
import {type ISignalStack, Signal} from "@protorians/core";

/**
 * ClientRouter is a class designed for managing client-side routing in a web application.
 * It enables registering routes, navigating between routes, and handling associated logic.
 *
 * @template Scheme Extends the IRouterBaseScheme interface, representing the structure of the routing scheme.
 * @implements {IRouter<Scheme>} Implements the IRouter interface to provide routing functionalities.
 */
export class ClientRouter<Scheme extends IRouterBaseScheme> implements IRouter<Scheme> {

    /**
     * Represents the current router instance being used in the application.
     *
     * This variable holds the reference to the instance of `IRouter` if it is available.
     * It can also be `undefined` if no router instance is currently set or initialized.
     *
     * Use this variable to access or modify the active router configuration or
     * to determine if a routing mechanism is in place within the application context.
     *
     * @type {IRouter<any> | undefined}
     */
    static current: IRouter<any> | undefined;

    /**
     * Represents a route configuration in the routing system.
     *
     * The `_route` variable can either hold a combined route definition object that
     * extends `IRouterRoute` and `IRouterBaseRoute` or be undefined. When defined,
     * it provides details about a particular route's structure, handlers, and associated
     * metadata used by the router.
     *
     * Type:
     * - `IRouterRoute<any, keyof any>`: Represents detailed route information,
     *   including path parameters and request handling logic with type flexibility
     *   for parameterized routes.
     * - `IRouterBaseRoute`: Provides foundational routing properties applicable to
     *   routing base configurations.
     * - `undefined`: Indicates that no route information has been set or initialized.
     */
    protected _route: (IRouterRoute<any, keyof any> & IRouterBaseRoute) | undefined;

    /**
     * Represents the routing configuration for the application.
     *
     * The `_routes` variable is a strongly typed object that adheres to the `IRouterScheme<Scheme>` interface,
     * ensuring the routes are defined based on a predefined scheme. It is initialized as an empty object
     * and is expected to be populated with routing information that maps specific paths to their respective
     * handler definitions or configurations.
     *
     * The `Scheme` type parameter defines the structure or rules for the route scheme, ensuring type safety
     * and consistency across route declarations.
     *
     * It serves as the core reference for managing and accessing application routes.
     */
    protected _routes: IRouterScheme<Scheme> = {} as IRouterScheme<Scheme>;

    /**
     * Indicates whether an error condition is currently present.
     *
     * This variable represents a boolean state that signals the presence
     * of an error. A value of `true` indicates an error has occurred, while
     * `false` indicates no errors are present.
     */
    protected _error_status: boolean = false;

    /**
     * Represents a signal stack for handling router-specific signals.
     *
     * The `signal` variable is of type `ISignalStack<IRouterSignalMap<Scheme>>`,
     * where `IRouterSignalMap<Scheme>` maps the routes and associated signals for the specified scheme.
     *
     * This is used for managing and dispatching events or signals associated
     * with router operations.
     */
    signal: ISignalStack<IRouterSignalMap<Scheme>>;

    /**
     * Constructs an instance of the class.
     *
     * @param {IRouterConfig<Scheme>} config - The router configuration object.
     */
    constructor(
        public readonly config: IRouterConfig<Scheme>
    ) {
        this.signal = new Signal.Stack<IRouterSignalMap<Scheme>>;
    }

    /**
     * Retrieves the current route associated with the router.
     * This route is represented as a combination of `IRouterRoute` and `IRouterBaseRoute`, or it may be `undefined` if no route is set.
     *
     * @return {(IRouterRoute<any, keyof any> & IRouterBaseRoute) | undefined} The current route if present, otherwise `undefined`.
     */
    get route(): (IRouterRoute<any, keyof any> & IRouterBaseRoute) | undefined {
        return this._route;
    }

    /**
     * Retrieves the current URL of the document as a URL object.
     *
     * @return {URL} The URL object representing the current document's location.
     */
    get url(): URL {
        return new URL(location.href);
    }

    /**
     * Retrieves the URI based on the configuration and the current URL.
     * If the `useHash` configuration is enabled, the URI will be derived from the hash portion of the URL.
     * Otherwise, it uses the pathname, excluding the root "/".
     *
     * @return {string} The computed URI based on the `useHash` configuration and current URL.
     */
    get uri(): string {
        return this.config.useHash ? this.url.hash.substring(1) : (
            this.url.pathname == '/' ? '' : this.url.pathname
        );
    }

    get host(): string {
        return this.url.host
    }

    get port(): string {
        return this.url.port
    }

    get protocol(): string {
        return this.url.protocol
    }

    get secured(): boolean {
        return this.url.protocol == 'https';
    }

    get routes(): IRouterScheme<Scheme> {
        return this._routes;
    }

    query<K extends keyof Scheme>(): Scheme[K] {
        const accumulate: Scheme[K] = {} as Scheme[K]
        const params = new URLSearchParams((new URL(this.url)).search);
        params.forEach((value, key) => accumulate[key] = value)
        return accumulate;
    }

    use<K extends keyof Scheme>(route: IRouterRoute<Scheme, K>): this {
        this._routes[route.path] = {path: route.path, ...this.parses(route.path.toString())} as IRouterRoute<Scheme, K> & IRouterBaseRoute
        this._routes[route.path].view = route.view;
        return this;
    }

    navigate(to: string, props?: Scheme[keyof Scheme]): this {
        return this.open(to, props as any);
    }

    open<K extends keyof Scheme>(to: K, props?: Scheme[K]): this {
        props = props || {} as Scheme[K];

        const hasQuery = Object.keys(props).length;
        const searchQuery = new URLSearchParams(props as Record<string, any>);
        const url = `${window.location.origin}${
            this.config.useHash === true
                ? `${window.location.pathname}#`
                : `${this.config.baseUrl || ''}`
        }${to.toString()}${hasQuery ? `?${searchQuery.toString()}` : ``}`;

        // if (to === this.uri && JSON.stringify(this.query()) == JSON.stringify(props)) {
        //     console.log('reload', to, props)
        //     return this;
        // }

        window.history.pushState(props || {}, url, `${url}`);
        this.resolve(to.toString(), props)
        return this;
    }

    resolve<K extends keyof Scheme>(uri: string, props?: Scheme[K]): IRouterRoute<Scheme, keyof Scheme> & IRouterBaseRoute {
        uri = uri.split('?')[0];

        for (const route of Object.values(this.routes)) {
            const match = this.match(uri, route.pattern);
            if (match) {
                this._error_status = false;

                const params = this.excavation(route.parameters, match);

                this._route = route;
                props = props || {} as Scheme[K];

                this.signal.dispatch('navigate', {
                    route: route as IRouterRoute<Scheme, keyof Scheme> & IRouterBaseRoute,
                    params: params as Scheme[keyof Scheme],
                    props,
                });

                return route as IRouterRoute<Scheme, keyof Scheme> & IRouterBaseRoute;
            }
        }

        if (this.config.errors && ("404" in this.config.errors) && !this._error_status) {
            this._error_status = true;
            return this.resolve(this.config.errors["404"] as string, props)
        }

        throw (new WidgetException(`No route found for path: ${uri}`)).show();
    }

    parses(uri: string): IRouterBaseRoute {
        const paramList: string[] = [];
        const regexPath = uri.replace(/:(\w+)/g, (_: string, key: string) => {
            paramList.push(key);
            return '([^\\/]+)';
        });
        return {pattern: new RegExp(`^${regexPath}$`), parameters: paramList} as IRouterBaseRoute;
    }

    match(uri: string, regex: string): RegExpMatchArray | null {
        return uri.match(regex);
    }

    excavation(paramList: string[], match: RegExpMatchArray): Scheme[keyof Scheme] {
        return match.slice(1).reduce((params, value, index) => {
            params[paramList[index]] = value;
            return params;
        }, {} as Scheme[keyof Scheme]);
    }

    run(): this {
        const uri = this.uri || this.config.index.toString();
        (this.constructor as typeof ClientRouter).current = (this.constructor as typeof ClientRouter).current || this;

        window.addEventListener('popstate', () =>
            this.navigate(this.uri.trim().length > 0 ? this.uri : uri)
        )

        this.resolve(uri);
        return this;
    }

}

export function useRouter<Scheme extends IRouterBaseScheme>(config: IRouterConfig<Scheme>) {
    return (new ClientRouter<Scheme>(config))
}

export function router<Scheme extends IRouterBaseScheme>(): IRouter<Scheme> | undefined {
    return (ClientRouter.current || undefined) as (IRouter<Scheme> | undefined)
}

export function route<Scheme extends IRouterBaseScheme>(): (IRouterRoute<Scheme, keyof Scheme> & IRouterBaseRoute) | undefined {
    return (router<Scheme>()?.route || undefined) as ((IRouterRoute<Scheme, keyof Scheme> & IRouterBaseRoute) | undefined)
}