import {IWidgetNode, ObjectSize, Stack} from "@protorians/widgets";
import {ITheme} from "../../types/index.js";
import {ThemeAvatarsOptions} from "./type.js";
import {getObjectSize} from "../../utilities/index.js";

export function ThemeAvatars(
    theme: ITheme,
    {loader, rounded, direction, size, fallback, sources, borderless}: ThemeAvatarsOptions
): IWidgetNode<any, any> | undefined {
    const gap = getObjectSize(size || ObjectSize.Medium);

    return theme.ScrollArea({
        direction,
        hideScroll: true,
        children: Stack({
            style: {
                flexDirection: direction,
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
                    marginLeft: index === 0 ? '0' : (gap ? `-${gap / 3}px` : '100%'),
                })
            )
        })
    })
}