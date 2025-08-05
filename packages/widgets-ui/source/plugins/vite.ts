import {Excavator} from "./excavator.js";
import {Compilator} from "./compilator.js";
import './rules.config.js'
import {getRules} from "./rules.directive.js";
import * as path from "node:path";
import {Configurator} from "./configurator.js";
import {Synchronous} from "./synchronous.js";

export function vitePlugin() {

    const configurator = new Configurator();
    const compilator = new Compilator({
        rules: getRules()
    });

    Synchronous.synchronizable(configurator);
    Synchronous.synchronizable(compilator);

    return {
        name: "widgetui-vite-plugin",
        enforce: 'pre',
        async config() {
        },
        configResolved(config: any) {
            const buildDir = path.join(config.root, config.build.outDir);

            Synchronous
                .defineDirectories({
                    root: config.root,
                    cache: config.cacheDir,
                    public: config.publicDir,
                    build: buildDir,
                    assets: path.join(buildDir, config.build.assetsDir),
                })
                .defineCommand(config.command || config.mode)
            ;
        },
        transformIndexHtml(html: string) {
            return html.replace('</head>', `
<link rel="stylesheet" href="${Synchronous.file}">
</head>`);
        },
        async transform(source: string, id: string) {

            if (
                source && (
                    id.endsWith(".ts") ||
                    id.endsWith(".js") ||
                    id.endsWith(".htm") ||
                    id.endsWith(".html") ||
                    id.endsWith(".svg")
                )
            ) {
                const excavate = new Excavator(source, id);
                if (excavate.accepted) {
                    excavate.make(compilator);
                    Synchronous.make();
                }
            }


            if (
                source && (
                    id.endsWith(".css") ||
                    id.endsWith(".less") ||
                    id.endsWith(".scss") ||
                    id.endsWith(".sass")
                )
            ) {
                await configurator.parse(source, id);
                configurator.compilates();
                Synchronous.make();

                return {
                    code: `/* WidgetUI : parsed */
${configurator.source}`,
                    map: null,
                }
            }

            return null;
        },

        // buildEnd() {
        //     console.log('🎨 Variables par thème extraites :');
        //     console.dir(configurator.variables, {depth: null});
        // }
    }
}