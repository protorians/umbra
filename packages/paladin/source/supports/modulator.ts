import {resolve, dirname} from 'path';
import {existsSync} from 'fs';
import {pathToFileURL, fileURLToPath} from 'url';
import {Terminal} from "@protorians/arcane-core";

export class Modulator {

    protected static stack: Map<string, string> = new Map();

    static async import<T>(pathname: string, base: string = import.meta.url): Promise<T | undefined> {
        const filename = resolve(dirname(fileURLToPath(base)), `${pathname}`);

        if (this.stack.has(filename)) {
            Terminal.Display.log(`MOD:CACHE`, `Cache used : ${filename}`);
            return this.stack.get(filename) as T;
        }
        if (!existsSync(filename)) return undefined;

        const mod = await import(pathToFileURL(filename).href);
        this.stack.set(filename, mod);
        return mod;
    }

}