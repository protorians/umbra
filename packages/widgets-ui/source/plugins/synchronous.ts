import {CompilationCommand} from "../enums.js";
import {ICompilatorDirectories, ISynchronizable} from "../types/index.js";
import * as fs from "node:fs";
import * as path from "node:path";

export class Synchronous {

    protected static _directories: ICompilatorDirectories = {} as ICompilatorDirectories;
    protected static _command: CompilationCommand | undefined;

    protected static _synchronizable: Set<ISynchronizable> = new Set();

    static synchronizable(target: ISynchronizable) {
        this._synchronizable.add(target);
        return this;
    }

    static unsynchronizable(target: ISynchronizable) {
        this._synchronizable.delete(target);
        return this;
    }

    static clear() {
        this._synchronizable.clear();
        return this;
    }

    static get file(): string {
        switch (this._command) {
            case CompilationCommand.Build:
            case CompilationCommand.Production:
                return `${this._directories.assets}/.widgets-ui.lib.css`;
        }
        return `${this._directories.root}/.widgets/widgetui.css`;
    }

    static get command(): CompilationCommand {
        return this._command || CompilationCommand.Production;
    }

    static get directories(): ICompilatorDirectories {
        return this._directories;
    }

    static defineDirectory<D extends keyof ICompilatorDirectories>(key: D, dir: ICompilatorDirectories[D]): typeof this {
        this._directories[key] = dir;
        return this;
    }

    static defineCommand(command: CompilationCommand): typeof this {
        this._command = command;
        return this;
    }

    static defineDirectories(dir: ICompilatorDirectories): typeof this {
        this._directories = dir;
        return this;
    }

    static make() {

        try {
            const directory = path.dirname(this.file)

            if (!fs.existsSync(directory))
                fs.mkdirSync(directory);

            const content = [...this._synchronizable.values()]
                .map(p => p.compilated.trim())
                .join('\n');

            // console.log(content);

            fs.writeFileSync(
                this.file,
                `/* WidgetUI generated */
@layer core, theme, layout, base, kit, components, utilities;
${content}\n`
            );
        } catch (e) {
            console.error(e);
        }

        return this;
    }

}

