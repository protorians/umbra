import { EdgeInsets } from "./edge-insets.js";
import { StyleWidget } from "../style.js";
export function Padding({ children, ratio, y, x, size }) {
    const { x: h, y: v } = EdgeInsets({ ratio, x, y, size });
    return children?.style({ padding: `${StyleWidget.unit(v || 1)} ${StyleWidget.unit(h || 1)} !important` });
}
Padding.xs = (children) => Padding({ ratio: 0.25, children });
Padding.sm = (children) => Padding({ ratio: 0.5, children });
Padding.md = (children) => Padding({ ratio: 1, children });
Padding.lg = (children) => Padding({ ratio: 2, children });
Padding.xl = (children) => Padding({ ratio: 4, children });
