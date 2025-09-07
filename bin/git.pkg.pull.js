import {execSync} from 'child_process';
import fs from 'fs';
import path from 'path';
import {getCurrentPackageBranch} from "../library/git.utilities.js";

const SUBTREE_ROOT = './packages';
const REMOTE_BASE_URL = 'https://github.com/protorians/';
const REMOTE_BRANCH = process.argv[2] || null;

function exec(command) {
    return execSync(command, {encoding: 'utf8'}).trim();
}

function ensureRemoteExists(name, url) {
    const remotes = exec('git remote -v');
    if (!remotes.includes(`${name}\t${url}`)) {
        console.log(`[info] Adding remote "${name}" → ${url}`);
        exec(`git remote add ${name} ${url}`);
    }
}

function pullSubtree(prefix, remoteName, branch) {
    try {
        console.log(`[pull] Pulling ${remoteName}/${branch} → ${prefix}`);
        execSync(`git subtree pull --prefix=${prefix} ${remoteName} ${branch} --squash`, { stdio: 'inherit' });
        console.log(`[done] ${remoteName} merged into ${prefix}.`);
    } catch (e) {
        console.log(e);
    }
}

function run() {
    const subtrees = fs.readdirSync(SUBTREE_ROOT).filter(name => {
        const fullPath = path.join(SUBTREE_ROOT, name);
        return fs.statSync(fullPath).isDirectory();
    });

    // Stash uncommitted changes to avoid git subtree failure on dirty working tree
    let stashed = false;
    try {
        // Check if there are local modifications
        const status = exec('git status --porcelain');
        if (status) {
            console.log('[stash] Working tree dirty, stashing changes...');
            exec('git stash push -u -k -m "auto-stash before subtree pulls"');
            stashed = true;
        }

        for (const name of subtrees) {
            const subtreePath = path.join(SUBTREE_ROOT, name);
            const remoteName = name;
            const remoteUrl = `${REMOTE_BASE_URL}${name}.git`;
            const branch = REMOTE_BRANCH ?? getCurrentPackageBranch(name);

            ensureRemoteExists(remoteName, remoteUrl);
            pullSubtree(subtreePath, remoteName, branch);
        }
    } finally {
        if (stashed) {
            console.log('[stash] Restoring stashed changes...');
            try {
                exec('git stash pop');
            } catch (e) {
                console.warn('[stash] git stash pop resulted in conflicts. Please resolve them manually.');
            }
        }
    }
}

run();
