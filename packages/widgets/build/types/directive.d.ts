import type { IEngine } from "./engine.js";
import type { IAttributes } from "./attributes.js";
import type { IWidgetNode } from "./widget.js";
export interface IWidgetDirectiveContent<E extends HTMLElement, A extends IAttributes> {
    engine: IEngine<E, A>;
    widget: IWidgetNode<E, A>;
}
