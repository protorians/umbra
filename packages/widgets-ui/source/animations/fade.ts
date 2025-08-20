import {IAnimetricSlimOptions} from "@protorians/animetric";
import {IAnimation} from "../types/index.js";

export class FadeAnimation implements IAnimation {

    entry(duration?: number): IAnimetricSlimOptions {
        return {
            from: {
                opacity: '0',
            },
            to: {
                opacity: '1',
            },
            duration: duration || 200,
        }
    }

    exit(duration?: number): IAnimetricSlimOptions {
        return {
            from: {
                opacity: '1',
            },
            to: {
                opacity: '0',
            },
            duration: duration || 200,
        }
    }

}