import type { IApplication, IApplicationConfig, IRouterBaseScheme, IWidgetNode } from "./types/index.js";
export declare class ApplicationStyle {
    static main: {
        display: string;
        width: string;
        height: string;
        flexDirection: string;
    };
    static content: {
        flex: string;
        display: string;
        flexDirection: string;
        justifyContent: string;
        alignItems: string;
        gap: number;
        width: string;
        height: string;
    };
}
export declare class Applications {
    protected static _entries: {};
}
export declare class Application<RouterScheme extends IRouterBaseScheme> implements IApplication<RouterScheme> {
    readonly config: IApplicationConfig<RouterScheme>;
    protected main: IWidgetNode<any, any>;
    constructor(config: IApplicationConfig<RouterScheme>);
    run(): this;
}
export declare function createApplication<RouterScheme extends IRouterBaseScheme>(config: IApplicationConfig<RouterScheme>): Application<RouterScheme>;
