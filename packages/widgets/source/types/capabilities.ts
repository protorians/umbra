import type {ICapability} from "./capability.js";

export type ICapabilitiesScheme = {
  [K: string]: any
}

export type ICapabilitiesMap<C> = {
  [K in keyof C]: ICapability<any, any, any>
}

export interface ICapabilities<C> {

  get scheme(): Partial<ICapabilitiesMap<C>>;

  attach<K extends keyof C>(capability: ICapability<any, any, C[K]>): this;

  override<K extends keyof C>(capability: ICapability<any, any, C[K]>): this;

  detach(name: keyof C): this;

  capability<K extends keyof C>(name: K): ICapability<any, any, C[K]> | undefined;

  has(name: keyof C): boolean;
}