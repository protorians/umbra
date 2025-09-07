import * as fs from "fs";
import * as path from "path";
import { ArcaneString } from "./string.js";
import { Terminal } from "./terminal.js";
import { DownloaderException } from "../exception.js";
import { ArcaneProgress } from "./progress.js";
import { ArcaneDirectory, ThreadFile } from "./fs.manager.js";
import { existsSync } from "node:fs";
import { basename } from "path";
export var ArcaneDownloader;
(function (ArcaneDownloader) {
    class Create {
        _config = { info: true };
        _exception;
        _response;
        _downloaded;
        _slug;
        _copied;
        _extracted;
        get config() {
            return this._config;
        }
        get slug() {
            return this._slug;
        }
        get downloaded() {
            return this._downloaded;
        }
        get exception() {
            return this._exception;
        }
        get response() {
            return this._response;
        }
        get copied() {
            return this._copied;
        }
        get extracted() {
            return this._extracted;
        }
        get basename() {
            if (this._downloaded) {
                const base = basename(this._downloaded);
                return base.substring(0, base.lastIndexOf(".")) || base;
            }
            return undefined;
        }
        caches(directory) {
            this._config.caches = directory;
            this.cacheable(true);
            return this;
        }
        cacheable(cacheable) {
            this._config.cacheable = cacheable;
            this.cleanable(true);
            return this;
        }
        cleanable(cleanable) {
            this._config.cleanable = cleanable;
            return this;
        }
        extension(extension) {
            this._config.extension = extension;
            return this;
        }
        name(name) {
            this._config.name = name;
            return this;
        }
        output(output) {
            this._config.output = output;
            return this;
        }
        silent(silent) {
            this._config.silent = silent;
            return this;
        }
        info(info) {
            this._config.info = info;
            return this;
        }
        url(url) {
            this._config.url = url;
            return this;
        }
        async process() {
            let progress;
            let spinner = undefined;
            try {
                if (!this._config.silent) {
                    spinner = await ArcaneProgress.createSpinner(`Fetch ${this._config.name}...`);
                    spinner.start();
                    spinner.color = 'cyan';
                }
                this._config.output = this._config.output || process.cwd();
                if (!this._config.name) {
                    throw new DownloaderException("Name not found");
                }
                if (!this._config.url) {
                    throw new DownloaderException("Url not found");
                }
                const response = await fetch(this._config.url);
                spinner?.stop();
                if (!response.ok) {
                    Terminal.Display.info("INFO", this._config.name, 'not found');
                    throw new DownloaderException(`Erreur HTTP ${response.status}`);
                }
                let filename = this._config.url;
                const contentDisposition = response.headers.get("content-disposition");
                if (contentDisposition) {
                    const match = contentDisposition.match(/filename="?([^"]+)"?/);
                    if (match)
                        filename = match[1];
                }
                this._slug = ArcaneString.nameable(ArcaneString.nameFromUrl(filename) ||
                    `${this._config.name}${this._config.extension?.trim().length ? this._config.extension : ''}`);
                this._downloaded = (this._config.cacheable && this._config.caches)
                    ? `${path.join(this._config.caches, this._slug)}`
                    : `${path.join(this._config.output, this._slug)}`;
                const size = response.headers.get("content-length");
                if (!size && response.status != 200)
                    throw new DownloaderException("Not found");
                progress = (size && this._config.silent === false)
                    ? ArcaneProgress.create({
                        name: this._slug || this._config.name,
                        cleanable: true,
                    })
                    : undefined;
                progress?.start(parseInt(size || '0'), 0);
                if (!response.body)
                    throw new DownloaderException("No available response found");
                if (!fs.existsSync(this._config.output)) {
                    fs.mkdirSync(this._config.output, { recursive: true });
                }
                const stream = fs.createWriteStream(this._downloaded);
                let cursor = 0;
                for await (const chunk of response.body) {
                    cursor += chunk.length;
                    progress?.update(cursor);
                    stream.write(chunk);
                }
                stream.end();
                progress?.stop();
                if (!this._config.silent && this._config.info)
                    Terminal.Display.info("TASK", `${this._config.name} downloaded!`);
            }
            catch (error) {
                if (progress)
                    progress.stop();
                this._exception = error;
                if (!this._config.silent)
                    Terminal.Display.error("ERR", error.message);
            }
            return this;
        }
        async extract() {
            try {
                if (!this._config.name) {
                    throw new DownloaderException("Name not found");
                }
                if (!this._downloaded) {
                    throw new DownloaderException("Download not found");
                }
                if (!existsSync(this._downloaded)) {
                    throw new DownloaderException("Downloaded file does not exists");
                }
                this._extracted = [];
                const output = this._config.output || process.cwd();
                const cleanable = typeof this._config.cleanable === 'undefined' ? true : this._config.cleanable;
                await ThreadFile.extraction(this._config.name, this._downloaded, output)
                    .catch(err => this._exception = err);
                if (cleanable)
                    fs.unlinkSync(this._downloaded);
                if (!this._config.silent && this._config.info)
                    Terminal.Display.info("TASK", `${this._config.name} extracted!`);
            }
            catch (error) {
                this._exception = error;
                if (!this._config.silent)
                    Terminal.Display.error("ERR", 'Extracting failed \n\n', error.message);
            }
            return this;
        }
        copy(directory) {
            try {
                const output = this._downloaded || this._config.output;
                if (!this._config.name) {
                    throw new DownloaderException("Name not found");
                }
                if (!output) {
                    throw new DownloaderException("Output not found");
                }
                if (!existsSync(output)) {
                    throw new DownloaderException("Output does not exists");
                }
                this._copied = ArcaneDirectory.copy(this._config.name, output, directory);
                if (!this._config.silent)
                    Terminal.Display.info("TASK", `${this._config.name} copied!`);
                return this;
            }
            catch (error) {
                this._exception = error;
                if (!this._config.silent && this._config.info)
                    Terminal.Display.error("ERR", 'Extracting failed \n\n', error.message);
            }
            return this;
        }
    }
    ArcaneDownloader.Create = Create;
    class Group {
        entries;
        output;
        caches;
        extension;
        pointer = 0;
        _downloaded = 0;
        length = 0;
        progress;
        _instances = [];
        constructor(entries, output, caches = null, extension = null) {
            this.entries = entries;
            this.output = output;
            this.caches = caches;
            this.extension = extension;
            this.length = entries.length;
            this.progress = ArcaneProgress.create({
                name: 'Downloading',
            });
            this.progress?.start(this.length, 0);
        }
        get downloaded() {
            return this._downloaded;
        }
        get instances() {
            return this._instances;
        }
        async next() {
            const entry = this.entries.shift();
            if (entry) {
                const downloader = (new Create())
                    .name(basename(entry).split('?')[0])
                    .url(entry)
                    .caches(this.caches || this.output)
                    .silent(true);
                if (this.extension)
                    downloader.extension(this.extension);
                this._instances.push(downloader);
                await downloader.process()
                    .then((status) => {
                    this._downloaded++;
                    this.progress?.update(this._downloaded);
                    return status;
                })
                    .finally(async () => await this.next());
                return false;
            }
            else {
                this.progress?.stop();
                Terminal.Display.success("TASK", `Download complete (${this._downloaded}/${this.length})`);
                return true;
            }
        }
    }
    ArcaneDownloader.Group = Group;
})(ArcaneDownloader || (ArcaneDownloader = {}));
