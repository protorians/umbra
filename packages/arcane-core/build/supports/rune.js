import { spawnSync } from "node:child_process";
import { ArcaneEnv } from "./env.js";
import path from "node:path";
import { createRequire } from 'module';
import { existsSync } from "fs";
import { ArcaneManager } from "./manager.js";
import { statSync } from "node:fs";
const require = createRequire(import.meta.url);
export var ArcaneRune;
(function (ArcaneRune) {
    async function ESMLoader(pkg) {
        try {
            return (await import(pkg)).default || undefined;
        }
        catch (e) {
            return undefined;
        }
    }
    ArcaneRune.ESMLoader = ESMLoader;
    function CJSLoader(pkg) {
        try {
            return require(pkg);
        }
        catch (e) {
            return undefined;
        }
    }
    ArcaneRune.CJSLoader = CJSLoader;
    class Plugin {
        register(program) {
            program.log.error('Nothing to run!');
            return this;
        }
    }
    ArcaneRune.Plugin = Plugin;
    class Validates {
        make() {
            return false;
        }
    }
    ArcaneRune.Validates = Validates;
    class Manager {
        program;
        _runes = [];
        get runes() {
            return this._runes;
        }
        constructor(program) {
            this.program = program;
        }
        register(rune) {
            this._runes.push(rune);
            return this;
        }
        install(rune) {
            try {
                spawnSync(ArcaneEnv.getPkgManager(), ["i", rune, "--prefix", this.program.workdir], { stdio: "inherit" });
                const runes = this.program.config.get('runes') || [];
                if (existsSync(rune) && statSync(rune).isDirectory()) {
                    const pkgConfig = ArcaneManager.packageInfo(rune);
                    if (pkgConfig) {
                        rune = pkgConfig.name;
                    }
                }
                if (!runes.includes(rune)) {
                    runes.push(rune);
                }
                this.program.config.update('runes', runes).save();
                return true;
            }
            catch (e) {
                return e;
            }
        }
        remove(rune) {
            try {
                spawnSync(ArcaneEnv.getPkgManager(), ["remove", rune, "--prefix", this.program.workdir], { stdio: "inherit" });
                const runes = this.program.config.get('runes') || [];
                for (let i = 0; i < runes.length; i++) {
                    const name = runes[i];
                    if (name === rune)
                        runes.splice(runes.indexOf(name), 1);
                }
                this.program.config.update('runes', runes).save();
                return true;
            }
            catch (e) {
                return e;
            }
        }
        async mount(runes) {
            if (this.program.mode)
                this.program.log.highlight("MODE", `${this.program.mode}`);
            for (let pid = 0; pid < this._runes.length; pid++) {
                const rune = this._runes[pid];
                rune.register(this.program);
            }
            this._runes = [];
            for (let index = 0; index < runes.length; index++) {
                await this.load(runes[index]);
            }
            for (let pid = 0; pid < this._runes.length; pid++) {
                const rune = this._runes[pid];
                rune.register(this.program);
            }
            return this;
        }
        async load(rune) {
            try {
                const dir = path.resolve(this.program.workdir, `.${path.sep}node_modules`, `.${path.sep}${rune}`);
                const config = ArcaneManager.packageInfo(dir);
                if (!config)
                    return;
                let main = path.resolve(dir, config.main);
                if (!existsSync(main))
                    main = path.resolve(dir, 'index.js');
                let PluginClass = await ESMLoader(main);
                if (PluginClass === undefined)
                    PluginClass = require(dir);
                const runePlugin = new PluginClass(rune);
                if (typeof runePlugin.register === 'function') {
                    this.register(runePlugin);
                }
                this.program.log.highlight('Load', 'with', rune, main, PluginClass, runePlugin);
            }
            catch (e) {
                if (ArcaneEnv.getMode() === 'debug')
                    this.program.log.warning('DEBUG', e);
            }
        }
    }
    ArcaneRune.Manager = Manager;
})(ArcaneRune || (ArcaneRune = {}));
