import type { IStringObject, IProviderAgent } from "../types/index.js";
export declare class ProviderAgent implements IProviderAgent {
    protected _declarations: IStringObject;
    protected _scopes: string[];
    protected _blocks: string[];
    get blocks(): string[];
    get declarations(): IStringObject;
    get scopes(): string[];
    searchBlocks(names: string, source: string): this;
    searchDeclarations(): this;
    searchScopes(source: string): this;
    search(name: string, source: string): this;
}
