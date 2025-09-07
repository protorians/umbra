import { LayerVariant } from "../../enums.js";
import { Color, SmallerText } from "@protorians/widgets";
export function ThemeBadge(theme, { children, variant, value, floating }) {
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
    });
    return children.ready(({ widget }) => {
        widget.content(badgeWidget);
        if (floating) {
            widget.style({ position: 'relative', });
            badgeWidget.style({
                position: 'absolute',
                top: '-30%',
                right: '-40%',
            });
        }
    });
}
