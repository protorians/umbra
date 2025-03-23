import {IRouter, IRouterBaseScheme} from "./router.js";

export type IApplicationConfig<RouterScheme extends IRouterBaseScheme> = {
    /**
     * Application Composite target alias name
     */
    alias: string;

    /**
     * Application Router
     */
    router: IRouter<RouterScheme>;

    /**
     * Application router
     */
    icon?: string;

    /**
     * Application name identifier
     */
    name?: string;

    /**
     * Application title
     */
    title?: string;
}

export interface IApplication<RouterScheme extends IRouterBaseScheme> {
    readonly config: IApplicationConfig<RouterScheme>;
}
