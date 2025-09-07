import { declarationExplodes, Stack, Style } from "@protorians/widgets";
export function ThemeAspectRatio(declarations) {
    const { declaration, extended } = declarationExplodes(declarations, ['ratio', 'fit', 'children']);
    declaration.style = Style({
        aspectRatio: `${extended.ratio || '1/1'}`,
        objectFit: extended.fit || 'cover',
    }).merge(declarations.style);
    return Stack({
        ...declaration,
        children: extended.children
    });
}
