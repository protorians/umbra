import { Environment } from "@protorians/core";
export class RemMetric {
    static base() {
        return Environment.Client
            ? parseFloat(getComputedStyle(document.documentElement).fontSize)
            : 16;
    }
    static parse(value) {
        value = value.toString();
        const unit = value.match(/[a-zA-Z%]+/);
        const number = parseFloat(value);
        if (unit && unit.length) {
            switch (unit[0]) {
                case 'px':
                    return this.pixel(number);
                case 'cm':
                    return this.centimeter(number);
                case 'mm':
                    return this.millimeter(number);
                case 'em':
                case 'rem':
                    return `${number}rem`;
                default:
                    return value;
            }
        }
        else
            return value;
    }
    static pixel(value) {
        return `${parseFloat(value.toString()) / this.base()}rem`;
    }
    static centimeter(value) {
        return `${(parseFloat(value.toString()) * 37.7952755906) / this.base()}rem`;
    }
    static millimeter(value) {
        return `${(parseFloat(value.toString()) * 3.77952755906) / this.base()}rem`;
    }
}
