import {
    Button,
    Color,
    declarationExplodes,
    type IButtonAttributes,
    type IButtonAttributesBase,
    IWidgetDeclaration,
    ObjectSize,
    Style,
} from "@protorians/widgets";
import {type ThemeButtonOptions} from "./type.js";
import {ITheme} from "../../types/index.js";
import {LayerVariant} from "../../enums.js";
import {getObjectSize} from "../../utilities/index.js";


export function ThemeButton(
    theme: ITheme,
    declarations: IWidgetDeclaration<HTMLButtonElement, IButtonAttributes & IButtonAttributesBase & ThemeButtonOptions>
) {

    const {
        declaration,
        extended
    } = declarationExplodes<IWidgetDeclaration<HTMLButtonElement, IButtonAttributes & IButtonAttributesBase & ThemeButtonOptions>, ThemeButtonOptions>(
        declarations, ['variant', 'outline', 'before', 'after', 'size']
    )

    const variant = extended.variant || LayerVariant.Normal;
    const coloring = theme[extended.outline ? 'outlineColoringResolves' : 'coloringResolves'](variant);
    const isNude = (
        extended.variant == LayerVariant.Text ||
        extended.variant == LayerVariant.Link
    );

    const computingSize = (size: ObjectSize) => {
        const pad = getObjectSize(size, .01);
        const fz = getObjectSize(size, .02)
        return {
            padding: pad ? (pad + (size === ObjectSize.ExtraSmall ? .16 : .01)) : null,
            fontSize: fz ? (fz + (size === ObjectSize.ExtraSmall ? .35 : .16)) : null,
        }
    }

    const compute = computingSize(ObjectSize.Medium)

    let padding: number|null = compute.padding;
    let fontSize: number|null = compute.fontSize;

    if (extended.size) {
        const compute = computingSize(extended.size||ObjectSize.Medium);
        padding = compute.padding;
        fontSize = compute.fontSize;
    }

    declaration.type = typeof declaration.type === 'undefined' ? 'button' : declaration.type;

    declaration.style = Style({...theme.stylesheet.texture.declarations})
        .merge({
            display: 'flex',
            alignItems: 'center',
            borderRadius: theme.settings.radiusMin || '0',
            borderWidth: extended.outline ? 'var(--widget-border-width, 2px)' : (theme.settings.borderWidth || 0),
            justifyContent: 'space-between',
            transitionProperty: 'all',
            transitionDuration: theme.settings.transitionDuration || '200ms',
            transitionTiming: theme.settings.transitionTiming || 'linear',
            boxShadow: isNude ? 'none' : `${theme.stylesheet.texture.declarations.boxShadow}`,
            padding: padding ? `${padding}rem ${padding * 1.7}rem` : '100%',
            fontSize: fontSize ? `${fontSize}rem` : `small`,
            cursor: 'pointer',

            '& *': Style({
                fontSize: fontSize ? `${fontSize}rem` : `small`,
            }),
            '& > span': Style({
                whiteSpace: 'nowrap',
            })
        })
        .merge(declaration.style)
        .merge({
            borderColor: coloring.edge ? Color[`${coloring.edge}`] : 'transparent',
            color: Color[`${coloring.fore || 'text'}`],
            backgroundColor: coloring.back ? Color[`${coloring.back}`] : 'transparent',
            '&:hover': Style({
                borderColor: coloring.edge ? Color[`${coloring.edge}-weak`] : 'transparent',
                color: Color[`${coloring.fore || 'text'}-weak`],
                backgroundColor: coloring.back ? Color[`${coloring.back}-weak`] : 'transparent',
            }),
        })
    ;

    declaration.tabindex = declaration.tabindex || 0;
    declaration.children = [extended.before, declaration.children, extended.after,];
    return Button(declaration as IWidgetDeclaration<HTMLButtonElement, IButtonAttributes & IButtonAttributesBase>)
}

