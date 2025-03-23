import {
  ISchemeCharLength,
  ISchemeChild,
  ISchemeChildren,
  ISchemeError,
  ISchemeProps,
  ISchemeScore,
  ISchemeType
} from "../types";


export class SchemeChild implements ISchemeChild {
  protected _structure: ISchemeProps;
  protected _score: ISchemeScore = 0;
  protected _errors: ISchemeError[] = [];

  constructor() {
    this._structure = {type: undefined} as ISchemeProps;
  }

  protected upScore(): this {
    this._score++;
    return this;
  }

  protected downScore(): this {
    this._score--;
    return this;
  }

  get structure(): ISchemeProps {
    return this._structure;
  }

  get errors(): ISchemeError[] {
    return this._errors;
  }

  get getFirstError(): ISchemeError | undefined {
    return this._errors[0] || undefined;
  }

  get getLastError(): ISchemeError | undefined {
    return this._errors[this._errors.length - 1] || undefined;
  }

  type(value: ISchemeType): this {
    this._structure.type = value;
    return this;
  }

  required(value: boolean): this {
    this._structure.required = value;
    return this;
  }

  score(value: number): this {
    this._structure.score = value;
    return this;
  }

  children(value: ISchemeChildren): this {
    this._structure.children = value;
    return this;
  }

  min(value: ISchemeCharLength): this {
    this._structure.min = value;
    return this;
  }

  max(value: ISchemeCharLength): this {
    this._structure.max = value;
    return this;
  }

  validate(input: ISchemeType): boolean {
    const type = typeof this._structure.type;

    console.log('> scheme', this._structure.type);
    console.log('> type', type);
    console.log('> input', input);

    /**
     * Validate Type
     */
    if (type !== typeof input) {
      if (this._structure.required) this._errors.push({type: 'type', message: 'type not match'});
      return !this._structure.required;
    }
    this.upScore();


    /**
     * Validate Boolean type
     */
    if (type === 'boolean') {
      if (this._structure.required) {
        if (this._structure.type === input) {
          this.upScore();
          return true;
        } else return false;
      }
      return true;
    }

    /**
     * Validate Character length if string
     */
    if (type === "string" && typeof input === "string") {
      const length = input.length;
      const cast = `${this._structure.type as string}`
      let minLength = this._structure.min;

      if (cast.length !== this._structure.min) {
        minLength = cast.length
        this._structure.min = cast.length;
      }

      if (minLength && this._structure.min > length) {
        this._errors.push({type: 'min', message: 'type not match'});
        return false;
      }
      this.upScore();

      if (typeof this._structure.max === "number" && this._structure.max < length) {
        this._errors.push({type: 'max', message: 'type not match'});
        return false;
      }
      this.upScore();
    }

    /**
     * Validate symbol
     */
    if (type === 'symbol') {
      this.upScore();
      return true;
    }

    /**
     * Validate array
     */
    if (type === 'object' && Array.isArray(input)) {
      this.upScore();
      return true;
    }

    /**
     * Validate Children if object
     */
    if (type === "object" && typeof input === "object" && this._structure.children && typeof this._structure.children === 'object') {
      const entries = Object.entries(this._structure.children);

      for (let index = 0; index < entries.length; index++) {
        const [key, value] = entries[index];
        if (value.validate(this._structure.children[key])) {
          this.upScore();
        } else {
          const lastError = value.getLastError
          if (lastError) this._errors.push(lastError);
          return false;
        }
      }
    }

    /**
     * Validate other type
     */
    if (this._structure.required) {
      return this._structure.type === input;
    }

    return true;
  }

}

export class Scheme {
  constructor(public readonly scheme: ISchemeChild) {
  }
  validate(data: ISchemeType): boolean {
    return this.scheme.validate(data);
  }
}


export function stringScheme(initial?: string) {
  return (new SchemeChild())
    .type(String(initial || ''))
}

export function numberScheme(initial?: number) {
  return (new SchemeChild())
    .type(Number(initial || ''))
}

export function bigintScheme(initial?: number) {
  return (new SchemeChild())
    .type(BigInt(initial || ''))
}

export function booleanScheme(initial?: boolean) {
  return (new SchemeChild())
    .type(Boolean(initial || ''))
}

export function objectScheme(initial?: object) {
  return (new SchemeChild())
    .type(initial || Object())
}

export function functionScheme(initial?: Function) {
  return (new SchemeChild())
    .type(initial || Function())
}

export function nullableScheme() {
  return (new SchemeChild())
    .type(null)
}
