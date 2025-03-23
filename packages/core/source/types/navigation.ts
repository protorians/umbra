import type {IProps} from "./value";
import type {IEventDispatcher} from "./event";


export type INavigationNavigateParser = 'hashtag' | 'directory'

export type INavigationNavigateProps<Scheme> = {

  navigation: INavigation<Scheme>;

  routeName: keyof Scheme;

  parser: INavigationNavigateParser;

}

export type INavigationMiddlewareProps<Scheme> = {

  navigation: INavigation<Scheme>;

  event: Event | undefined;

  parser: INavigationNavigateParser;

  routeName: keyof Scheme;

  props: Scheme[keyof Scheme] | IProps | undefined;

}

export type INavigationMiddlewareCallback<Scheme> = (
  payload: INavigationMiddlewareProps<Scheme>
) => void;


export type INavigationOptions<Scheme> = {

  useHashtagParser?: boolean;

  capture?: boolean;

  middlewares?: INavigationMiddlewareCallback<Scheme>[]

}


export interface INavigationEmitterScheme<Scheme> {

  options: INavigation<Scheme>;

  navigate: INavigationNavigateProps<Scheme>;

}


export interface INavigation<Scheme> {

  emitter: IEventDispatcher<INavigationEmitterScheme<Scheme>>

  options: INavigationOptions<Scheme>;

  setOptions(options: INavigationOptions<Scheme>): this;

  setOption(optionName: keyof INavigationOptions<Scheme>, value: (INavigationMiddlewareCallback<Scheme>[] & boolean) | undefined): this;

  middleware(middleware: INavigationMiddlewareCallback<Scheme>): this;

  dispatchNavigate(ev?: PopStateEvent | undefined): this;

  capturesActions(): this;

  isExternalURL(url: string): boolean;

  parseElementCaptured(event: Event): HTMLElement | undefined;

  currentRouteName(): keyof Scheme;

  oldRouteName(): keyof Scheme | undefined;

  currentQuery<T>(): T | undefined;

  observe(): this;

  navigate(
    route: keyof Scheme,
    props?: Scheme[keyof Scheme],
    ev?: PopStateEvent
  ): this;

}
