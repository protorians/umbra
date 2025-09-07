export type IElementTarget = HTMLElement | null;
export type IObjectData = {
    [K: string]: IDataValue;
};
export type IDataValue = string | number | boolean | object;
export type IObjectToString = {
    eq?: string | undefined;
    start?: string | undefined;
    end?: string | undefined;
    joiner?: string | undefined;
};
export type IProp = any;
export interface IProps {
    [P: string]: IProp;
}
