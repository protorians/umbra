import { ObjectSize, Stack } from "@protorians/widgets";
import { getObjectSize } from "../../utilities/index.js";
export function ThemeAvatars(theme, { loader, rounded, direction, size, fallback, sources, borderless }) {
    const gap = getObjectSize(size || ObjectSize.Medium);
    return theme.ScrollArea({
        direction,
        hideScroll: true,
        children: Stack({
            style: {
                flexDirection: direction,
                padding: `${theme.settings.borderWidthMax || '1px'}`,
            },
            children: sources?.map((source, index) => theme.Avatar({
                source,
                loader,
                rounded,
                direction,
                size,
                fallback,
                borderless,
            })?.style({
                marginLeft: index === 0 ? '0' : (gap ? `-${gap / 3}px` : '100%'),
            }))
        })
    });
}
