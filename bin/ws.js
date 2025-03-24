import {Command} from "commander";
import {setGitHooksPath, unsetGitHooksPath} from "../library/git.hooks.path.js";
import {execSync} from "node:child_process";
import {rollbackWorkspaceVersion, removeWorkspaceVersion} from "../library/pkg.version.js";

const ws = new Command()
const directory = process.cwd();

ws.name('mode-manager')
    .command('mode')
    .description('Project mode manager')
    .argument("<string>", "Set mode (dev, prod)",)
    .action((mode) => {
        if (mode === 'dev') {
            console.log('TASK', 'Active DEV workspace mode...')
            execSync("chmod +x .githooks/pre-push")
            setGitHooksPath()
        }
        if (mode === 'prod') {
            console.log('TASK', 'Active PROD workspace mode...')
            unsetGitHooksPath()
        } else
            console.log('TASK', 'Mode not available')
    })


ws.name('build-manager')
    .command('build')
    .description('Project build manager')
    .argument("<string>", "Set mode (dev, prod)",)
    .action((mode) => {
        if (mode === 'dev') {
            console.log('TASK', 'Build DEV workspace mode...')
            rollbackWorkspaceVersion(directory)
        }
        if (mode === 'prod') {
            console.log('TASK', 'Build PROD workspace mode...')
            removeWorkspaceVersion(directory)
        }
    })


ws.parse(process.argv);