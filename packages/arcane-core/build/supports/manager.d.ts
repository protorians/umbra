import { Command } from "commander";
import { IPackage } from "../types/index.js";
export declare namespace ArcaneManager {
    function serializeArgv(argv: string | string[]): string[];
    function packageInfo(appDir: string | undefined): IPackage | undefined;
    function create(): Command;
}
