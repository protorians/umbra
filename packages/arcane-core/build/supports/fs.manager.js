import { statSync, mkdirSync, existsSync, readdirSync, copyFileSync } from "node:fs";
import { ArcaneProgress } from "./progress.js";
import * as path from "node:path";
import AdmZip from "adm-zip";
import * as fs from "node:fs";
import extractZip from "extract-zip";
import { ExtractorException } from "../exception.js";
export var ArcaneDirectory;
(function (ArcaneDirectory) {
    function initialize(directory) {
        try {
            const exists = existsSync(directory);
            if (!exists)
                mkdirSync(directory, { recursive: true });
            if (exists && !statSync(directory).isDirectory())
                mkdirSync(directory, { recursive: true });
            return directory;
        }
        catch (e) {
            return directory;
        }
    }
    ArcaneDirectory.initialize = initialize;
    function copy(name, from, to) {
        let copied = [];
        const entries = readdirSync(from);
        const length = entries.length;
        const progress = ArcaneProgress.create({
            name: `Copying ${name}`,
        });
        progress.start(length, 0);
        for (const entry of entries) {
            const source = path.join(from, entry);
            const destination = path.join(to, entry);
            const stats = statSync(source);
            if (stats.isDirectory()) {
                copied = [...copied, ...copy(name, source, destination)];
            }
            else {
                copyFileSync(source, destination);
                copied.push(destination);
            }
        }
        progress.stop();
        return copied;
    }
    ArcaneDirectory.copy = copy;
})(ArcaneDirectory || (ArcaneDirectory = {}));
export var ThreadFile;
(function (ThreadFile) {
    async function extraction(name, filename, output) {
        return new Promise(async (resolve, reject) => {
            let extracted = [];
            try {
                extracted = extractWithProgression(name, filename, output);
                if (!Array.isArray(extracted))
                    throw new ExtractorException('Extracting Failed');
                resolve(extracted);
            }
            catch (error) {
                extracted = await extractWithoutProgression(filename, output);
                if (!Array.isArray(extracted))
                    reject('Extracting Failed');
                resolve(extracted);
            }
        });
    }
    ThreadFile.extraction = extraction;
    async function extractWithoutProgression(filename, output) {
        try {
            const entries = [];
            await extractZip(filename, {
                dir: output,
                onEntry: (entry) => entries.push(entry.fileName),
            });
            return entries;
        }
        catch (error) {
            return error;
        }
    }
    ThreadFile.extractWithoutProgression = extractWithoutProgression;
    function extractWithProgression(name, filename, output) {
        let progress;
        try {
            const extracted = [];
            const zip = new AdmZip(filename);
            const entries = zip.getEntries();
            const length = entries.length;
            let count = 0;
            progress = ArcaneProgress.create({
                name: `Extracting ${name}`,
            });
            progress.start(length, 0);
            for (const entry of entries) {
                if (!entry.isDirectory) {
                    const filePath = path.join(output, entry.entryName);
                    fs.mkdirSync(path.dirname(filePath), { recursive: true });
                    fs.writeFileSync(filePath, entry.getData());
                    count++;
                    extracted.push(filePath);
                    progress.update(count);
                }
            }
            progress.stop();
            return extracted;
        }
        catch (error) {
            progress?.stop();
            return error;
        }
    }
    ThreadFile.extractWithProgression = extractWithProgression;
})(ThreadFile || (ThreadFile = {}));
