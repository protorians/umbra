import type {IChildren, IChildrenSupported} from "./types/index.js";
import {Directive} from "@protorians/core"

export const WidgetDirectives = new Directive<IChildren<IChildrenSupported>>();