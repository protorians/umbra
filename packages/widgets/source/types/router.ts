import type {IViewConstructor} from "./view.js";
import {ViewWidget} from "../view.js";
import {ISignalStack} from "@protorians/core";


/**
 * Errors path configuration
 */
export type IRouterConfigErrors<Scheme extends IRouterBaseScheme> = {

    /**
     * Bad Request
     */
    400?: keyof Scheme;

    /**
     * 401 Unauthorized
     */
    401?: keyof Scheme;

    /**
     * 403 Forbidden
     */
    403?: keyof Scheme;

    /**
     * 404 Not Found
     */
    404?: keyof Scheme;

    /**
     * 405 Method Not Allowed
     */
    405?: keyof Scheme;

    /**
     * 500 Internal Server Error
     */
    500?: keyof Scheme;

    /**
     * 502 Bad Gateway
     */
    502?: keyof Scheme;

    /**
     * 503 Service Unavailable
     */
    503?: keyof Scheme;

    /**
     * 504 Gateway Timeout
     */
    504?: keyof Scheme;
};

/**
 * Router Configuration
 */
export type IRouterConfig<Scheme extends IRouterBaseScheme> = {

    /**
     * Use hashtag or not in application URL
     */
    useHash?: boolean;

    /**
     * Base URL
     */
    baseUrl?: string;

    /**
     * Index view fallback
     */
    index: keyof Scheme;

    /**
     * Error views
     */
    errors?: IRouterConfigErrors<Scheme>
}


export type IRouteView = IViewConstructor

export type IRouterRoute<Scheme extends IRouterBaseScheme, K extends keyof Scheme> = {
    path: K;
    view: typeof ViewWidget;
    // options?: IViewOptions<Scheme[K]>
}

export type IRouterBaseRoute = {
    // method?: HttpMethod;
    parameters: string[];
    pattern: RegExp;
}

export interface IRouterBaseScheme {
    [K: string]: Object;
}

export type IRouterScheme<Scheme extends IRouterBaseScheme> = {
    [K in keyof Scheme]: IRouterRoute<Scheme, K> & IRouterBaseRoute
}

export interface IRouter<Scheme extends IRouterBaseScheme> {
    readonly config: IRouterConfig<Scheme>;

    signal: ISignalStack<IRouterSignalMap<Scheme>>;

    get routes(): IRouterScheme<Scheme>;

    get route(): (IRouterRoute<any, keyof any> & IRouterBaseRoute) | undefined;

    get url(): URL;

    get uri(): string;

    get host(): string;

    get port(): string;

    get protocol(): string;

    get secured(): boolean;

    query<K extends keyof Scheme>(): Scheme[K];

    use<K extends keyof Scheme>(route: IRouterRoute<Scheme, K>): this;

    navigate(to: string, props?: Scheme[keyof Scheme]): this;

    open<K extends keyof Scheme>(to: K, props?: Scheme[K]): this;

    resolve<K extends keyof Scheme>(uri: string, props: Scheme[K]): IRouterRoute<Scheme, keyof Scheme> & IRouterBaseRoute;

    parses(uri: string): IRouterBaseRoute;

    match(uri: string, regex: string): RegExpMatchArray | null;

    excavation(paramList: string[], match: RegExpMatchArray): Scheme[keyof Scheme];

    run(): this;
}


export type IRouteNavigateSignal<Scheme extends IRouterBaseScheme> = {
    params: Scheme[keyof Scheme];
    route: IRouterRoute<Scheme, keyof Scheme> & IRouterBaseRoute;
    props: Scheme[keyof Scheme];
}

export type IRouterSignalMap<Scheme extends IRouterBaseScheme> = {
    navigate: IRouteNavigateSignal<Scheme>;
}