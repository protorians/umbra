import './rules.config.js';
export declare function vitePlugin(): {
    name: string;
    enforce: string;
    config(): Promise<void>;
    configResolved(config: any): void;
    transformIndexHtml(html: string): string;
    transform(source: string, id: string): Promise<{
        code: string;
        map: null;
    } | null>;
};
