import { IAnimetricSlimOptions } from "@protorians/animetric";
import { IAnimation } from "../types/index.js";
export declare class SlideAnimation implements IAnimation {
    entry(duration?: number): IAnimetricSlimOptions;
    exit(duration?: number): IAnimetricSlimOptions;
}
