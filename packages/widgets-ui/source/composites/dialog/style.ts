import {Color, type IStyleSheetDeclarations, Style} from "@protorians/widgets";
import type {IColoringLayer, ITheme} from "../../types/index.js";


export class DialogStyle {

    static Container(theme: ITheme, coloring: IColoringLayer): IStyleSheetDeclarations {
        return {
            width: 'calc(100vw - 2rem)',
            maxWidth: '380px',
            color: coloring.fore ? Color[coloring.fore] : Color.tint,
            backgroundColor: coloring.back ? Color[coloring.back] : Color.tint_a8,
            borderWidth: theme.settings.borderWidth || '2px',
            borderStyle: theme.settings.borderStyle || 'solid',
            borderColor: coloring.edge ? Color[`${coloring.edge}`] : 'transparent',
            borderRadius: theme.settings.radius,
            boxShadow: theme.settings.shadow || 'none',
        }
    }

    static Buttons(theme: ITheme, coloring: IColoringLayer): IStyleSheetDeclarations {
        return {
            borderRadius: '0',
            '& > *': Style({
                flex: '1 1 auto',
                borderRadius: '0',
                boxShadow: 'none',
                color: coloring.fore ? Color[coloring.fore] : Color.tint,
                backgroundColor: 'transparent',
                paddingX: 1,
                paddingY: .9,
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                borderTopWidth: `calc(${theme.settings.borderWidth || '2px'} / 2)`,
                borderColor: coloring.edge ? Color[`${coloring.edge}`] : 'transparent',
                borderRightWidth: `calc(${theme.settings.borderWidth || '2px'} / 2)`,

                '& *:first-child': Style({
                    borderBottomLeftRadius: theme.settings.radius,
                }),
                '& *:last-child': Style({
                    borderBottomRightRadius: theme.settings.radius,
                    borderRightWidth: `0`,
                })
            })
        }
    }

    static Content(): IStyleSheetDeclarations {
        return {
            minHeight: 7,
        }
    }

    static Icon(): IStyleSheetDeclarations {
        return {
            paddingLeft: 1.5,
            paddingY: 2,
            alignItems: 'center',
            justifyContent: 'center',
        }
    }
}
