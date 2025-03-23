import {IGlyphProps} from "../types/index.js";
import {ItalicText} from "../overlay/index.js";

export function Glyph({name, pack, size, color}: IGlyphProps) {
    const className = pack ? `${pack}:${name}` : name;
    return ItalicText({
        style: {
            fontSize: (size || 4) * 8,
            color,
        },
        className,
    })
}
