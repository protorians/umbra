import { ArcaneRune } from "./rune.js";
import { IProgram } from "../types/index.js";
export declare namespace ArcaneProgramRunes {
    class Install extends ArcaneRune.Plugin {
        name: string;
        description: string;
        register(program: IProgram): this;
    }
    class Remove extends ArcaneRune.Plugin {
        name: string;
        description: string;
        register(program: IProgram): this;
    }
}
