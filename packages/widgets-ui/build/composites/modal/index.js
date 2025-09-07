import { declarationExplodes } from "@protorians/widgets";
import { ModalKit } from "../../kits/index.js";
export function ThemeModal(declarations) {
    const { extended } = declarationExplodes(declarations, [
        'scoped',
        'trigger',
        'children',
        'locked',
        'blurred',
        'animateIn',
        'animateOut',
        'ariaTitle',
        'ariaDescription',
        'position',
        'type'
    ]);
    return ModalKit.callable(() => ({ ...extended }));
}
