import { Excavator } from "./excavator.js";
import { Compilate } from "./compilate.js";
import './rules.config.js';
import { getRules } from "./rules.directive.js";
import * as path from "node:path";
import { Configurator } from "./configurator.js";
import { Synchronous } from "./synchronous.js";
import { CompilateCss } from "./compilate.css.js";
export function vitePlugin() {
    const configurator = new Configurator();
    const css = new CompilateCss(configurator);
    const compilator = new Compilate({
        rules: getRules()
    });
    Synchronous.synchronizable(css);
    Synchronous.synchronizable(compilator);
    return {
        name: "widgetui-vite-plugin",
        enforce: 'pre',
        async config() {
        },
        configResolved(config) {
            const buildDir = path.join(config.root, config.build.outDir);
            Synchronous
                .defineDirectories({
                root: config.root,
                cache: config.cacheDir,
                public: config.publicDir,
                build: buildDir,
                assets: path.join(buildDir, config.build.assetsDir),
            })
                .defineCommand(config.command || config.mode);
        },
        transformIndexHtml(html) {
            return html.replace('</head>', `
<link rel="stylesheet" href="${Synchronous.file}">
</head>`);
        },
        async transform(source, id) {
            if (source && (id.endsWith(".ts") ||
                id.endsWith(".js"))) {
                const excavate = new Excavator(source, id);
                if (excavate.accepted) {
                    excavate.make(compilator);
                    Synchronous.make();
                }
            }
            if (source && (id.endsWith(".css") ||
                id.endsWith(".less") ||
                id.endsWith(".scss") ||
                id.endsWith(".sass"))) {
                await css.parse(source, id);
                css.compilates();
                Synchronous.make();
                return {
                    code: `/* WidgetUI : parsed */
${css.source || '/* No output found */'}`,
                    map: null,
                };
            }
            return null;
        },
    };
}
