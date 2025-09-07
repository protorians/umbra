import {execSync} from "child_process";


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