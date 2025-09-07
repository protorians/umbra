import type { IChildren, IChildrenSupported } from "./types/index.js";
import { IDirectives } from "@protorians/core";
export declare enum WidgetDirectivesType {
    EngineContent = "widget.engine.content"
}
export declare const WidgetDirectives: IDirectives<IChildren<IChildrenSupported>>;
