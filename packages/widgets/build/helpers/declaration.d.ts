import type { IWidgetDeclaration, IWidgetDeclarationExploded } from "../types/index.js";
export declare function declarationExplodes<D extends IWidgetDeclaration<any, any>, T>(props: D, targetKeys: (keyof T)[]): IWidgetDeclarationExploded<D, T>;
