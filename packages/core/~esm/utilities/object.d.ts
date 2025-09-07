import type { ICoreAttributesMap, ICoreAttributesMapValues, IObjectToString, IQuadrilateral, QuadrilateralArray } from "../types/index.js";
export declare namespace ObjectUtility {
    function purge<T extends (Object | Array<any>)>(obj: T): T;
    function update<T>(original: T, newer?: Partial<T> | undefined): T;
    function attributesValues(value: ICoreAttributesMapValues): string | number | boolean | (() => void) | null;
    function attributes<T extends ICoreAttributesMap>(attributes: ICoreAttributesMap, ns?: string | undefined, separator?: string | undefined): T;
    function toString(payload: object, c?: IObjectToString): string;
    function clear<T extends Object>(target: T): T;
    function syncObjectArray<T extends Object, P>(target: T, provider: P[]): T;
    function quadrilateral<T>(provider: QuadrilateralArray<T>[]): IQuadrilateral<QuadrilateralArray<T>>;
    function toNested<T>(obj: T, nestedPath: string): any;
    function unWrap<T>(input: any): T[];
    function randomWithin<T>(provider: T[]): T | undefined;
    function clone<T>(target: T): T;
    function omit<T>(target: T, keys: (string | number)[]): T;
    function previous<T>(array: T[], from?: T, loop?: boolean): T | null;
    function next<T>(array: T[], from?: T, loop?: boolean): T | null;
    function refactor<T>(array: T[], from: number, to?: number): T[];
}
