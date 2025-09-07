import { ArcaneDownloader } from "./downloader.js";
export var GithubDownloader;
(function (GithubDownloader) {
    function getGithubRepositoryDownloadUrl(repository) {
        return `https://github.com/${repository}/archive/refs/heads/main.zip`;
    }
    GithubDownloader.getGithubRepositoryDownloadUrl = getGithubRepositoryDownloadUrl;
    function getGithubTagDownloadUrl(owner, repository, tag) {
        return `https://github.com/${owner}/${repository}/archive/refs/tags/${tag}.zip`;
    }
    GithubDownloader.getGithubTagDownloadUrl = getGithubTagDownloadUrl;
    function parseRepositoryPathname(pathname) {
        const matched = pathname.match(/^([\w-]+)\/([\w-]+)@([\w.-]+)$/);
        return matched ? {
            owner: matched[1].toString().trim(),
            repository: matched[2].toString().trim(),
            version: matched[3].toString().trim(),
        } : undefined;
    }
    GithubDownloader.parseRepositoryPathname = parseRepositoryPathname;
    function getGithubDownloadUrl(pathname) {
        const info = parseRepositoryPathname(pathname);
        return info ? getGithubTagDownloadUrl(info.owner, info.repository, info.version) : getGithubRepositoryDownloadUrl(pathname);
    }
    GithubDownloader.getGithubDownloadUrl = getGithubDownloadUrl;
    class RepositoryDownloader {
        name;
        _downloader;
        constructor(name, cacheDir, outputDir) {
            this.name = name;
            this._downloader = (new ArcaneDownloader.Create())
                .name(name)
                .url(getGithubDownloadUrl(name))
                .extension('.zip')
                .caches(cacheDir)
                .output(outputDir || process.cwd());
        }
        get downloader() {
            return this._downloader;
        }
        async process() {
            const download = await this._downloader.process();
            return download.extract();
        }
    }
    GithubDownloader.RepositoryDownloader = RepositoryDownloader;
})(GithubDownloader || (GithubDownloader = {}));
