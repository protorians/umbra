import {IStyleSheetDeclarations, IWidgetNode} from "@protorians/widgets";
import {PositioningCoordinate, PositioningOptions} from "../types/index.js";
import {Callable, Environment} from "@protorians/core";


export class UiPositioning {

    static alwaysOnScreen(
        widget: IWidgetNode<any, any>,
        {gap, left, bottom, right, top, persist, origin}: PositioningOptions
    ) {
        const coordinate: PositioningCoordinate<string> = {};
        gap = gap || 0;

        if (left) coordinate.left = `${left}px`;
        if (right) coordinate.right = `${right}px`;
        if (top) coordinate.top = `${top}px`;
        if (bottom) coordinate.bottom = `${bottom}px`;

        if (Environment.Client) {
            widget
                .style(coordinate as IStyleSheetDeclarations)
                .signal.listen('hide', () => widget.style({left: '', top: '', right: '', bottom: '',}))

            function apply() {
                const measure = widget.measure;
                const originMeasure = origin?.measure;
                const vw = Math.max(originMeasure?.width || 0, window.innerWidth);
                const vh = Math.max(originMeasure?.height || 0, window.innerHeight);

                if (measure.right > vw) widget.style({
                    left: '',
                    right: `${gap}px`,
                })

                if (measure.bottom > vh) widget.style({
                    top: '',
                    bottom: `${gap}px`,
                })

                if (persist) window.addEventListener('resize', apply)
            }

            Callable.safe(apply)
        }
    }

}