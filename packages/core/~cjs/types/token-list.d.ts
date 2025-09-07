export interface ITokenList<T> {
    get value(): T;
    get length(): number;
    toString(): string;
    add(...tokens: T[]): this;
    contains(token: T): boolean;
    item(index: number): (T | null);
    remove(...tokens: T[]): this;
    replace(token: T, newToken: T): boolean;
    supports(token: T): boolean;
    toggle(token: T, force?: boolean): boolean;
    forEach(callback: (value: T, key: number, parent: ITokenList<T>) => void, thisArg?: any): this;
    [K: number]: T;
}
