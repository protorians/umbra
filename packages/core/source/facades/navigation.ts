import type {INavigationMiddlewareCallback} from "../types";
import {Navigation} from "../supports";

export function createNavigation<Scheme>(middleware?: INavigationMiddlewareCallback<Scheme>) {
  const navigation = (new Navigation<Scheme>());
  return middleware ? navigation.middleware(middleware) : navigation;
}