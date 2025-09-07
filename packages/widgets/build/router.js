import { WidgetException } from "./errors/index.js";
import { Signal } from "@protorians/core";
export class ClientRouter {
    config;
    static current;
    _route;
    _routes = {};
    _error_status = false;
    signal;
    constructor(config) {
        this.config = config;
        this.signal = new Signal.Stack;
    }
    get route() {
        return this._route;
    }
    get url() {
        return new URL(location.href);
    }
    get uri() {
        return this.config.useHash ? this.url.hash.substring(1) : (this.url.pathname == '/' ? '' : this.url.pathname);
    }
    get host() {
        return this.url.host;
    }
    get port() {
        return this.url.port;
    }
    get protocol() {
        return this.url.protocol;
    }
    get secured() {
        return this.url.protocol == 'https';
    }
    get routes() {
        return this._routes;
    }
    query() {
        const accumulate = {};
        const params = new URLSearchParams((new URL(this.url)).search);
        params.forEach((value, key) => accumulate[key] = value);
        return accumulate;
    }
    use(route) {
        this._routes[route.path] = { path: route.path, ...this.parses(route.path.toString()) };
        this._routes[route.path].view = route.view;
        return this;
    }
    navigate(to, props) {
        return this.open(to, props);
    }
    open(to, props) {
        props = props || {};
        const hasQuery = Object.keys(props).length;
        const searchQuery = new URLSearchParams(props);
        const url = `${window.location.origin}${this.config.useHash === true
            ? `${window.location.pathname}#`
            : `${this.config.baseUrl || ''}`}${to.toString()}${hasQuery ? `?${searchQuery.toString()}` : ``}`;
        window.history.pushState(props || {}, url, `${url}`);
        this.resolve(to.toString(), props);
        return this;
    }
    resolve(uri, props) {
        uri = uri.split('?')[0];
        for (const route of Object.values(this.routes)) {
            const match = this.match(uri, route.pattern);
            if (match) {
                this._error_status = false;
                const params = this.excavation(route.parameters, match);
                this._route = route;
                props = props || {};
                this.signal.dispatch('navigate', {
                    route: route,
                    params: params,
                    props,
                });
                return route;
            }
        }
        if (this.config.errors && ("404" in this.config.errors) && !this._error_status) {
            this._error_status = true;
            return this.resolve(this.config.errors["404"], props);
        }
        throw (new WidgetException(`No route found for path: ${uri}`)).show();
    }
    parses(uri) {
        const paramList = [];
        const regexPath = uri.replace(/:(\w+)/g, (_, key) => {
            paramList.push(key);
            return '([^\\/]+)';
        });
        return { pattern: new RegExp(`^${regexPath}$`), parameters: paramList };
    }
    match(uri, regex) {
        return uri.match(regex);
    }
    excavation(paramList, match) {
        return match.slice(1).reduce((params, value, index) => {
            params[paramList[index]] = value;
            return params;
        }, {});
    }
    run() {
        const uri = this.uri || this.config.index.toString();
        this.constructor.current = this.constructor.current || this;
        window.addEventListener('popstate', () => this.navigate(this.uri.trim().length > 0 ? this.uri : uri));
        this.resolve(uri);
        return this;
    }
}
export function useRouter(config) {
    return (new ClientRouter(config));
}
export function router() {
    return (ClientRouter.current || undefined);
}
export function route() {
    return (router()?.route || undefined);
}
