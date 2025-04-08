import {IWidgetNode} from "@protorians/widgets";


export function hiddenWidget(widget?: IWidgetNode<any, any>) {
    widget?.style({
        height: '0',
        opacity: '0',
        overflow: 'hidden',
    })
    return hiddenWidget;
}

export function showWidget(widget?: IWidgetNode<any, any>) {
    if (widget) widget.style({
        height: `${(widget.element as HTMLElement).scrollHeight}px`,
        overflow: 'hidden',
        opacity: '1',
    })
    return showWidget;
}