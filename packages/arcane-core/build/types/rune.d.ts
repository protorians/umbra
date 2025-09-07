import { IProgram } from "./program.js";
export interface IRunePlugin {
    name: string;
    description: string;
    register(program: IProgram): this;
}
export interface IRuneManager {
    get runes(): IRunePlugin[];
    register(rune: IRunePlugin): this;
    install(rune: string): any;
    remove(rune: string): any;
    mount(runes: string[]): Promise<this>;
}
