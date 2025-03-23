export namespace ArcaneEnv {

    const PKG_AVAILABLE_MANAGERS: string[] = ["npm", "pnpm", "yarn", "bun"];

    export function getMode() {
        return process.env.ARCANE_MODE || undefined;
    }

    export function setMode(mode: string) {
        process.env.ARCANE_MODE = mode.toUpperCase();
    }

    export function isVerbose() {
        return process.env.ARCANE_VERBOSE;
    }

    export function activateVerbose() {
        process.env.ARCANE_VERBOSE = "activate";
    }

    export function deactivateVerbose() {
        process.env.ARCANE_VERBOSE = undefined;
    }

    export function getPkgManager() {
        return process.env.ARCANE_PACKAGE_MANAGER || "npm";
    }

    export function setPkgManager(manager: string) {
        process.env.ARCANE_PACKAGE_MANAGER = PKG_AVAILABLE_MANAGERS.includes(manager) ? manager : undefined;
    }

}