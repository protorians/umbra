import {
    Button,
    Color,
    declarationExplodes,
    type IButtonAttributes,
    type IButtonAttributesBase,
    IWidgetDeclaration,
    Style,
} from "@protorians/widgets";
import {type ThemeButtonProps} from "./type.js";
import {ITheme} from "../../types/index.js";
import {LayerVariant} from "../../enums.js";


export function ThemeButton(
    theme: ITheme,
    declarations: IWidgetDeclaration<HTMLButtonElement, ThemeButtonProps & IButtonAttributes & IButtonAttributesBase>
) {

    const {
        declaration,
        extended
    } = declarationExplodes<IWidgetDeclaration<HTMLButtonElement, ThemeButtonProps & IButtonAttributes & IButtonAttributesBase>, ThemeButtonProps>(
        declarations, ['variant', 'outline', 'before', 'after']
    )

    const variant = extended.variant || LayerVariant.Normal;
    const coloring = theme[extended.outline ? 'outlineColoringResolves' : 'coloringResolves'](variant);
    const isNude = (
        extended.variant == LayerVariant.Text ||
        extended.variant == LayerVariant.Link
    );

    declaration.style = Style({
        ...theme.stylesheets.declarations
        
    })
        .merge({
            display: 'flex',
            alignItems: 'center',
            borderRadius: theme.settings.radiusMin || '0',
            borderWidth: extended.outline ? 'var(--widget-border-width, 2px)' : '0',
            padding: '.6rem 1rem',
            borderColor: coloring.edge ? Color[`${coloring.edge}`] : 'transparent',
            justifyContent: 'space-between',
            // transitionProperty: 'all',
            // transitionDuration: theme.settings.transitionDuration || '200ms',
            // transitionTiming: theme.settings.transitionTiming || 'linear',
            boxShadow: isNude ? 'none' : `${theme.stylesheets.declarations.boxShadow}`,
            '& > span': Style({
                whiteSpace: 'nowrap',
            })
        })
        .merge(declaration.style)
        .merge({
            color: Color[`${coloring.fore || 'text'}`],
            backgroundColor: coloring.back ? Color[`${coloring.back}`] : 'transparent',
            backdropFilter: 'blur(var(--widget-blurred))',
            '&:hover': Style({
                opacity: '.8',
            }),
        })
    ;

    declaration.children = [extended.before, declaration.children, extended.after,];
    return Button(declaration)
}

