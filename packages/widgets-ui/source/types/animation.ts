import {IAnimetricSlimOptions} from "@protorians/animetric";

export interface IAnimation {

    entry(duration?: number): IAnimetricSlimOptions;

    exit(duration?: number): IAnimetricSlimOptions;

}