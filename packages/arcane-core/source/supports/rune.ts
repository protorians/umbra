import {IProgram, IRunePlugin} from "../types/index.js"
import {spawnSync} from "node:child_process";
import {ArcaneEnv} from "./env.js";
import {IRuneManager} from "../types/index.js";
import path from "node:path";
import {createRequire} from 'module';
import {existsSync} from "fs";
import {ArcaneManager} from "./manager.js";
import {statSync} from "node:fs";

const require = createRequire(import.meta.url);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export namespace ArcaneRune {


    export async function ESMLoader(pkg: string) {
        try {
            return (await import(pkg)).default || undefined;
        } catch (e) {
            return undefined;
        }
    }

    export function CJSLoader(pkg: string) {
        try {
            return require(pkg)
        } catch (e) {
            return undefined;
        }
    }

    export abstract class Plugin implements IRunePlugin {
        abstract name: string;
        abstract description: string;

        register(program: IProgram): this {
            program.log.error('Nothing to run!');
            return this;
        }
    }

    export class Validates {

        make(): boolean {
            return false;
        }

    }

    export class Manager implements IRuneManager {
        protected _runes: IRunePlugin[] = [];

        get runes(): IRunePlugin[] {
            return this._runes;
        }

        constructor(
            readonly program: IProgram
        ) {
        }

        register(rune: IRunePlugin): this {
            this._runes.push(rune);
            return this;
        }


        install(rune: string): any {
            try {
                spawnSync(ArcaneEnv.getPkgManager(), ["i", rune, "--prefix", this.program.workdir], {stdio: "inherit"})
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
            } catch (e: any) {
                return e;
            }
        }

        remove(rune: string): any {
            try {
                spawnSync(ArcaneEnv.getPkgManager(), ["remove", rune, "--prefix", this.program.workdir], {stdio: "inherit"})
                const runes = this.program.config.get('runes') || [];

                for (let i = 0; i < runes.length; i++) {
                    const name = runes[i];
                    if (name === rune) runes.splice(runes.indexOf(name), 1);
                }

                this.program.config.update('runes', runes).save();
                return true;
            } catch (e: any) {
                return e;
            }
        }

        async mount(runes: string[]): Promise<this> {
            if (this.program.mode) this.program.log.highlight("MODE", `${this.program.mode}`)

            for (let pid = 0; pid < this._runes.length; pid++) {
                const rune = this._runes[pid];
                rune.register(this.program)
            }

            this._runes = [];

            for (let index = 0; index < runes.length; index++) {
                await this.load(runes[index]);
            }

            for (let pid = 0; pid < this._runes.length; pid++) {
                const rune = this._runes[pid];
                rune.register(this.program)
            }

            return this;
        }

        async load(rune: string) {

            try {
                const dir = path.resolve(this.program.workdir, `.${path.sep}node_modules`, `.${path.sep}${rune}`);
                const config = ArcaneManager.packageInfo(dir);

                if (!config) return;

                let main = path.resolve(dir, config.main);

                if (!existsSync(main)) main = path.resolve(dir, 'index.js');

                let PluginClass = await ESMLoader(main);
                if (PluginClass === undefined) PluginClass = require(dir);

                const runePlugin = new PluginClass(rune);
                if(typeof runePlugin.register === 'function') {
                    this.register(runePlugin);
                }

                this.program.log.highlight('Load', 'with', rune, main, PluginClass, runePlugin)

            } catch (e) {
                if(ArcaneEnv.getMode() === 'debug') this.program.log.warning('DEBUG', e)
            }

        }

    }

}