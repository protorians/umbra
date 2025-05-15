import {ThemeAvatarProps} from "./type.js";
import {Color, ICommonAttributes, Image, IWidgetNode, ObjectRounded, ObjectSize, Stack} from "@protorians/widgets";
import {ITheme} from "../../types/index.js";
import {getObjectSize} from "../../utilities/index.js";
import {readBlobFile} from "@protorians/core";

export function ThemeAvatar(
    theme: ITheme,
    {loader, rounded, direction, size, fallback, source}: ThemeAvatarProps
): IWidgetNode<HTMLElement, ICommonAttributes> {
    const radius = theme.roundedResolves(rounded || ObjectRounded.Full);
    const sizes = getObjectSize(size || ObjectSize.Medium);

    return Stack({
        style: {
            flexDirection: direction,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: radius,
            overflow: 'hidden',
            width: `${sizes}px`,
            height: `${sizes}px`,
            backgroundColor: Color.text_100_a1,
        },
        signal: {
            mount: async ({widget}) => {
                if (source) {
                    await fetch(source)
                        .then(response => response.blob())
                        .then(async (blob) => {
                            const src = await readBlobFile(blob)
                            if (src) widget
                                .clear()
                                .content(Image({src: src.toString()}))
                            else widget.clear().content(fallback)
                        })
                } else widget.clear().content(fallback)
            }
        },
        children: loader,
    })
}