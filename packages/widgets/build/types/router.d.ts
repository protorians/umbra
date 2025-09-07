import type { IViewConstructor } from "./view.js";
import { ViewWidget } from "../view.js";
import { ISignalStack } from "@protorians/core";
export type IRouterConfigErrors<Scheme extends IRouterBaseScheme> = {
    400?: keyof Scheme;
    401?: keyof Scheme;
    403?: keyof Scheme;
    404?: keyof Scheme;
    405?: keyof Scheme;
    500?: keyof Scheme;
    502?: keyof Scheme;
    503?: keyof Scheme;
    504?: keyof Scheme;
};
export type IRouterConfig<Scheme extends IRouterBaseScheme> = {
    useHash?: boolean;
    baseUrl?: string;
    index: keyof Scheme;
    errors?: IRouterConfigErrors<Scheme>;
};
export type IRouteView = IViewConstructor;
export type IRouterRoute<Scheme extends IRouterBaseScheme, K extends keyof Scheme> = {
    path: K;
    view: typeof ViewWidget;
};
export type IRouterBaseRoute = {
    parameters: string[];
    pattern: RegExp;
};
export interface IRouterBaseScheme {
    [K: string]: Object;
}
export type IRouterScheme<Scheme extends IRouterBaseScheme> = {
    [K in keyof Scheme]: IRouterRoute<Scheme, K> & IRouterBaseRoute;
};
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
};
export type IRouterSignalMap<Scheme extends IRouterBaseScheme> = {
    navigate: IRouteNavigateSignal<Scheme>;
};
