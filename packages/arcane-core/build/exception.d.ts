export declare class CliException extends Error {
    constructor(message: string);
}
export declare class NotFoundException extends CliException {
    constructor(message: string);
}
export declare class DownloaderException extends CliException {
    constructor(message: string);
}
export declare class ExtractorException extends CliException {
    constructor(message: string);
}
