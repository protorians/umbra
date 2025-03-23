import {
    Color,
    declarationExplodes,
    ICommonAttributes,
    IWidgetDeclaration,
    Layer,
    Style
} from "@protorians/widgets";
import {KatonSkeletonProps} from "./type.js";
import {TextureStylesheet} from "../../stylesheet.js";

export function KatonSkeleton(
    declarations: IWidgetDeclaration<HTMLElement, KatonSkeletonProps & ICommonAttributes>
) {

    const {
        declaration,
        extended
    } = declarationExplodes<IWidgetDeclaration<HTMLElement, KatonSkeletonProps & ICommonAttributes>, KatonSkeletonProps>(
        declarations, ['duration', 'delay']
    )

    declaration.style = Style({
        ...TextureStylesheet.declarations
    })
        .merge(declaration.style)
        .merge({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: '.33',
            boxShadow: 'none',
            color: Color.text_100_a1,
            backgroundColor: Color.text_a1,
            animationName: 'widget-ui-pulse-opacity',
            animationDelay: `${extended.delay || 0}ms`,
            animationDuration: `${extended.duration || 2525}ms`,
            animationTimingFunction: 'cubic-bezier(.4,0,.6,1)',
            animationIterationCount: 'infinite',
        })

    return Layer(declaration)
}