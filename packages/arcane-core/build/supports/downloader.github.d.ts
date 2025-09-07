import { IRepositoryPathname, IDownloader } from "../types/index.js";
export declare namespace GithubDownloader {
    function getGithubRepositoryDownloadUrl(repository: string): string;
    function getGithubTagDownloadUrl(owner: string, repository: string, tag: string): string;
    function parseRepositoryPathname(pathname: string): IRepositoryPathname | undefined;
    function getGithubDownloadUrl(pathname: string): string;
    class RepositoryDownloader {
        readonly name: string;
        protected _downloader: IDownloader;
        constructor(name: string, cacheDir: string, outputDir: string);
        get downloader(): IDownloader;
        process(): Promise<IDownloader>;
    }
}
