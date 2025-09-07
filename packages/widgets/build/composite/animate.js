import { createAnimetric } from "@protorians/animetric";
export function Animate({ children, frame, from, to, duration, decimal, delay, ease, infinite }) {
    createAnimetric({
        duration: duration || 1000,
        decimal,
        delay,
        ease,
        infinite,
    })
        .from(...(from || to || []))
        .to(...(to || []))
        .callable((payload) => frame({ ...payload, children }))
        .play();
    return children;
}
export function AnimateGroup({ children, frame, from, to, duration, decimal, delay, ease, infinite }) {
    createAnimetric({
        duration: duration || 1000,
        decimal,
        delay,
        ease,
        infinite,
    })
        .from(...(from || to || []))
        .to(...(to || []))
        .callable((payload) => frame({ ...payload, children }))
        .play();
    return children;
}
