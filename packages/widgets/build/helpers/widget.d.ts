import { IAttributes, IStyleDeclaration, IWidgetNode } from "../types/index.js";
import { AligningProperty } from "../enums.js";
export declare function widgetAligningDirectionFeature<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>): Partial<IStyleDeclaration>;
export declare function widgetAligningFeature<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>, properties: AligningProperty[]): Partial<IStyleDeclaration>;
