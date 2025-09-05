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

function getLatestSplitCommit(subtreePath, branch) {
    console.log(`\n[split] Creating subtree split for: ${subtreePath}, ${branch}`);
    return exec(`git subtree split --prefix=${subtreePath} main`);
}

function getRemoteHeadCommit(remoteName, branch) {
    try {
        const output = exec(`git ls-remote ${remoteName} refs/heads/${branch}`);
        return output.split('\t')[0];
    } catch {
        return null;
    }
}

function pushSubtree(remoteName, branch, commitHash) {
    console.log(`[push] Pushing ${commitHash} → ${remoteName}/${branch}`);
    exec(`git push ${remoteName} ${commitHash}:${branch} --force`);
    console.log(`[done] ${remoteName} updated.`);
}

function run() {
    const subtrees = fs.readdirSync(SUBTREE_ROOT).filter(name => {
        const fullPath = path.join(SUBTREE_ROOT, name);
        return fs.statSync(fullPath).isDirectory();
    });

    for (const name of subtrees) {
        const subtreePath = path.join(SUBTREE_ROOT, name);
        const remoteName = name;
        const remoteUrl = `${REMOTE_BASE_URL}${name}.git`;
        const branch = REMOTE_BRANCH ?? getCurrentPackageBranch(name);

        ensureRemoteExists(remoteName, remoteUrl);

        const splitCommit = getLatestSplitCommit(subtreePath, branch);
        const remoteCommit = getRemoteHeadCommit(remoteName, branch);

        if (splitCommit === remoteCommit) {
            console.log(`[skip] No changes to push for ${name}.`);
        } else {
            pushSubtree(remoteName, branch, splitCommit);
        }
    }
}

run();
