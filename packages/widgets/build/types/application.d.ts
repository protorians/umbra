import { IRouter, IRouterBaseScheme } from "./router.js";
export type IApplicationConfig<RouterScheme extends IRouterBaseScheme> = {
    alias: string;
    router: IRouter<RouterScheme>;
    icon?: string;
    name?: string;
    title?: string;
};
export interface IApplication<RouterScheme extends IRouterBaseScheme> {
    readonly config: IApplicationConfig<RouterScheme>;
}
