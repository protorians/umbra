import {ViewWidget} from "@protorians/widgets"

export type IModularSource = {
    readonly default: (...args: any[]) => any
}

export type IModularView = {
    readonly default: typeof ViewWidget
}