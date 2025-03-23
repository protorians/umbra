import {Environment} from "@protorians/core";

export class RemMetric {

    static base(): number {
        return Environment.Client
            ? parseFloat(getComputedStyle(document.documentElement).fontSize)
            : 16;
    }

    static parse(value: string | number): string {
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
        } else return value;
    }

    static pixel(value: string | number): string {
        return `${parseFloat(value.toString()) / this.base()}rem`;
    }

    static centimeter(value: string | number): string {
        return `${(parseFloat(value.toString()) * 37.7952755906) / this.base()}rem`;
    }

    static millimeter(value: string | number): string {
        return `${(parseFloat(value.toString()) * 3.77952755906) / this.base()}rem`;
    }

}