import { Color, declarationExplodes, Layer, Style } from "@protorians/widgets";
export function ThemeSkeleton(theme, declarations) {
    const { declaration, extended } = declarationExplodes(declarations, ['duration', 'delay']);
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
    });
    return Layer(declaration);
}
