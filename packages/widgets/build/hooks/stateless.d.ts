import { IAttributes, IComposite, IStatelessProps, IWidgetNode } from "../types/index.js";
export declare function useStateless<Props extends Record<string, any>, E extends HTMLElement, A extends IAttributes>(composite: IComposite<IStatelessProps<Props>>, dependencies: Props): IWidgetNode<E, A>;
