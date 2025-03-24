import {execSync} from "node:child_process";


export function setGitHooksPath() {
    return execSync('git config core.hooksPath .githooks')
}

export function unsetGitHooksPath() {
    return execSync('git config core.hooksPath .git/hooks')
}