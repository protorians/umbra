import { IRuleOptions, IRuleCallable, IRuleCallablesMap, IRuleCallables } from "../types/index.js";
export declare class RulesDirectives {
    protected static _stack: IRuleCallablesMap;
    static get directives(): IRuleCallables;
    static add(alias: string, callable: IRuleCallable): typeof this;
    static get(alias: string): IRuleCallable | undefined;
    static remove(alias: string): typeof this;
    static clear(): typeof this;
}
export declare function getRules(): IRuleCallables;
export declare function getRule(alias: string): IRuleCallable | undefined;
export declare function addRule(options: IRuleOptions): typeof addRule;
export declare function removeRule(alias: string): typeof removeRule;
export declare function clearRules(): void;
