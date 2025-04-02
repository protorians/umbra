import * as fs from "fs";
import * as path from "path";

export function removeWorkspaceVersion(rootDir) {
    rootDir = rootDir || process.cwd();
    const packagesDir = path.join(rootDir, "packages");

    const versions = {};
    fs.readdirSync(packagesDir).forEach((pkg) => {
        const json = path.join(packagesDir, pkg, "package.json");
        if (fs.existsSync(json)) {
            const config = JSON.parse(fs.readFileSync(json, "utf-8"));
            versions[config.name] = config.version;
        }
    });

    fs.readdirSync(packagesDir).forEach((pkg) => {
        const json = path.join(packagesDir, pkg, "package.json");
        if (fs.existsSync(json)) {
            const config = JSON.parse(fs.readFileSync(json, "utf-8"));
            let updated = false;

            ["dependencies", "devDependencies", "peerDependencies"].forEach((depType) => {
                if (config[depType]) {
                    Object.keys(config[depType]).forEach((dep) => {
                        if (config[depType][dep].startsWith("workspace:")) {
                            const newVersion = versions[dep];
                            if (newVersion) {
                                config[depType][dep] = newVersion;
                                updated = true;
                            }
                        }
                    });
                }
            });

            if (updated) {
                fs.writeFileSync(json, JSON.stringify(config, null, 2) + "\n");
                console.info(`Update : ${path.relative(rootDir, json)}`);
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

