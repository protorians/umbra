import {IAnimateGroupProps, IAnimateProps, IAttributes, IWidgetNode} from "../types/index.js";
import {createAnimetric} from "@protorians/animetric";


export function Animate<E extends HTMLElement, A extends IAttributes>(
    {
        children,
        frame,
        from,
        to,
        duration,
        decimal,
        delay,
        ease,
        infinite
    }: IAnimateProps<E, A>
): IWidgetNode<E, A> {
    createAnimetric({
        duration: duration || 1000,
        decimal,
        delay,
        ease,
        infinite,
    })
        .from(...(from || to || []))
        .to(...(to || []))
        .callable((payload) => frame({...payload, children}))
        .play();
    return children;
}


export function AnimateGroup(
    {
        children,
        frame,
        from,
        to,
        duration,
        decimal,
        delay,
        ease,
        infinite
    }: IAnimateGroupProps
): IWidgetNode<any, any>[] {
    createAnimetric({
        duration: duration || 1000,
        decimal,
        delay,
        ease,
        infinite,
    })
        .from(...(from || to || []))
        .to(...(to || []))
        .callable((payload) => frame({...payload, children}))
        .play();
    return children;
}