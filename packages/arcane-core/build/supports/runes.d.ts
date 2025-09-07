import { IRuneDumper, IRuneDumperConfig, IRunePayload, IRunePayloads, IRuneScheme, IRuneDumperSignalMap } from "../types/index.js";
import { type ISignalStack } from "@protorians/core";
import { Command } from "commander";
export declare namespace ArcaneRunes {
    class Dumper implements IRuneDumper {
        readonly config: IRuneDumperConfig;
        _entries: IRunePayloads;
        signal: ISignalStack<IRuneDumperSignalMap>;
        constructor(config: IRuneDumperConfig);
        get entries(): IRunePayloads;
        commit(name: string, file: string): IRunePayload;
        commits(name: string, files: string[]): this;
        prepare(): this;
        start(): this;
        save(): boolean;
    }
    function dump(binDir: string, dumpFile: string, silent?: boolean): Dumper;
    function read(filePath: string): IRuneScheme;
    function merge(make: Command, binDir: string, directory: string, commands: IRuneScheme): Command;
}
