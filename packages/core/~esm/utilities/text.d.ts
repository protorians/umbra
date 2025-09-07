export declare namespace TextUtility {
    function addSlashes(text: string): string;
    function stripSlashes(text: string): string;
    function stripHTMLTags(text: string): string;
    function unCamelCase(value: string, separator?: string): string;
    function camelCase(value: string): string;
    function fixExponent(x: number): string;
    function slugify(str: string): string;
    function ucFirstLetter(value: string): string;
    function lcFirstLetter(value: string): string;
    function trimSpace(data: string): string;
    function ucWords(data: string, strict?: boolean): string;
    function randomName(length?: number): string;
    function logTime(date?: Date): string;
    function logDateTime(date?: Date): string;
    function snapSequence(rex: RegExp, input: string): string;
    function parseSequence(sequence: string, dictionary: (string | number)[]): string;
    function kebabCase(value: string): string;
    function snakeCase(value: string): string;
    function capitalize(value: string): string;
    function truncate(value: string, length: number, suffix?: string): string;
    function isStringable(value: any): boolean;
}
