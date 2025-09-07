import { Command } from "commander";
import { ArcaneManager } from "./manager.js";
import { Terminal } from "./terminal.js";
import * as fs from "node:fs";
import { ArcaneConfig } from "./configurator.js";
import { ArcaneProgramRunes } from "./program.runes.js";
import { ArcaneEnv } from "./env.js";
import { ArcaneRune } from "./rune.js";
import * as os from "node:os";
import { ArcaneDirectory } from "./fs.manager.js";
import { execSync } from "node:child_process";
import { Signal } from "@protorians/core/supports/signal.js";
export var ArcaneProgram;
(function (ArcaneProgram) {
    var deactivateVerbose = ArcaneEnv.deactivateVerbose;
    var setPkgManager = ArcaneEnv.setPkgManager;
    var activateVerbose = ArcaneEnv.activateVerbose;
    var getMode = ArcaneEnv.getMode;
    var setMode = ArcaneEnv.setMode;
    class Create {
        token;
        directory;
        _instance;
        _name;
        _description;
        _version = '0.0.0';
        _info;
        _argv = [];
        _config_file;
        _workdir;
        _config = {};
        _bus;
        _log;
        _homedir;
        _manager;
        get workdir() {
            return this._workdir;
        }
        get homedir() {
            return this._homedir;
        }
        get manager() {
            return this._manager;
        }
        get mode() {
            return getMode();
        }
        get instance() {
            return this._instance;
        }
        get name() {
            return this._name;
        }
        get description() {
            return this._description;
        }
        get version() {
            return this._version;
        }
        get info() {
            return this._info;
        }
        get argv() {
            return this._argv;
        }
        get configFile() {
            return this._config_file;
        }
        get config() {
            return this._config;
        }
        get bus() {
            return this._bus;
        }
        get log() {
            return this._log;
        }
        constructor(token, directory) {
            this.token = token;
            this.directory = directory;
            this._instance = new Command();
            this._info = ArcaneManager.packageInfo(directory);
            this._bus = new Signal.Stack();
            this._log = Terminal.Display;
            this._homedir = ArcaneDirectory.initialize(`${os.homedir()}/.${token}`);
            this._workdir = `${this._homedir}`;
            this._config_file = `${this._homedir}/arcane.config.json`;
            this._manager = new ArcaneRune.Manager(this);
        }
        presets() {
            this._instance.option("--set-mode <mode>", "Set mode", (mode) => setMode(mode));
            this._instance.option("--debug-mode", "Set mode to DEBUG", () => setMode("debug"));
            this._instance.option("--dev-mode", "Set mode to DEV", () => setMode("dev"));
            this._instance.option("--prod-mode", "Set mode to PROD", () => setMode("prod"));
            this._instance.option("--get-mode", "Get mode", () => getMode());
            this._instance.option("--silent", "Deactivate verbose", () => deactivateVerbose());
            this._instance.option("--pkg-_manager <value>", "Set package _manager", (value) => setPkgManager(value));
            this._instance.option("--use-npm", "Set NPM as package _manager", () => setPkgManager("npm"));
            this._instance.option("--use-pnpm", "Set PNPM as package _manager", () => setPkgManager("pnpm"));
            this._instance.option("--use-yarn", "Set YARN as package _manager", () => setPkgManager("yarn"));
            this._instance.option("--use-bun", "Set BUN as package _manager", () => setPkgManager("bun"));
            this._manager
                .register(new ArcaneProgramRunes.Install())
                .register(new ArcaneProgramRunes.Remove());
            return this;
        }
        initializeDirectories() {
            return this;
        }
        initializeConfig() {
            if (!fs.existsSync(this._config_file))
                fs.writeFileSync(this._config_file, JSON.stringify({ runes: [] }, null, 2), { encoding: 'utf-8' });
            this._config = new ArcaneConfig.Loader(this._config_file);
            return this;
        }
        initialize() {
            this._name = this._info?.name || this._name || 'undefined';
            this._description = this._info?.description || this._description || 'undefined';
            this._version = this._info?.version || this._version || 'undefined';
            this._instance.name(this._name);
            this._instance.version(this._version);
            this._instance.description(this._description);
            activateVerbose();
            return this.initializeDirectories().initializeConfig().presets();
        }
        async mount() {
            await this._manager.mount(this.config.get('runes') || []);
            return this;
        }
        execute(cmd) {
            execSync(`cd ${this._homedir} && ${cmd}`);
        }
        async run(argv) {
            this.initialize()._argv = ArcaneManager.serializeArgv(argv);
            await this.mount();
            return this._instance.parse(this._argv);
        }
    }
    ArcaneProgram.Create = Create;
    class Hook {
    }
    ArcaneProgram.Hook = Hook;
    class Middleware {
    }
    ArcaneProgram.Middleware = Middleware;
})(ArcaneProgram || (ArcaneProgram = {}));
