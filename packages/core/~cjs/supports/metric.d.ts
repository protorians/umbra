export declare class MetricRandom {
    static ALPHA_NUMERIC: string;
    static ALPHA_NUMERIC_LOWER: string;
    static ALPHA_NUMERIC_UPPER: string;
    static ALPHA_UPPER: string;
    static ALPHA_LOWER: string;
    static HEX_UPPER: string;
    static HEX_LOWER: string;
    static NUMERIC: string;
    static CreateRandom(min: number, max: number): number;
    static CreateBlock(base: string, length: number): string[];
    static CreateAlpha(length: number): string[];
    static CreateHEX(length: number): string[];
    static CreateNumeric(length: number): string[];
    static Create(length: number): string[];
}
