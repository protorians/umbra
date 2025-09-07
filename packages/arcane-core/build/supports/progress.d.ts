import { SingleBar } from "cli-progress";
import { ProgressOptions } from "../types/index.js";
export declare namespace ArcaneProgress {
    function create(options: ProgressOptions): SingleBar;
    function createSpinner(label: string): Promise<import("ora").Ora>;
}
