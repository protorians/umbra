export type ISchemeChildren = ISchemeChild[]

export type ISchemeTypeMap = {
  "string": string,
  "number": number,
  "bigint": bigint,
  "boolean": boolean,
  "object": object,
  "symbol": symbol,
  "function": Function,
  "null": null,
  "undefined": undefined,
};

export type ISchemeType = ISchemeTypeMap[keyof ISchemeTypeMap];

export type ISchemeRequired = boolean;

export type ISchemeScore = number;

export type ISchemeCharLength = number;

export interface ISchemeProps {
  type: ISchemeType;
  required?: ISchemeRequired;
  score?: ISchemeScore;
  children?: ISchemeChildren;
  min?: ISchemeCharLength;
  max?: ISchemeCharLength;
}

export type ISchemeError = {
  type: keyof ISchemeProps;
  message: string;
}

export interface ISchemeChild {
  get structure(): ISchemeProps;

  get errors(): ISchemeError[];

  get getFirstError(): ISchemeError | undefined;

  get getLastError(): ISchemeError | undefined;

  type(value: ISchemeType): this;

  required(value: boolean): this;

  score(value: number): this;

  children(value: ISchemeChildren): this;

  min(value: ISchemeCharLength): this;

  max(value: ISchemeCharLength): this;

  validate(input: ISchemeType): boolean;
}
