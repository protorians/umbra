import { Layer, Section } from "../overlay/index.js";
import { declarationExplodes } from "../helpers/index.js";
import { SizeCapabilities } from "../capabilities/index.js";
import { ObjectSize } from "../enums.js";
export function Container(declaration) {
    const props = declarationExplodes(declaration, ['size', 'children', 'contentAttributes', 'style']);
    const size = props.extended.size || 1;
    const content = Layer({
        ...(props.extended.contentAttributes || {}),
        children: props.extended.children,
        signal: {
            mount({ widget }) {
                widget.style({
                    width: '100%',
                    maxWidth: `${(typeof size == 'string')
                        ? (Object.values(ObjectSize).includes(size)
                            ? SizeCapabilities.capability('surface')?.on(widget).make(size) : size) : SizeCapabilities.capability('unit')?.on(widget).make(size)}`,
                });
            }
        }
    });
    return Section({
        style: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            ...props.extended.style
        },
        children: content,
    });
}
