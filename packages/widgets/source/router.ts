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


export class ClientRouter<Scheme extends IRouterBaseScheme> implements IRouter<Scheme> {

    static current: IRouter<any> | undefined;

    protected _route: (IRouterRoute<any, keyof any> & IRouterBaseRoute) | undefined;

    protected _routes: IRouterScheme<Scheme> = {} as IRouterScheme<Scheme>;

    protected _error_status: boolean = false;

    signal: ISignalStack<IRouterSignalMap<Scheme>>;

    constructor(
        public readonly config: IRouterConfig<Scheme>
    ) {
        this.signal = new Signal.Stack<IRouterSignalMap<Scheme>>;
    }

    get route(): (IRouterRoute<any, keyof any> & IRouterBaseRoute) | undefined {
        return this._route;
    }

    get url(): URL {
        return new URL(location.href);
    }

    get uri(): string {
        return this.config.useHash ? this.url.hash.substring(1) : (
            this.url.pathname == '/' ? '' : this.url.pathname
        );
    }

    //
    // currentUri(){
    //   return this.config.useHash ?
    // }
    //
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
                })

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