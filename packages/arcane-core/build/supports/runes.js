import { resolve, relative, dirname } from "node:path";
import * as fs from "node:fs";
import { Terminal } from "./terminal.js";
import { readFileSync } from "node:fs";
import { ArcaneEnum } from "./enums.js";
import { Signal } from "@protorians/core/supports/signal.js";
export var ArcaneRunes;
(function (ArcaneRunes) {
    class Dumper {
        config;
        _entries = {};
        signal;
        constructor(config) {
            this.config = config;
            this.signal = new Signal.Stack;
        }
        get entries() {
            return this._entries;
        }
        commit(name, file) {
            const filepath = resolve(this.config.directory, `./${name}`);
            const data = { name, file };
            let config = (typeof this._entries[name] !== "object")
                ? JSON.parse(readFileSync(`${filepath}/${ArcaneEnum.Rune.CONFIG_FILE}`).toString())
                : this._entries[name];
            config.files = config.files || [];
            config.files.push(file);
            this._entries[name] = config;
            this.signal.dispatch('commit', { instance: this, data });
            return data;
        }
        commits(name, files) {
            this.signal.dispatch('commits', { instance: this, name, files });
            return this;
        }
        prepare() {
            if (!fs.statSync(this.config.directory).isDirectory()) {
                fs.mkdirSync(this.config.directory, { recursive: true });
            }
            if (fs.existsSync(this.config.output) && fs.statSync(this.config.output).isFile()) {
                fs.unlinkSync(this.config.output);
            }
            this._entries = {};
            return this;
        }
        start() {
            this.prepare();
            const scanned = fs.readdirSync(this.config.directory, { recursive: false });
            for (const cmdName of scanned) {
                const filepath = resolve(this.config.directory, `./${cmdName}`);
                if (!fs.statSync(filepath).isDirectory())
                    continue;
                const payload = fs.readdirSync(filepath, { recursive: false })
                    .map((file) => (this.config.allow?.some(allow => allow instanceof RegExp ? allow.test(file) : allow === file))
                    ? file : null)
                    .filter(file => typeof file === 'string')
                    .map(file => {
                    this.commit(`${cmdName}`, file);
                    return file;
                });
                if (payload.length)
                    this.commits(`${cmdName}`, payload);
            }
            this.save();
            if (!this.config.silent)
                Terminal.Display.success("TASK", "Complete");
            return this;
        }
        save() {
            try {
                const dir = dirname(this.config.output);
                const scheme = {
                    meta: {
                        ...this.config,
                        timestamp: new Date().getTime(),
                        directory: relative(process.cwd(), this.config.directory),
                        output: relative(process.cwd(), this.config.output),
                    },
                    payload: this._entries,
                };
                if (!fs.existsSync(dir))
                    fs.mkdirSync(dir);
                fs.writeFileSync(this.config.output, JSON.stringify(scheme, null, 2));
                if (!this.config.silent)
                    Terminal.Display.info('[TASK]', 'Save completed');
                return true;
            }
            catch (e) {
                Terminal.Display.error('[ERROR]', e);
                return false;
            }
        }
    }
    ArcaneRunes.Dumper = Dumper;
    function dump(binDir, dumpFile, silent = false) {
        const dumper = new Dumper({
            prebuild: true,
            directory: binDir,
            output: dumpFile,
            allow: [
                ArcaneEnum.Rune.CONFIG_FILE,
                ArcaneEnum.Rune.MAIN_FILE,
            ],
            silent,
        });
        dumper.signal.listen('commits', ({ name, files }) => {
            if (!silent)
                Terminal.Display.info('[COMMIT]', `${name} :`, files.length, `file${files.length > 1 ? 's' : ''}`);
        });
        return dumper.start();
    }
    ArcaneRunes.dump = dump;
    function read(filePath) {
        return JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
    }
    ArcaneRunes.read = read;
    function merge(make, binDir, directory, commands) {
        for (const [name, config] of Object.entries(commands.payload || {})) {
            const files = config.files || undefined;
            if (!files)
                continue;
            if (!(Array.isArray(files) &&
                files.includes(ArcaneEnum.Rune.CONFIG_FILE) &&
                files.includes(ArcaneEnum.Rune.MAIN_FILE)))
                continue;
            if (typeof config !== 'object')
                continue;
            config.options = config.options || [];
            const main = resolve(binDir, `./${name}${config.workdir ? `/${config.workdir}` : ''}/main.js`);
            const command = make
                .name(config.name)
                .command(config.command)
                .description(config.description || 'No description');
            if (config.options) {
                for (const option of config.options)
                    command.option(option[0], option[1] || undefined, option[2] || undefined);
            }
            if (config.arguments) {
                for (const arg of config.arguments)
                    command.argument(arg[0], arg[1] || undefined, arg[2] || undefined);
            }
            ((mainFile) => {
                command.action(async (options) => {
                    try {
                        const main = await require(mainFile);
                        if (typeof main !== 'function') {
                            Terminal.Display.error('ERROR', '<', name, '>', 'No < main > function found ');
                            process.exit(1);
                        }
                        main(options, directory, make);
                    }
                    catch (e) {
                        Terminal.Display.error("ERR", e);
                    }
                });
            })(main);
        }
        return make;
    }
    ArcaneRunes.merge = merge;
})(ArcaneRunes || (ArcaneRunes = {}));
