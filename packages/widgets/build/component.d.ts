import type { IComponentCallable, IComponentConstruct, IPropStack, IStateStack } from "./types/index.js";
import { ISpectraElement } from "@protorians/spectra";
export type IComponentInstances = {
    [key: string]: typeof HTMLElement;
};
export declare class Components {
    static instances: IComponentInstances;
}
export declare function Component(identifier: string, callable: IComponentCallable): typeof HTMLElement | ISpectraElement | undefined;
export declare function Mount<P extends IPropStack, S extends IStateStack>(identifier: string, construct: IComponentConstruct<P, S>): ISpectraElement | {
    new (): HTMLElement;
    prototype: HTMLElement;
} | undefined;
