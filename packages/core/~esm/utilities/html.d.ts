export declare namespace HtmlUtility {
    function escape(text: string): string;
    function unescape(text: string): string;
    function ascendingPath<T extends Node | HTMLElement>(child: T, validator: (parent: T) => boolean): T | undefined;
}
