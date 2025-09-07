import { Command } from "commander";
import { IConfigLoader, IPackage, IProgram, IProgramBus, IProgramConfig, IRuneManager } from "../types/index.js";
import { Terminal } from "./terminal.js";
import { ISignalStack } from "@protorians/core";
export declare namespace ArcaneProgram {
    class Create implements IProgram {
        readonly token: string;
        readonly directory: string;
        protected _instance: Command;
        protected _name: string | undefined;
        protected _description: string | undefined;
        protected _version: string;
        protected _info: IPackage | undefined;
        protected _argv: string[];
        protected _config_file: string;
        protected _workdir: string;
        protected _config: IConfigLoader<IProgramConfig>;
        protected _bus: ISignalStack<IProgramBus>;
        readonly _log: typeof Terminal.Display;
        protected _homedir: string;
        protected _manager: IRuneManager;
        get workdir(): string;
        get homedir(): string;
        get manager(): IRuneManager;
        get mode(): string | undefined;
        get instance(): Command;
        get name(): string | undefined;
        get description(): string | undefined;
        get version(): string | undefined;
        get info(): IPackage | undefined;
        get argv(): string[];
        get configFile(): string;
        get config(): IConfigLoader<IProgramConfig>;
        get bus(): ISignalStack<IProgramBus>;
        get log(): typeof Terminal.Display;
        constructor(token: string, directory: string);
        protected presets(): this;
        protected initializeDirectories(): this;
        protected initializeConfig(): this;
        protected initialize(): this;
        protected mount(): Promise<this>;
        execute(cmd: string): void;
        run(argv: string[]): Promise<Command | undefined>;
    }
    class Hook {
    }
    class Middleware {
    }
}
