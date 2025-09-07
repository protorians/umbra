import { Command } from "commander";
import { IPackage } from "./package.js";
import { IConfigLoader } from "./config.js";
import { ISignalStack } from "@protorians/core";
import { Terminal } from "../supports/index.js";
import { IRuneManager } from "./rune.js";
export interface IProgramConfig {
    runes: string[];
}
export interface IProgram {
    readonly token: string;
    readonly directory: string;
    get homedir(): string;
    get instance(): Command;
    get workdir(): string;
    get manager(): IRuneManager;
    get mode(): string | undefined;
    get name(): string | undefined;
    get description(): string | undefined;
    get version(): string | undefined;
    get info(): IPackage | undefined;
    get argv(): string[];
    get configFile(): string;
    get config(): IConfigLoader<IProgramConfig>;
    get bus(): ISignalStack<IProgramBus>;
    get log(): typeof Terminal.Display;
    run(argv: string[]): Promise<Command | undefined>;
}
export interface IProgramBus {
}
