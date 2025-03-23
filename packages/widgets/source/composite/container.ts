import type {ICommonAttributes, ContainerProps, IWidgetDeclaration} from "../types/index.js";
import {Layer, Section} from "../overlay/index.js";
import {declarationExplodes} from "../helpers/index.js";
import {SizeCapabilities} from "../capabilities/index.js";
import {Sizer} from "../enums.js";


export function Container(declaration: IWidgetDeclaration<HTMLElement, ContainerProps & ICommonAttributes>) {

    const props = declarationExplodes<IWidgetDeclaration<HTMLElement, ICommonAttributes & ContainerProps>, ContainerProps>(
        declaration,
        ['size', 'children', 'contentAttributes', 'style']
    )
    const size = props.extended.size || 1;
    const content = Layer({
        ...(props.extended.contentAttributes || {}),
        children: props.extended.children,
        signal: {
            mount({widget}) {
                widget.style({
                    width: '100%',
                    maxWidth: `${(typeof size == 'string')
                        ? (Object.values(Sizer).includes(size as Sizer)
                                ? SizeCapabilities.capability('surface')?.on(widget).make(size) : size
                        ) : SizeCapabilities.capability('unit')?.on(widget).make(size)}`,
                })
            }
        }
    })

    return Section({
        // ...props.current,
        style: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            ...props.extended.style
        },
        children: content,
    })

}