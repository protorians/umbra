import {ArcaneRune} from "./rune.js";
import {IProgram} from "../types/index.js";

export namespace ArcaneProgramRunes {

    export class Install extends ArcaneRune.Plugin {
        name: string = 'Rune:Install';
        description: string = 'Arcane Rune installation';

        register(program: IProgram): this {
            program.instance
                .command("add:rune <rune>")
                .description("Install a rune")
                .action((rune) => {
                    const task = program.manager.install(rune)

                    if (task === true) program.log.success('DONE', 'Rune saved successfully!');
                    else program.log.error('ERR', task);
                });
            return this;
        }
    }


    export class Remove extends ArcaneRune.Plugin {
        name: string = 'Rune:Remove';
        description: string = 'Arcane Rune removing';

        register(program: IProgram): this {
            program.instance
                .command("remove:rune <rune>")
                .description("Remove a rune")
                .action((rune) => {
                    const task = program.manager.remove(rune)

                    if (task === true) program.log.success('DONE', 'Rune removed successfully!');
                    else program.log.error('ERR', task);
                });
            return this;
        }
    }


}