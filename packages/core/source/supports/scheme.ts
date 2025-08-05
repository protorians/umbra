import {
    ISchemeCharLength,
    ISchemeChild,
    ISchemeChildren,
    ISchemeError,
    ISchemeProps,
    ISchemeScore,
    ISchemeType, ISchematic
} from "../types";
import {TextUtility} from "../utilities";
import {revealType} from "../facades";

export class SchemeChild implements ISchemeChild {
    protected _structure: ISchemeProps;
    protected _score: ISchemeScore = 0;
    protected _total: ISchemeScore = 0;
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

    get score(): ISchemeScore {
        return this._score;
    }

    get total(): ISchemeScore {
        return this._total;
    }

    get isValid(): boolean {
        return this._score >= this._total;
    }

    condition(condition: boolean): boolean {
        this._total++;
        return condition;
    }

    type(value: ISchemeType): this {
        this._structure.type = value;
        return this;
    }

    required(value: boolean): this {
        this._structure.required = value;
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

    match(value: RegExp): this {
        this._structure.match = value;
        return this;
    }

    validate(input: any): boolean {
        const type = typeof this._structure.type;

        /**
         * Validate RexExp
         */
        if (this._structure.type === "RegExp") {
            if (this.condition(!(this._structure.match && TextUtility.isStringable(input) && this._structure.match.test(String(input))))) {
                this._errors.push({type: 'match', message: 'regexp failed'});
            } else
                this.upScore();
        }


        /**
         * Validate Type
         */
        if (this._structure.type !== "RegExp") {
            if (this.condition(type !== revealType(input))) {
                if (this._structure.required) this._errors.push({type: 'type', message: 'type not match'});
            } else
                this.upScore();
        }


        /**
         * Validate Character length if string
         */
        if (TextUtility.isStringable(type)) {
            const length = String(input).length;

            if (this._structure.min) {
                if (this.condition(this._structure.min > length)) {
                    this._errors.push({type: 'min', message: 'length failed'});
                } else
                    this.upScore();
            }

            if (this._structure.max) {
                if (this.condition(this._structure.max < length)) {
                    this._errors.push({type: 'max', message: 'length failed'});
                } else
                    this.upScore();
            }
        }

        /**
         * Validate Boolean type
         */
        if (type === 'boolean') {
            if (this._structure.required) {
                if (this.condition(this._structure.type === input)) {
                    this.upScore();
                }
            }
        }


        /**
         * Validate symbol
         */
        if (type === 'symbol') {
            this.condition(true)
            this.upScore();
        }

        /**
         * Validate array
         */
        if (type === 'object' && Array.isArray(input)) {
            this.condition(true)
            this.upScore();
        }

        /**
         * Validate Children if object
         */
        if (type === "object" && typeof input === "object" && this._structure.children && typeof this._structure.children === 'object') {
            const entries = Object.entries(this._structure.children);

            for (let index = 0; index < entries.length; index++) {
                const [key, value] = entries[index];
                if (this.condition(value.validate(this._structure.children[key]))) {
                    this.upScore();
                } else {
                    const lastError = value.getLastError
                    if (lastError) this._errors.push(lastError);
                }
            }
        }

        /**
         * Validate the required type
         */
        if (this._structure.required) {
            if (this.condition(input === undefined)) this._errors.push({type: 'required', message: 'required'});
            else this.upScore();
        }

        return this.isValid;
    }

}

export class Scheme implements ISchematic {
    constructor(public readonly scheme: ISchemeChild) {
    }

    validate(data: any): boolean {
        return this.scheme.validate(data);
    }
}
