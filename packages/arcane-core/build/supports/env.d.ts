export declare namespace ArcaneEnv {
    function getMode(): string | undefined;
    function setMode(mode: string): void;
    function isVerbose(): string | undefined;
    function activateVerbose(): void;
    function deactivateVerbose(): void;
    function getPkgManager(): string;
    function setPkgManager(manager: string): void;
}
