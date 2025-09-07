import { ArcaneRune } from "./rune.js";
export var ArcaneProgramRunes;
(function (ArcaneProgramRunes) {
    class Install extends ArcaneRune.Plugin {
        name = 'Rune:Install';
        description = 'Arcane Rune installation';
        register(program) {
            program.instance
                .command("add:rune <rune>")
                .description("Install a rune")
                .action((rune) => {
                const task = program.manager.install(rune);
                if (task === true)
                    program.log.success('DONE', 'Rune saved successfully!');
                else
                    program.log.error('ERR', task);
            });
            return this;
        }
    }
    ArcaneProgramRunes.Install = Install;
    class Remove extends ArcaneRune.Plugin {
        name = 'Rune:Remove';
        description = 'Arcane Rune removing';
        register(program) {
            program.instance
                .command("remove:rune <rune>")
                .description("Remove a rune")
                .action((rune) => {
                const task = program.manager.remove(rune);
                if (task === true)
                    program.log.success('DONE', 'Rune removed successfully!');
                else
                    program.log.error('ERR', task);
            });
            return this;
        }
    }
    ArcaneProgramRunes.Remove = Remove;
})(ArcaneProgramRunes || (ArcaneProgramRunes = {}));
