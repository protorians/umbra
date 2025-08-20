import {
    Column,
    declarationExplodes,
    IAttributes,
    IWidgetDeclaration,
    IWidgetNode,
    Row,
    Style
} from "@protorians/widgets";
import {IThemeCardOptions} from "./type.js";
import {ITheme} from "../../types/index.js";
import {LayerVariant} from "../../enums.js";


export function ThemeCard(
    theme: ITheme,
    declarations: IWidgetDeclaration<HTMLElement, IThemeCardOptions & IAttributes>
) {

    const {
        declaration,
        extended
    } = declarationExplodes<IWidgetDeclaration<HTMLElement, IThemeCardOptions & IAttributes>, IThemeCardOptions>(
        declarations, ['helmet', 'actions', 'children', 'footer', 'variant', 'styles', 'outline']
    );

    const variant = extended.variant || LayerVariant.Normal;
    const style = Style({})
        .merge(declaration.style)
        .merge({
            display: "flex",
            flexDirection: "column",
        });

    return theme.Layer({
        ...declaration,
        variant,
        outline: extended.outline,
        styles: {
            widget: Style({}).merge(extended.styles?.widget)
        },
        children: Column({
            style,
            children: [

                Row({
                    style:{
                        alignItems: "flex-start",
                    },
                    children: [
                        extended.helmet ? Row({
                            style: extended.styles?.helmet,
                            children: extended.helmet,
                        })?.style({
                            flex: '1 1 auto !important',
                        }) : undefined,

                        extended.actions ? Row({
                            style: extended.styles?.actions,
                            children: extended.actions
                        }) : undefined,
                    ]
                }),

                Column({
                    style: extended.styles?.children,
                    children: extended.children,
                }),

                extended.footer
                    ? Row({
                        style: extended.styles?.footer,
                        children: extended.footer,
                    })
                    : undefined,
            ]
        })
    }) as IWidgetNode<any, any>
}