import {execSync} from "child_process";

export const GIT_BOILERPLATE_REPO_URL = "https://github.com/protorians/package-boilerplate.git";


/**
 *
 * @param {string} pkg
 * @returns {string}
 */
export function getCurrentPackageBranch(pkg) {
    // Determine the current branch from the repository root rather than inside the package
    // Packages are directories within the monorepo and not separate git repositories.
    return execSync(`git rev-parse --abbrev-ref HEAD`).toString().trim();
}


export function ensureRemote(name, gitUrl) {
    try {
        const remotes = execSync('git remote -v', {encoding: 'utf8'});
        const hasRemote = remotes.split('\n').some(line => line.startsWith(`${name}\t`));
        if (!hasRemote) {
            execSync(`git remote add ${name} ${gitUrl}`, {stdio: 'inherit'});

        } else {
            const lines = remotes.split('\n').filter(Boolean);
            const fetchLine = lines.find(l => l.startsWith(`${name}\t`) && l.includes('(fetch)')) || '';
            const currentUrl = fetchLine.split('\t')[1]?.split(' ')[0] || '';
            if (currentUrl && currentUrl !== gitUrl) {
                execSync(`git remote set-url ${name} ${gitUrl}`, {stdio: 'inherit'});

            }
        }
    } catch (e) {
        console.error(e);
    }

}

export function stashBefore(tm) {
    const status = execSync('git status --porcelain', {encoding: 'utf8'}).trim();
    if (status) {
        console.log('[stash] Working tree dirty, stashing changes...');
        execSync('git stash push -u -k -m "auto-stash before subtree add"', {stdio: 'inherit'});
        tm.__stashed = true;
        return true
    }
    return false;
}


export function subtreeAddOrPull(name, branch = getCurrentPackageBranch(name)) {
    try {
        execSync(`git subtree add --prefix=packages/${name} ${name} ${branch} --squash`, {stdio: 'inherit'});
    } catch (e) {
        const msg = String(e?.message || e);
        const knownPrefixErr = msg.includes('already exists') || msg.includes('prefix') || msg.includes('A subtree already exists');
        if (knownPrefixErr) {
            console.log('[info] Subtree prefix exists. Performing pull instead.');
            try {
                execSync(`git subtree pull --prefix=packages/${name} ${name} ${branch} --squash`, {stdio: 'inherit'});
            } catch (e2) {
                console.error(e2);
            }
        } else {
            console.error(e);
        }
    }
}


export function initNewerPackage(newer) {
    if (!newer) return;
    execSync(`cd packages/${name} && git clone ${GIT_BOILERPLATE_REPO_URL} . && pnpm install`, {stdio: 'inherit'});

}

export function stashAfter(tm) {
    if (!tm.__stashed) return;
    console.log('[stash] Restoring stashed changes...');
    try {
        execSync('git stash pop', {stdio: 'inherit'});
    } catch (e) {
        console.warn('[stash] git stash pop resulted in conflicts. Please resolve them manually.');
    }
}