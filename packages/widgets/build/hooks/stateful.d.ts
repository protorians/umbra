import type { IAttributes, IComposite, IState, IWidgetNode } from "../types/index.js";
export declare function useStateful<Props extends Record<string, IState<any>>, E extends HTMLElement, A extends IAttributes>(composite: IComposite<Props>, dependencies: Props): IWidgetNode<E, A>;
