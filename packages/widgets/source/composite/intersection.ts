import {
    type IAttributes,
    type ICommonAttributes,
    type IWidgetDeclaration,
    type IntersectionProps
} from "../types/index.js";
import {declarationExplodes} from "../helpers/index.js";
import {IntersectionDetector} from "../enums.js";


export function Intersection<E extends HTMLElement, A extends IAttributes>(
    declaration: IWidgetDeclaration<HTMLElement, IntersectionProps<E, A> & ICommonAttributes>
) {

    const props = declarationExplodes<IWidgetDeclaration<HTMLElement, ICommonAttributes & IntersectionProps<E, A>>, IntersectionProps<E, A>>(
        declaration,
        ['children', 'release', 'unrelease', "threshold"]
    )
    let intersector: IntersectionObserver | undefined;

    return declaration.children
        .mount(payload => {
            const threshold = props.extended.threshold || 1;
            const detector = props.extended.detector || IntersectionDetector.Ratio;

            intersector = new IntersectionObserver(([entry]) => {
                const condition = detector === IntersectionDetector.Ratio
                    ? entry.intersectionRatio < threshold : entry.isIntersecting
                ;
                if (condition && props.extended.release) {
                    props.extended.release({...payload, payload: undefined})
                } else if (props.extended.unrelease) {
                    props.extended.unrelease({...payload, payload: undefined})
                }
            }, {
                root: props.extended.root ? props.extended.root.element : undefined,
                rootMargin: props.extended.rootMargin || undefined,
                threshold: [threshold],
            })

            intersector.observe(payload.widget.element as HTMLElement)
        })
        .unmount(() => {
            intersector?.disconnect()
        })

}