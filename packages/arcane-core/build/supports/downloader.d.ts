import { SingleBar } from "cli-progress";
import { IDownloader, IDownloaderConfig } from "../types/index.js";
import { DownloaderException } from "../exception.js";
export declare namespace ArcaneDownloader {
    class Create implements IDownloader {
        protected _config: Partial<IDownloaderConfig>;
        protected _exception: DownloaderException | undefined;
        protected _response: Response | undefined;
        protected _downloaded: string | undefined;
        protected _slug: string | undefined;
        protected _copied: string[] | undefined;
        protected _extracted: string[] | undefined;
        get config(): Partial<IDownloaderConfig>;
        get slug(): string | undefined;
        get downloaded(): string | undefined;
        get exception(): DownloaderException | undefined;
        get response(): Response | undefined;
        get copied(): string[] | undefined;
        get extracted(): string[] | undefined;
        get basename(): string | undefined;
        caches(directory: string): this;
        cacheable(cacheable: boolean): this;
        cleanable(cleanable: boolean): this;
        extension(extension: string): this;
        name(name: string): this;
        output(output: string): this;
        silent(silent: boolean): this;
        info(info: boolean): this;
        url(url: string): this;
        process(): Promise<this>;
        extract(): Promise<this>;
        copy(directory: string): this;
    }
    class Group {
        readonly entries: string[];
        readonly output: string;
        readonly caches: string | null;
        readonly extension: string | null;
        protected pointer: number;
        protected _downloaded: number;
        readonly length: number;
        protected progress: SingleBar | undefined;
        protected _instances: IDownloader[];
        constructor(entries: string[], output: string, caches?: string | null, extension?: string | null);
        get downloaded(): number;
        get instances(): IDownloader[];
        next(): Promise<boolean>;
    }
}
