import {execSync} from "child_process";


/**
 *
 * @param {string} pkg
 * @returns {string}
 */
export function getCurrentPackageBranch(pkg) {
  return execSync(`cd ./packages/${pkg} && git rev-parse --abbrev-ref HEAD`).toString().trim();
}