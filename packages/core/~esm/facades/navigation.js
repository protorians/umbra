import { Navigation } from "../supports/index.js";
export function createNavigation(middleware) {
    const navigation = (new Navigation());
    return middleware ? navigation.middleware(middleware) : navigation;
}
