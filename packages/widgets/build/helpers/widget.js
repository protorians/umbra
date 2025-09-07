import { resolveAlignment, resolveAlignmentProperty, resolveDirection } from "./constant.js";
export function widgetAligningDirectionFeature(widget) {
    const styling = {};
    if (widget.props.features?.direction) {
        styling.flexDirection = `${resolveDirection(widget.props.features.direction) || 'column'}`;
    }
    return styling;
}
export function widgetAligningFeature(widget, properties) {
    const styling = {};
    properties.forEach(property => {
        const prop = resolveAlignmentProperty(property);
        if (widget.props.features?.align && prop) {
            styling[prop] = `${resolveAlignment(widget.props.features.align) || 'flex-start'}`;
        }
    });
    return styling;
}
