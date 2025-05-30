import {EventDispatcher} from "./event-dispatcher";
import type {
  INavigation,
  INavigationEmitterScheme,
  INavigationMiddlewareCallback,
  INavigationOptions,
  IEventDispatcher
} from "../types";
import {HtmlUtility, ObjectUtility, UrlUtility} from "../utilities";
import paramsObject = UrlUtility.paramsObject;
import update = ObjectUtility.update;
import ascendingPath = HtmlUtility.ascendingPath;
import urlParams = UrlUtility.urlParams;

/**
 * Système de navigation
 */
export class Navigation<Scheme> implements INavigation<Scheme> {

  options: INavigationOptions<Scheme> = {} as INavigationOptions<Scheme>

  emitter: IEventDispatcher<INavigationEmitterScheme<Scheme>> = new EventDispatcher<INavigationEmitterScheme<Scheme>>()

  #oldRoute: keyof Scheme | undefined;

  constructor() {

    this.options.middlewares = this.options.middlewares || [];

  }

  currentRouteName(): keyof Scheme {

    return (this.options.useHashtagParser ? (location.hash || '').split('?')[0] : location.pathname).substring(1) as keyof Scheme

  }

  oldRouteName(): keyof Scheme | undefined {

    return this.#oldRoute;

  }

  currentQuery<T>(): T | undefined {

    if (this.options.useHashtagParser) {

      return paramsObject<T>((location.hash || location.search || '').split('?')[1] || '');

    } else {

      return paramsObject<T>(location.search);

    }


  }

  setOption(optionName: keyof INavigationOptions<Scheme>, value: (INavigationMiddlewareCallback<Scheme>[] & boolean) | undefined): this {

    this.options[optionName] = value;

    return this;

  }

  setOptions(options: INavigationOptions<Scheme>): this {

    this.options = update<INavigationOptions<Scheme>>(this.options, options)

    this.emitter.dispatch('options', this)

    return this;

  }

  middleware(middleware: INavigationMiddlewareCallback<Scheme>): this {

    this.options.middlewares?.push(middleware)

    return this;

  }

  observe(): this {

    window.addEventListener('popstate', ev => this.dispatchNavigate(ev))

    this.capturesActions()

    return this;

  }

  capturesActions(): this {

    if (this.options.capture) {

      document.body.addEventListener('click', (ev) => {

        const target = this.parseElementCaptured(ev)


        if (target && !target.hasAttribute('navigate:no-detection')) {

          const url = target.getAttribute('href') || target.getAttribute('navigate:view') || target.getAttribute('navigate-view');

          const blank = (target.getAttribute('target') || '').toLowerCase() == '_blank';

          const external = url ? this.isExternalURL(url) : false;


          if (url && !blank && !external) {

            ev.preventDefault();

            this.navigate(this.parseRouteName(url) as keyof Scheme, {} as Scheme[keyof Scheme], ev)

          }


        }

      }, false)

    }

    return this;

  }

  parseRouteName(routeName: string) {

    const route = routeName.trim();

    const firstChar = route.substring(0, 1);

    return (firstChar == '/' || firstChar == '#') ? route.substring(1) : route;

  }

  isExternalURL(url: string) {

    return !!(url.match(/^http/gi) || url.match(/^\/\//gi));

  }

  parseElementCaptured(ev: Event) {

    if (ev.target instanceof HTMLElement) {

      if (ev.target.hasAttribute('navigate:view') || ev.target.tagName == "A") {

        return ev.target;

      } else {

        return ascendingPath<HTMLElement>(ev.target as HTMLElement, parent =>

          parent.tagName == 'A' || parent.hasAttribute('navigate:view')
        )

      }

    }

    return undefined

  }

  dispatchNavigate(ev ?: Event | undefined): this {

    const routeName = this.currentRouteName();

    const parser = this.options.useHashtagParser ? 'hashtag' : 'directory';


    this.options.middlewares?.forEach(middleware => middleware({

      navigation: this,

      event: ev,

      routeName: this.currentRouteName(),

      props: this.currentQuery() || undefined,

      parser: this.options.useHashtagParser ? 'hashtag' : 'directory',

    }))

    this.emitter.dispatch('navigate', {

      navigation: this,

      routeName,

      parser: parser,

    })

    this.#oldRoute = routeName as keyof Scheme;

    return this;

  }

  navigate(route: keyof Scheme, props ?: (Scheme[ keyof Scheme ]), ev?: Event): this {

    if (!route) {
      return this;
    }

    const currentRoute = this.currentRouteName();

    const routeName = route as string;

    const hasProps = Object.keys(props || {}).length;

    const query = hasProps ? `?${urlParams(props || {})}` : '';


    if (currentRoute != routeName) {

      if (this.options.useHashtagParser) {

        location.hash = `${routeName}${query}`;

      } else {

        history.pushState(props || {}, document.title, `${routeName}${query}`);

        this.dispatchNavigate(ev || undefined);

      }

    } else {
      this.dispatchNavigate(ev || undefined);
    }

    return this;

  }

}
