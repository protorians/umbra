import type {
  IAttributes,
  ICallable, ICapabilities, ICapabilitiesMap, ICapabilitiesScheme,
  ICapability,
  IWidgetNode,
} from "./types/index.js";
import {WidgetException} from "./errors/index.js";


export class Capability<E extends HTMLElement, A extends IAttributes, Payload> implements ICapability<E, A, Payload> {

  protected target: IWidgetNode<E, A> | undefined

  constructor(
    public readonly name: string,
    public readonly callable: ICallable<E, A, Payload>,
  ) {
  }

  on(widget: IWidgetNode<E, A>) {
    this.target = widget
    return this;
  }

  make<T>(payload: Payload,): T | void {
    if (this.target && this.target.context && this.target.context.root) {
      return this.callable({
        root: this.target.context.root,
        widget: this.target,
        payload
      })
    }
  }

}

export function createCapability<E extends HTMLElement, A extends IAttributes, Payload>(
  name: string,
  callable: ICallable<E, A, Payload>
): ICapability<E, A, Payload> {
  return new Capability(name, callable);
}



export class Capabilities<C> implements ICapabilities<C> {

  protected _scheme: Partial<ICapabilitiesMap<C>> = {} as Partial<ICapabilitiesMap<C>>;

  get scheme(): Partial<ICapabilitiesMap<C>> {
    return this._scheme;
  }

  attach<K extends keyof C>(capability: ICapability<any, any, C[K]>): this {
    const name = capability.name as keyof C;
    if (typeof this._scheme[name] !== 'undefined') {
      throw (new WidgetException(`This capability is already attached`)).show()
    }
    this._scheme[name] = capability;
    return this;
  }

  override<K extends keyof C>(capability: ICapability<any, any, C[K]>): this {
    const name = capability.name as keyof C;
    this._scheme[name] = capability;
    return this;
  }

  detach(name: keyof C): this {
    if (typeof this._scheme[name] === 'undefined') {
      throw (new WidgetException(`This capability is not attached`)).show()
    }
    this._scheme[name] = undefined;
    return this;
  }

  capability<K extends keyof C>(name: K): ICapability<any, any, C[K]> | undefined {
    return (this._scheme[name] || undefined);
  }

  has(name: keyof C): boolean {
    return typeof this._scheme[name] !== 'undefined'
  }

}

export function createCapabilities<C extends ICapabilitiesScheme>() {
  return new Capabilities<C>;
}
