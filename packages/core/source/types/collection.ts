export type ICollectionCallbackResponse<T extends ICollectionScheme, P extends keyof T> = {
  target: T,
  prop: P,
  value: T[P]
};

// export type IPropertyGetterProps<T extends IPropertyScheme, P extends keyof T> = {
//   target: T,
//   prop: P,
//   value: T[P]
// };

export type ICollectionCallback<T extends ICollectionScheme, P extends keyof T> = (props: ICollectionCallbackResponse<T, P>) => T[P];

export type ICollectionSpecificCallback<T extends ICollectionScheme, P extends keyof T> = {
  [K in P]: ICollectionCallback<T, K>[];
};

// export type IPropertyGetter<T extends IPropertyScheme, P extends keyof T> = (props: IPropertyGetterProps<T, P>) => T[P];

export type ICollectionScheme = {
  [P: string]: object | string | number | boolean | Symbol | BigInt | null | undefined
}

export type ICollectionEachCallback<T extends ICollectionScheme> = (value: T[keyof T], key: keyof T, map: Map<keyof T, T[keyof T]>) => void

export interface ICollection<T extends ICollectionScheme> {
  get map(): Map<keyof T, T[keyof T]>;

  get scheme(): IterableIterator<[keyof T, T[keyof T]]>;

  get values(): IterableIterator<T[keyof T]>;

  get keys(): IterableIterator<keyof T>;

  get array(): ([keyof T, T[keyof T]])[];

  get string(): string;

  state: T

  effect<P extends keyof T>(key: P, callback: ICollectionCallback<T, P>): this;

  effects(callback: ICollectionCallback<T, keyof T>): this;

  transform<P extends keyof T>(key: P, callback: ICollectionCallback<T, P>): this;

  transforms(transformers: ICollectionCallback<T, keyof T>): this;

  each(callback: ICollectionEachCallback<T>): this;

  set<P extends keyof T>(name: P, value: T[P]): this;

  get<P extends keyof T>(name: P): T[P];

  exist<P extends keyof T>(key: P): boolean;

  fill(scheme: T): this;

  reset(): this;

  clear(): this;

  delete<P extends keyof T>(key: P): this;

  export(): T;
}