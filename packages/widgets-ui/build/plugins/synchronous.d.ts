import { CompilationCommand } from "../enums.js";
import { ICompilatorDirectories, ISynchronizable } from "../types/index.js";
export declare class Synchronous {
    protected static _directories: ICompilatorDirectories;
    protected static _command: CompilationCommand | undefined;
    protected static _synchronizable: Set<ISynchronizable>;
    static synchronizable(target: ISynchronizable): typeof Synchronous;
    static unsynchronizable(target: ISynchronizable): typeof Synchronous;
    static clear(): typeof Synchronous;
    static get file(): string;
    static get command(): CompilationCommand;
    static get directories(): ICompilatorDirectories;
    static defineDirectory<D extends keyof ICompilatorDirectories>(key: D, dir: ICompilatorDirectories[D]): typeof this;
    static defineCommand(command: CompilationCommand): typeof this;
    static defineDirectories(dir: ICompilatorDirectories): typeof this;
    static make(): typeof Synchronous;
}
