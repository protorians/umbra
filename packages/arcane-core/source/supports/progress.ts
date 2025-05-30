import {SingleBar} from "cli-progress";
import * as cliProgress from "cli-progress";
import * as colors from "ansi-colors";
import {ProgressOptions} from "../types/index.js";
import ora from "ora";

export namespace ArcaneProgress {

    export function create(options: ProgressOptions): SingleBar {
        return new cliProgress.SingleBar({
            format: `${options.name || 'Loading...'} ${colors.bgBlackBright('{bar}')} {value}/{total} ({percentage}%)`,
            barCompleteChar: '\u2588',
            barIncompleteChar: '\u2591',
            hideCursor: typeof options.cursor === 'undefined' ? true : options.cursor,
            clearOnComplete: typeof options.cleanable === 'undefined' ? true : options.cleanable,
        }, cliProgress.Presets.shades_classic)
    }


    export async function createSpinner(label: string) {
        return ora(label);
    }

}