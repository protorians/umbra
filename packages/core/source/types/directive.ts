export type IDirectives<I> = Map<string, IDirective<I>>;

export type IDirectivesCollection<I> = Record<string, IDirective<I>>;

export type IDirective<I> = (entry: I) => I;