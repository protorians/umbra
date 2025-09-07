import type { INavigationMiddlewareCallback } from "../types/index.js";
import { Navigation } from "../supports/index.js";
export declare function createNavigation<Scheme>(middleware?: INavigationMiddlewareCallback<Scheme>): Navigation<Scheme>;
