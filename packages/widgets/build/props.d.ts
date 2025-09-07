import type { IPropStack, IWidgetNode } from "./types/index.js";
export declare function propsValue(data: any): any;
export declare function extractProps<P extends IPropStack>(provider: IWidgetNode<any, any> | HTMLElement): P;
