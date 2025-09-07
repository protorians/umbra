import { Style } from "@protorians/widgets";
export class ScrollbarStyle {
    static Hide() {
        return {
            scrollbarWidth: 'none',
            '--ms-overflow-style': 'hidden',
            '&::-webkit-scrollbar': Style({
                display: 'none',
                background: 'transparent'
            })
        };
    }
}
