import type {IAttributes, IEngine, IEngineConstructor, IEngineMap, IWidgetNode} from "./types/index.js";
import {Manticore} from "./engine/index.js";

export class Widgets {

  static ServerEngine?: IEngineConstructor<any, any> = undefined;
  static ClientEngine?: IEngineConstructor<any, any> = undefined;
  static Engine: IEngineMap = {
    server<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>): IEngine<E, A> {
      return (typeof Widgets.ServerEngine !== 'undefined') ? new Widgets.ServerEngine(widget) : new Manticore(widget)
    },
    client<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>): IEngine<E, A> {
      return (typeof Widgets.ClientEngine !== 'undefined') ? new Widgets.ClientEngine(widget) : (new Manticore(widget))
    },
  }
}
