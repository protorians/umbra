import {Command} from "commander";
import {ArcaneManager} from "./manager.js";
import {IConfigLoader, IPackage, IProgram, IProgramBus, IProgramConfig, IRuneManager} from "../types/index.js";
import {Terminal} from "./terminal.js";
import {ISignalStack} from "@protorians/core";
import * as fs from "node:fs";
import {ArcaneConfig} from "./configurator.js";
import {ArcaneProgramRunes} from "./program.runes.js";
import {ArcaneEnv} from "./env.js";
import {ArcaneRune} from "./rune.js";
import * as os from "node:os";
import {ArcaneDirectory} from "./fs.manager.js";
import {execSync} from "node:child_process";
import { Signal } from "@protorians/core/supports/signal.js";


export namespace ArcaneProgram {

    import deactivateVerbose = ArcaneEnv.deactivateVerbose;
    import setPkgManager = ArcaneEnv.setPkgManager;
    import activateVerbose = ArcaneEnv.activateVerbose;
    import getMode = ArcaneEnv.getMode;
    import setMode = ArcaneEnv.setMode;


    export class Create implements IProgram {

        protected _instance: Command;
        protected _name: string | undefined;
        protected _description: string | undefined;
        protected _version: string = '0.0.0';
        protected _info: IPackage | undefined;
        protected _argv: string[] = [];
        // protected _runes_dir: string;
        protected _config_file: string;
        protected _workdir: string;

        protected _config: IConfigLoader<IProgramConfig> = {} as IConfigLoader<IProgramConfig>;
        protected _bus: ISignalStack<IProgramBus>;

        readonly _log: typeof Terminal.Display;
        protected _homedir: string;
        protected _manager: IRuneManager;

        get workdir(): string {
            return this._workdir;
        }

        get homedir(): string {
            return this._homedir;
        }

        get manager(): IRuneManager {
            return this._manager;
        }

        get mode(): string | undefined {
            return getMode();
        }

        get instance(): Command {
            return this._instance;
        }

        get name(): string | undefined {
            return this._name;
        }

        get description(): string | undefined {
            return this._description;
        }

        get version(): string | undefined {
            return this._version;
        }

        get info(): IPackage | undefined {
            return this._info;
        }

        get argv(): string[] {
            return this._argv;
        }

        // get runesDir(): string {
        //     return this._runes_dir;
        // }

        get configFile(): string {
            return this._config_file;
        }

        get config(): IConfigLoader<IProgramConfig> {
            return this._config;
        }

        get bus(): ISignalStack<IProgramBus> {
            return this._bus;
        }

        get log(): typeof Terminal.Display {
            return this._log;
        }


        constructor(
            readonly token: string,
            readonly directory: string,
        ) {
            this._instance = new Command();
            this._info = ArcaneManager.packageInfo(directory);
            this._bus = new Signal.Stack<IProgramBus>();
            this._log = Terminal.Display;
            this._homedir = ArcaneDirectory.initialize(`${os.homedir()}/.${token}`);
            this._workdir = `${this._homedir}`;
            this._config_file = `${this._homedir}/arcane.config.json`;

            this._manager = new ArcaneRune.Manager(this);
        }

        protected presets(): this {

            /**
             * Mode
             */
            this._instance.option("--set-mode <mode>", "Set mode", (mode: string) => setMode(mode));
            this._instance.option("--debug-mode", "Set mode to DEBUG", () => setMode("debug"));
            this._instance.option("--dev-mode", "Set mode to DEV", () => setMode("dev"));
            this._instance.option("--prod-mode", "Set mode to PROD", () => setMode("prod"));
            this._instance.option("--get-mode", "Get mode", () => getMode());

            /**
             * Verbose
             */
            this._instance.option("--silent", "Deactivate verbose", () => deactivateVerbose());

            /**
             * Package _manager
             */
            this._instance.option("--pkg-_manager <value>", "Set package _manager", (value: string) => setPkgManager(value));
            this._instance.option("--use-npm", "Set NPM as package _manager", () => setPkgManager("npm"));
            this._instance.option("--use-pnpm", "Set PNPM as package _manager", () => setPkgManager("pnpm"));
            this._instance.option("--use-yarn", "Set YARN as package _manager", () => setPkgManager("yarn"));
            this._instance.option("--use-bun", "Set BUN as package _manager", () => setPkgManager("bun"));

            this._manager
                .register(new ArcaneProgramRunes.Install())
                .register(new ArcaneProgramRunes.Remove())

            return this;
        }

        protected initializeDirectories() {
            // if (!fs.existsSync(this._runes_dir))
            //     this._runes_dir = ArcaneDirectory.initialize(this._runes_dir);
            return this;
        }

        protected initializeConfig() {
            if (!fs.existsSync(this._config_file))
                fs.writeFileSync(this._config_file, JSON.stringify({runes: []}, null, 2), {encoding: 'utf-8'})

            this._config = new ArcaneConfig.Loader<IProgramConfig>(this._config_file);
            return this;
        }

        protected initialize() {

            this._name = this._info?.name || this._name || 'undefined';
            this._description = this._info?.description || this._description || 'undefined';
            this._version = this._info?.version || this._version || 'undefined';

            this._instance.name(this._name);
            this._instance.version(this._version);
            this._instance.description(this._description);

            activateVerbose();
            return this.initializeDirectories().initializeConfig().presets();
        }

        protected async mount() {
            await this._manager.mount(this.config.get('runes') || [])
            return this;
        }

        execute(cmd: string) {
            execSync(`cd ${this._homedir} && ${cmd}`);
        }

        async run(argv: string[]): Promise<Command | undefined> {
            this.initialize()._argv = ArcaneManager.serializeArgv(argv);
            await this.mount();
            return this._instance.parse(this._argv)
        }

    }

    export class Hook {
    }

    export class Middleware {
    }


}