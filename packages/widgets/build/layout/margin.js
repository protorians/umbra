import { EdgeInsets } from "./edge-insets.js";
import { StyleWidget } from "../style.js";
export function Margin({ children, ratio, y, x, size }) {
    const { x: h, y: v } = EdgeInsets({ ratio, x, y, size });
    return children?.style({ margin: `${StyleWidget.unit(v || 1)} ${StyleWidget.unit(h || 1)} !important` });
}
Margin.xs = (children) => Margin({ ratio: 0.25, children });
Margin.sm = (children) => Margin({ ratio: 0.5, children });
Margin.md = (children) => Margin({ ratio: 1, children });
Margin.lg = (children) => Margin({ ratio: 2, children });
Margin.xl = (children) => Margin({ ratio: 4, children });
