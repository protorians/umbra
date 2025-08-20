import {ThemeAvatarOptions} from "./type.js";
import {Color, Image, IWidgetNode, ObjectRounded, ObjectSize, Stack} from "@protorians/widgets";
import {ITheme} from "../../types/index.js";
import {getObjectSize} from "../../utilities/index.js";
import { FileUtility } from "@protorians/core";

export function ThemeAvatar(
    theme: ITheme,
    {loader, rounded, direction, size, fallback, source, borderless}: ThemeAvatarOptions
): IWidgetNode<any, any> | undefined {
    const radius = theme.roundedResolves(rounded || ObjectRounded.Full);
    const sizes = getObjectSize(size || ObjectSize.Medium);

    return Stack({
        style: {
            flexDirection: direction,
        },
        children: [
            theme.AspectRatio({
                ratio: 1,
                style: {
                    flexDirection: direction,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: radius,
                    overflow: 'hidden',
                    width: `${sizes}px`,
                    height: `${sizes}px`,
                    backgroundColor: Color.tint,
                    border: borderless ? `0px solid transparent` : `${theme.settings.borderWidthMax||'1px'} solid ${Color.tint_weak}`,
                },
                signal: {
                    mount: async ({widget}) => {
                        if (source) {
                            await fetch(source)
                                .then(response => response.blob())
                                .then(async (blob) => {
                                    const src = await FileUtility.readBlob(blob)
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
        ]
    })
}