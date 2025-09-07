import { CompilationCommand } from "../enums.js";
import * as fs from "node:fs";
import * as path from "node:path";
export class Synchronous {
    static _directories = {};
    static _command;
    static _synchronizable = new Set();
    static synchronizable(target) {
        this._synchronizable.add(target);
        return this;
    }
    static unsynchronizable(target) {
        this._synchronizable.delete(target);
        return this;
    }
    static clear() {
        this._synchronizable.clear();
        return this;
    }
    static get file() {
        switch (this._command) {
            case CompilationCommand.Build:
            case CompilationCommand.Production:
                return `${this._directories.assets}/.widgets-ui.lib.css`;
        }
        return `${this._directories.root}/.widgets/widgetui.css`;
    }
    static get command() {
        return this._command || CompilationCommand.Production;
    }
    static get directories() {
        return this._directories;
    }
    static defineDirectory(key, dir) {
        this._directories[key] = dir;
        return this;
    }
    static defineCommand(command) {
        this._command = command;
        return this;
    }
    static defineDirectories(dir) {
        this._directories = dir;
        return this;
    }
    static make() {
        try {
            const directory = path.dirname(this.file);
            if (!fs.existsSync(directory))
                fs.mkdirSync(directory);
            const content = [...this._synchronizable.values()]
                .map(p => p.compilated.trim())
                .join('\n');
            fs.writeFileSync(this.file, `/* WidgetUI generated */
@layer core, theme, layout, base, kit, components, utilities;
${content}\n`);
        }
        catch (e) {
            console.error(e);
        }
        return this;
    }
}
