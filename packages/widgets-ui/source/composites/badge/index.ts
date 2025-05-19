import {LayerVariant} from "../../enums.js";
import {IThemeBadgeOptions} from "./type.js";
import {ITheme} from "../../types/index.js";
import {Color, IWidgetNode, SmallerText} from "@protorians/widgets";

export function ThemeBadge(
    theme: ITheme,
    {children, variant, value, floating}: IThemeBadgeOptions
): IWidgetNode<any, any> {

    const _variant = variant || LayerVariant.Normal;
    const coloring = theme.coloringResolves(_variant);
    const badgeWidget = SmallerText({
        style: {
            backgroundColor: Color[coloring.back || 'tint'],
            color: Color[coloring.fore || 'text'],
            borderColor: Color[coloring.edge || 'tint'],
            borderStyle: theme.settings.borderStyle,
            borderWidth: theme.settings.borderWidth,
            borderRadius: theme.settings.radiusMax,
            paddingX: .3,
            paddingY: .1,
            fontSize: '9px',
        },
        children: `${value}`,
    })

    return children.ready(({widget}) => {
        console.log('Badge', value, coloring, _variant);
        widget.content(badgeWidget)

        if (floating) {
            widget.style({position: 'relative',})
            badgeWidget.style({
                position: 'absolute',
                top: '-30%',
                right: '-40%',
            })
        }
    });
}