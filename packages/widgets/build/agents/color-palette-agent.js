import { ColorPalette } from "../colors/index.js";
export function colorPaletteAgent(scheme) {
    return (provider) => {
        const declarations = Object.entries(provider.declarations);
        const prefix = '--color-';
        if (provider.scopes.length) {
            provider.scopes.forEach((scope) => {
                if (scope.startsWith(prefix))
                    ColorPalette.variable((scope.substring(prefix.length)));
            });
        }
        if (declarations.length) {
            const palette = {};
            declarations
                .forEach(([key, value]) => (key.startsWith(prefix)) ? palette[key.substring(prefix.length)] = value : void (0));
            ColorPalette[scheme] = { ...ColorPalette[scheme], ...palette };
        }
    };
}
