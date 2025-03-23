import {existsSync, readFileSync} from "node:fs";
import path, {resolve} from "node:path";
import {Command} from "commander";
import {IPackage} from "../types/index.js";


export namespace ArcaneManager {

    let instance: Command | undefined;

    export function serializeArgv(argv: string | string[]): string[] {
        return typeof argv === "string" ? [argv] : argv;
    }

    export function packageInfo(appDir: string | undefined): IPackage | undefined {
        const source = `${resolve(appDir || process.cwd(), `.${path.sep}package.json`)}`;
        return existsSync(source) ? JSON.parse(`${readFileSync(source)}`) : undefined
    }

    export function create(): Command {
        instance = instance instanceof Command ? instance : new Command();
        return instance;
    }

}
