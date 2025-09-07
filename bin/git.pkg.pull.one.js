import {execSync} from 'child_process';
import {getCurrentPackageBranch} from '../library/git.utilities.js';

function execOut(command) {
  return execSync(command, {encoding: 'utf8'}).trim();
}

function run() {
  const name = process.argv[2];
  const branchArg = process.argv[3] || null;

  if (!name) {
    console.error('Usage: node ./bin/git.pkg.pull.one.js <packageName> [branch]');
    process.exit(1);
  }

  const branch = branchArg || getCurrentPackageBranch(name);

  let stashed = false;
  try {
    // Detect dirty working tree and stash if needed
    const status = execOut('git status --porcelain');
    if (status) {
      console.log('[stash] working tree dirty, stashing...');
      execSync('git stash push -u -k -m "auto-stash before subtree pull"', {stdio: 'inherit'});
      stashed = true;
    }

    // Perform the subtree pull with squash
    const prefix = `packages/${name}`;
    console.log(`[pull] git subtree pull --prefix=${prefix} ${name} ${branch} --squash`);
    execSync(`git subtree pull --prefix=${prefix} ${name} ${branch} --squash`, {stdio: 'inherit'});
  } finally {
    if (stashed) {
      console.log('[stash] restoring...');
      try {
        execSync('git stash pop', {stdio: 'inherit'});
      } catch (e) {
        console.warn('[stash] pop had conflicts, resolve manually');
      }
    }
  }
}

run();
