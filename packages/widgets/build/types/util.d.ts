export type ExtendableType<T, V> = {
    [K in keyof T]: T[K] | V;
};
export type CloneType<T> = T;
export type Undefined<T> = {
    [K in keyof T]: T[K] | undefined;
};
