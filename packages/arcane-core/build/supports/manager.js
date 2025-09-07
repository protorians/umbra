import { existsSync, readFileSync } from "node:fs";
import path, { resolve } from "node:path";
import { Command } from "commander";
export var ArcaneManager;
(function (ArcaneManager) {
    let instance;
    function serializeArgv(argv) {
        return typeof argv === "string" ? [argv] : argv;
    }
    ArcaneManager.serializeArgv = serializeArgv;
    function packageInfo(appDir) {
        const source = `${resolve(appDir || process.cwd(), `.${path.sep}package.json`)}`;
        return existsSync(source) ? JSON.parse(`${readFileSync(source)}`) : undefined;
    }
    ArcaneManager.packageInfo = packageInfo;
    function create() {
        instance = instance instanceof Command ? instance : new Command();
        return instance;
    }
    ArcaneManager.create = create;
})(ArcaneManager || (ArcaneManager = {}));
