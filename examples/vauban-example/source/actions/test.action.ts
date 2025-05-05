"use server";

import path from "node:path";
import * as url from "node:url";
import * as fs from "node:fs";

const __dirname = (path.dirname(import.meta.url))

export async function testAction(id: number) {
    const dir = url.fileURLToPath(__dirname);
    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
        return {
            file : fs.readdirSync(dir, {recursive: true}),
            id,
        }
    }
    return undefined;
}

export async function testActionDouble() {
    const dir = url.fileURLToPath(__dirname);

    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
        return fs.readdirSync(dir, {recursive: true})
    }

    return 'No data';
}