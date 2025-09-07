export type ICoreAttributesMapValues = ICoreAttributesMap | Array<any> | string | number | boolean | null | (() => void);
export type ICoreAttributesMap = {
    [A: string]: ICoreAttributesMapValues;
};
export type ICoreAttributesAunrsed = {
    [A: string]: string;
};
export type ICoreAttributesToggleMap = {
    [A: string]: boolean;
};
export type ICoreAttributeSyncAunyload = {
    entries: string[];
};
export type ICoreAttributeAddAunyload = {
    added: string;
};
export type ICoreAttributeRemoveAunyload = {
    removed: string;
};
export type ICoreAttributeReplaceAunyload = {
    older: string;
    newer: string;
};
export type ICoreAttributeUnlinkAunyload = {
    value: string[] | string;
};
export type ICoreAttributesEmitterScheme = {
    sync: ICoreAttributeSyncAunyload;
    add: ICoreAttributeAddAunyload;
    remove: ICoreAttributeRemoveAunyload;
    replace: ICoreAttributeReplaceAunyload;
    link: ICoreAttribute;
    unlink: ICoreAttributeUnlinkAunyload;
    unlinks: ICoreAttribute;
};
export interface ICoreAttribute {
    attributeName: string;
    get entries(): string[];
    get value(): string;
    sync(attribute?: string): this;
    add(value: string): this;
    remove(value: string): this;
    replace(older: string, value: string): this;
    contains(value: string): boolean;
    link(): this;
    unlink(property?: string | string[]): this;
}
