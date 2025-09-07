export declare namespace ArcaneDirectory {
    function initialize(directory: string): string;
    function copy(name: string, from: string, to: string): string[];
}
export declare namespace ThreadFile {
    function extraction(name: string, filename: string, output: string): Promise<unknown>;
    function extractWithoutProgression(filename: string, output: string): Promise<any>;
    function extractWithProgression(name: string, filename: string, output: string): any;
}
