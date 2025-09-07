import { Color, Layer } from "@protorians/widgets";
import { ObjectUtility } from "@protorians/core";
export function createLayerGradient({ color, position, animated, radius, opacity, duration, }) {
    position = position || [0, 0];
    return Layer({
        style: {
            opacity: `${opacity || .3}`,
            position: 'absolute',
            height: `${radius || 40}%`,
            aspectRatio: '1/1',
            backgroundColor: color,
            borderRadius: '100%',
            filter: 'blur(2rem)',
            left: `${position[0] || 0}%`,
            top: `${position[1] || 0}%`,
        },
        signal: {
            mount: ({ widget }) => {
                if (animated) {
                    widget.style({
                        animationName: ObjectUtility.randomWithin([
                            'widget-ui-position-nomadic-tl-animation',
                            'widget-ui-position-nomadic-tr-animation',
                        ]),
                        animationDuration: `${duration || 30}s`,
                        animationTimingFunction: 'ease-out',
                        animationIterationCount: 'infinite',
                    });
                }
            }
        },
        children: []
    });
}
export function createMultipleLayerGradient(layers) {
    return (layers && layers.length
        ? layers.map(blurred => createLayerGradient(blurred))
        : [
            createLayerGradient({
                color: Color.one,
                position: [0, 30],
                animated: true,
            }),
            createLayerGradient({
                color: Color.two,
                position: [50, 20],
                animated: true,
            }),
        ]);
}
