"use server";

import path from "node:path";
import * as url from "node:url";
import * as fs from "node:fs";

const __dirname = (path.dirname(import.meta.url))

export async function test2Action() {
    const dir = url.fileURLToPath(path.dirname(__dirname));

    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
        return fs.readdirSync(dir, {recursive: true})
    }

    return 'No data';
}