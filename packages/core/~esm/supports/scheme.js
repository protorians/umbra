import { TextUtility } from "../utilities/index.js";
import { revealType } from "../facades/index.js";
export class SchemeChild {
    constructor() {
        this._score = 0;
        this._total = 0;
        this._errors = [];
        this._structure = { type: undefined };
    }
    upScore() {
        this._score++;
        return this;
    }
    downScore() {
        this._score--;
        return this;
    }
    get structure() {
        return this._structure;
    }
    get errors() {
        return this._errors;
    }
    get getFirstError() {
        return this._errors[0] || undefined;
    }
    get getLastError() {
        return this._errors[this._errors.length - 1] || undefined;
    }
    get score() {
        return this._score;
    }
    get total() {
        return this._total;
    }
    get isValid() {
        return this._score >= this._total;
    }
    condition(condition) {
        this._total++;
        return condition;
    }
    type(value) {
        this._structure.type = value;
        return this;
    }
    required(value) {
        this._structure.required = value;
        return this;
    }
    children(value) {
        this._structure.children = value;
        return this;
    }
    min(value) {
        this._structure.min = value;
        return this;
    }
    max(value) {
        this._structure.max = value;
        return this;
    }
    match(value) {
        this._structure.match = value;
        return this;
    }
    validate(input) {
        const type = typeof this._structure.type;
        if (this._structure.type === "RegExp") {
            if (this.condition(!(this._structure.match && TextUtility.isStringable(input) && this._structure.match.test(String(input))))) {
                this._errors.push({ type: "match", message: "regexp failed" });
            }
            else
                this.upScore();
        }
        if (this._structure.type !== "RegExp") {
            if (this.condition(type !== revealType(input))) {
                if (this._structure.required)
                    this._errors.push({ type: "type", message: "type not match" });
            }
            else
                this.upScore();
        }
        if (TextUtility.isStringable(type)) {
            const length = String(input).length;
            if (this._structure.min) {
                if (this.condition(this._structure.min > length)) {
                    this._errors.push({ type: "min", message: "length failed" });
                }
                else
                    this.upScore();
            }
            if (this._structure.max) {
                if (this.condition(this._structure.max < length)) {
                    this._errors.push({ type: "max", message: "length failed" });
                }
                else
                    this.upScore();
            }
        }
        if (type === "boolean") {
            if (this._structure.required) {
                if (this.condition(this._structure.type === input)) {
                    this.upScore();
                }
            }
        }
        if (type === "symbol") {
            this.condition(true);
            this.upScore();
        }
        if (type === "object" && Array.isArray(input)) {
            this.condition(true);
            this.upScore();
        }
        if (type === "object" && typeof input === "object" && this._structure.children && typeof this._structure.children === "object") {
            const entries = Object.entries(this._structure.children);
            for (let index = 0; index < entries.length; index++) {
                const [key, value] = entries[index];
                if (this.condition(value.validate(this._structure.children[key]))) {
                    this.upScore();
                }
                else {
                    const lastError = value.getLastError;
                    if (lastError)
                        this._errors.push(lastError);
                }
            }
        }
        if (this._structure.required) {
            if (this.condition(input === undefined))
                this._errors.push({ type: "required", message: "required" });
            else
                this.upScore();
        }
        return this.isValid;
    }
}
export class Scheme {
    constructor(scheme) {
        this.scheme = scheme;
    }
    validate(data) {
        return this.scheme.validate(data);
    }
}
