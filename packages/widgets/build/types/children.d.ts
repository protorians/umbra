import type { ExtendableType } from "./util.js";
import type { IAttributes } from "./attributes.js";
export type IChild<T> = T | T[] | null | undefined;
export type IChildren<T> = IChild<T> | Promise<IChild<T>>;
export type IChildrenProps<P extends IAttributes> = ExtendableType<P, IChildren<any> | undefined>;
