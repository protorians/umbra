import type {IChildren, IChildrenSupported} from "./types/index.js";
import {Directives, IDirectives} from "@protorians/core"


export enum WidgetDirectivesType {
    EngineContent = 'widget.engine.content',
}

export const WidgetDirectives: IDirectives<IChildren<IChildrenSupported>> = new Directives<IChildren<IChildrenSupported>>();
