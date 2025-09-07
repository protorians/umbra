import * as cliProgress from "cli-progress";
import * as colors from "ansi-colors";
import ora from "ora";
export var ArcaneProgress;
(function (ArcaneProgress) {
    function create(options) {
        return new cliProgress.SingleBar({
            format: `${options.name || 'Loading...'} ${colors.bgBlackBright('{bar}')} {value}/{total} ({percentage}%)`,
            barCompleteChar: '\u2588',
            barIncompleteChar: '\u2591',
            hideCursor: typeof options.cursor === 'undefined' ? true : options.cursor,
            clearOnComplete: typeof options.cleanable === 'undefined' ? true : options.cleanable,
        }, cliProgress.Presets.shades_classic);
    }
    ArcaneProgress.create = create;
    async function createSpinner(label) {
        return ora(label);
    }
    ArcaneProgress.createSpinner = createSpinner;
})(ArcaneProgress || (ArcaneProgress = {}));
