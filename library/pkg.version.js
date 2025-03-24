import * as fs from "fs";
import * as path from "path";

export function removeWorkspaceVersion(rootDir) {
    rootDir = rootDir || process.cwd();
    const packagesDir = path.join(rootDir, "packages");

    const versions = {};
    fs.readdirSync(packagesDir).forEach((pkg) => {
        const packageJsonPath = path.join(packagesDir, pkg, "package.json");
        if (fs.existsSync(packageJsonPath)) {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
            versions[packageJson.name] = packageJson.version;
        }
    });

    fs.readdirSync(packagesDir).forEach((pkg) => {
        const packageJsonPath = path.join(packagesDir, pkg, "package.json");
        if (fs.existsSync(packageJsonPath)) {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
            let modified = false;

            ["dependencies", "devDependencies", "peerDependencies"].forEach((depType) => {
                if (packageJson[depType]) {
                    Object.keys(packageJson[depType]).forEach((dep) => {
                        if (packageJson[depType][dep].startsWith("workspace:")) {
                            const newVersion = versions[dep];
                            if (newVersion) {
                                packageJson[depType][dep] = newVersion;
                                modified = true;
                            }
                        }
                    });
                }
            });

            if (modified) {
                fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");
                console.info(`Update : ${packageJsonPath}`);
            }
        }
    });
}


export function rollbackWorkspaceVersion(rootDir) {
    rootDir = rootDir || process.cwd();
    const packagesDir = path.join(rootDir, "packages");

    const versions = {};
    fs.readdirSync(packagesDir).forEach((pkg) => {
        const packageJsonPath = path.join(packagesDir, pkg, "package.json");
        if (fs.existsSync(packageJsonPath)) {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
            versions[packageJson.name] = packageJson.version;
        }
    });

    const prepare = [...fs.readdirSync(packagesDir)]
        .filter((pkg) => !pkg.startsWith("."))
        .map((pkg) => {
            const packageJsonPath = path.join(packagesDir, pkg, "package.json");
            if (fs.existsSync(packageJsonPath)) {
                return {
                    ...JSON.parse(fs.readFileSync(packageJsonPath, "utf-8")),
                    path: packageJsonPath,
                    directoryName: pkg
                };
            }
            return undefined;
        });
    const list = prepare.map((pkg) => pkg.name);

    prepare.forEach((pkg) => {

        let modified = false;

        ["dependencies", "devDependencies", "peerDependencies"].forEach((depType) => {
            if (pkg[depType]) {
                Object.keys(pkg[depType]).forEach((dep) => {
                    if (!pkg[depType][dep].startsWith("workspace:") && list.includes(dep) ) {
                        pkg[depType][dep] = "workspace:";
                        modified = true;
                    }
                });
            }
        });

        if (modified) {
            const jsonFile = `${pkg.path}`;
            delete pkg.path;
            delete pkg.directoryName;
            fs.writeFileSync(jsonFile, JSON.stringify(pkg, null, 2) + "\n");
            console.info(`Rollback : ${path.relative(rootDir, jsonFile)}`);
        } else {
        }

    });
}

