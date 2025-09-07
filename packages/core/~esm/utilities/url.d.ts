export declare namespace UrlUtility {
    function paramsObject<T>(searchParams: string): T | undefined;
    function urlParams<T extends object>(params: T): string;
}
