import {
    Button,
    Color,
    declarationExplodes,
    type IButtonAttributes,
    type IButtonAttributesBase,
    IWidgetDeclaration,
    Style,
} from "@protorians/widgets";
import {TextureStylesheet} from "../../stylesheet.js";
import {type KatonButtonProps} from "./type.js";
import {resolveColoringLayer, resolveColoringLayerOutlined} from "../../common/index.js";
import {LayerVariant} from "@widgetui/core";


export function KatonButton(
    declarations: IWidgetDeclaration<HTMLButtonElement, KatonButtonProps & IButtonAttributes & IButtonAttributesBase>
) {

    const {
        declaration,
        extended
    } = declarationExplodes<IWidgetDeclaration<HTMLButtonElement, KatonButtonProps & IButtonAttributes & IButtonAttributesBase>, KatonButtonProps>(
        declarations, ['variant', 'outline', 'before', 'after']
    )

    const variant = extended.variant || LayerVariant.Normal;
    const coloring = (extended.outline
        ? resolveColoringLayerOutlined
        : resolveColoringLayer)(variant);
    const isNude = (
        extended.variant == LayerVariant.Text ||
        extended.variant == LayerVariant.Link
    );

    declaration.style = Style({
        ...TextureStylesheet.declarations
    })
        .merge({
            display: 'flex',
            alignItems: 'center',
            borderRadius: 'var(--widget-radius, .7rem)',
            borderWidth: extended.outline ? 'var(--widget-border-width, 2px)' : '0',
            padding: '.4rem .8rem',
            borderColor: coloring.edge ? Color[`${coloring.edge}`] : 'transparent',
            justifyContent: 'space-between',
            boxShadow: isNude ? 'none' : `${TextureStylesheet.declarations.boxShadow}`,
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
                opacity: '.80',
            }),
        })
    ;

    declaration.children = [extended.before, declaration.children, extended.after,];

    return Button(declaration)
}

