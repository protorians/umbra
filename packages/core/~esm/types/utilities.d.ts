export type PartialWithout<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;
