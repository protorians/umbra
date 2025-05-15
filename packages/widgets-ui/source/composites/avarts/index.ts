import {Color, IWidgetNode, ObjectSize, Stack} from "@protorians/widgets";
import {ITheme} from "../../types/index.js";
import {ThemeAvatarsProps} from "./type.js";
import {getObjectSize} from "../../utilities/index.js";

export function ThemeAvatars(
    theme: ITheme,
    {loader, rounded, direction, size, fallback, sources, borderless}: ThemeAvatarsProps
): IWidgetNode<any, any> | undefined {
    const gap = getObjectSize(size || ObjectSize.Medium);

    return theme.ScrollArea({
        direction,
        hideScroll: true,
        children: Stack({
            style: {
                flexDirection: direction,
                backgroundColor: Color.tint_900_a8,
                backdropFilter: `blur(${theme.settings.blurred || '2rem'})`,
                borderRadius: `${theme.settings.radiusHigh || '7rem'}`,
                padding: `${theme.settings.borderWidthMax || '1px'}`,
            },
            children: sources?.map((source, index) =>
                theme.Avatar({
                    source,
                    loader,
                    rounded,
                    direction,
                    size,
                    fallback,
                    borderless,
                })?.style({
                    marginLeft: index === 0 ? '0' : `-${gap / 3}px`,
                })
            )
        })
    })
}