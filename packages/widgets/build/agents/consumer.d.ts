import type { IConsumerAgent, IProviderCallable } from "../types/index.js";
export declare class ConsumerAgent implements IConsumerAgent {
    readonly name: string;
    readonly callback: IProviderCallable;
    constructor(name: string, callback: IProviderCallable);
}
