import type { IEngineConstructor, IEngineMap } from "./types/index.js";
export declare class Widgets {
    static ServerEngine?: IEngineConstructor<any, any>;
    static ClientEngine?: IEngineConstructor<any, any>;
    static Engine: IEngineMap;
}
