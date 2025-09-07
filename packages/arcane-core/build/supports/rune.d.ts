import { IProgram, IRunePlugin } from "../types/index.js";
import { IRuneManager } from "../types/index.js";
export declare namespace ArcaneRune {
    function ESMLoader(pkg: string): Promise<any>;
    function CJSLoader(pkg: string): any;
    abstract class Plugin implements IRunePlugin {
        abstract name: string;
        abstract description: string;
        register(program: IProgram): this;
    }
    class Validates {
        make(): boolean;
    }
    class Manager implements IRuneManager {
        readonly program: IProgram;
        protected _runes: IRunePlugin[];
        get runes(): IRunePlugin[];
        constructor(program: IProgram);
        register(rune: IRunePlugin): this;
        install(rune: string): any;
        remove(rune: string): any;
        mount(runes: string[]): Promise<this>;
        load(rune: string): Promise<void>;
    }
}
