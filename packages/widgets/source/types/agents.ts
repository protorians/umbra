import type {IStringObject} from "./objects.js";


export type IProviderCallable = (provider: IProviderAgent, id?: string) => void;

export interface IConsumerAgent {

    readonly name: string;

    readonly callback: IProviderCallable;

}


export interface IProviderAgent {

    get blocks(): string[];

    get declarations(): IStringObject;

    get scopes(): string[];

    searchBlocks(name: string, source: string): this;

    searchDeclarations(): this;

    searchScopes(source: string): this;

    search(name: string, source: string): this;

}