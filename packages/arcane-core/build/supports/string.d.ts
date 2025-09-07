export declare namespace ArcaneString {
    function nameable(name: string): string;
    function nameFromUrl(currentUrl: string | null): string | null;
    function slugify(data: string): string;
    function trimSpace(data: string): string;
    function ucFirst(data: string, strict?: boolean): string;
    function ucWords(data: string, strict?: boolean): string;
    function random(length?: number): string;
    function logTime(date?: Date | undefined): string;
    function logDateTime(date?: Date | undefined): string;
}
