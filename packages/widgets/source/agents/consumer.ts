import type {IConsumerAgent, IProviderCallable} from "../types/index.js";

export class ConsumerAgent implements IConsumerAgent {

  constructor(
    public readonly name: string,
    public readonly callback: IProviderCallable,
  ) {
  }

}