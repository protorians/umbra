import {
    Color,
    declarationExplodes,
    ICommonAttributes,
    IWidgetDeclaration,
    Layer,
    Style
} from "@protorians/widgets";
import {ThemeSkeletonOptions} from "./type.js";
import {ITheme} from "../../types/index.js";

export function ThemeSkeleton(
    theme: ITheme,
    declarations: IWidgetDeclaration<HTMLElement, ThemeSkeletonOptions & ICommonAttributes>
) {

    const {
        declaration,
        extended
    } = declarationExplodes<IWidgetDeclaration<HTMLElement, ThemeSkeletonOptions & ICommonAttributes>, ThemeSkeletonOptions>(
        declarations, ['duration', 'delay']
    )

    declaration.style = Style({
        ...theme.stylesheet.texture.declarations
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
            animationName: 'widget-ui-pulse-opacity-animation',
            animationDelay: `${extended.delay || 0}ms`,
            animationDuration: `${extended.duration || 2525}ms`,
            animationTimingFunction: 'cubic-bezier(.4,0,.6,1)',
            animationIterationCount: 'infinite',
        })

    return Layer(declaration)
}