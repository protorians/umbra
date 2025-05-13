import type {IAttributes, IEngine, IEngineConstructor, IEngineMap, IWidgetNode} from "./types/index.js";
import {Manticore} from "./engine/index.js";

export class Widgets {

  /**
   * Represents the server engine's constructor implementation.
   *
   * This variable holds a reference to the engine constructor that is used
   * to initialize and configure the server-side logic for the application.
   * It is an optional variable and may not be defined initially.
   *
   * The type `IEngineConstructor<any, any>` indicates that this is a
   * generic engine constructor allowing flexibility in the types of
   * parameters and return values it can handle.
   */
  static ServerEngine?: IEngineConstructor<any, any> = undefined;

  /**
   * An optional variable representing the client-side engine constructor.
   * This variable may be assigned a specific implementation of the engine
   * following the `IEngineConstructor` interface. It allows the customization
   * or initialization of an engine instance for client operations.
   *
   * @type {IEngineConstructor<any, any> | undefined}
   */
  static ClientEngine?: IEngineConstructor<any, any> = undefined;

  /**
   * Represents an engine map for creating server-side and client-side widget engines.
   * Provides methods to initialize and return an appropriate engine instance
   * based on the runtime environment and widget configuration.
   *
   * @property {Function} server - A method to create a server-side engine instance.
   *   Accepts a widget node and returns an engine instance, choosing either
   *   `Widgets.ServerEngine` or `Manticore` as the implementation based on availability.
   * @property {Function} client - A method to create a client-side engine instance.
   *   Accepts a widget node and returns an engine instance, choosing either
   *   `Widgets.ClientEngine` or `Manticore` as the implementation based on availability.
   */
  static Engine: IEngineMap = {
    server<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>): IEngine<E, A> {
      return (typeof Widgets.ServerEngine !== 'undefined') ? new Widgets.ServerEngine(widget) : new Manticore(widget)
    },
    client<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>): IEngine<E, A> {
      return (typeof Widgets.ClientEngine !== 'undefined') ? new Widgets.ClientEngine(widget) : (new Manticore(widget))
    },
  }
}
