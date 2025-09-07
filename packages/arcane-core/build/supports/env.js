export var ArcaneEnv;
(function (ArcaneEnv) {
    const PKG_AVAILABLE_MANAGERS = ["npm", "pnpm", "yarn", "bun"];
    function getMode() {
        return process.env.ARCANE_MODE || undefined;
    }
    ArcaneEnv.getMode = getMode;
    function setMode(mode) {
        process.env.ARCANE_MODE = mode.toUpperCase();
    }
    ArcaneEnv.setMode = setMode;
    function isVerbose() {
        return process.env.ARCANE_VERBOSE;
    }
    ArcaneEnv.isVerbose = isVerbose;
    function activateVerbose() {
        process.env.ARCANE_VERBOSE = "activate";
    }
    ArcaneEnv.activateVerbose = activateVerbose;
    function deactivateVerbose() {
        process.env.ARCANE_VERBOSE = undefined;
    }
    ArcaneEnv.deactivateVerbose = deactivateVerbose;
    function getPkgManager() {
        return process.env.ARCANE_PACKAGE_MANAGER || "npm";
    }
    ArcaneEnv.getPkgManager = getPkgManager;
    function setPkgManager(manager) {
        process.env.ARCANE_PACKAGE_MANAGER = PKG_AVAILABLE_MANAGERS.includes(manager) ? manager : undefined;
    }
    ArcaneEnv.setPkgManager = setPkgManager;
})(ArcaneEnv || (ArcaneEnv = {}));
