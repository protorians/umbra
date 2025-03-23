import type {IProviderAgent, IProviderCallable} from "../types/index.js";
import {ColorPalette} from "../colors/index.js";
import type {IColorExtended, IColorKey, IColorScheme} from "@protorians/colorimetric";


export function colorPaletteAgent(scheme: 'light' | 'dark'): IProviderCallable {

    return (provider: IProviderAgent) => {
        const declarations = Object.entries(provider.declarations)
        const prefix = '--color-';

        if (provider.scopes.length) {
            provider.scopes.forEach((scope) => {
                if (scope.startsWith(prefix))
                    ColorPalette.variable((scope.substring(prefix.length)) as IColorExtended<IColorKey>);
            })
        }

        if (declarations.length) {
            const palette: IColorScheme = {} as IColorScheme;

            declarations
                .forEach(([key, value]) =>
                    (key.startsWith(prefix)) ? palette[key.substring(prefix.length)] = value : void (0));

            ColorPalette[scheme] = {...ColorPalette[scheme], ...palette};
        }
    }

}