import {addRule} from "./rules.directive.js";
import {IRuleDeclaration, IRuleValue} from "../types/index.js";
import {mediaQuery, nested} from "./compilate.js";
import {
    computeColor,
    computeGridSpan,
    computeGrids,
    computeValue,
    computeGrid,
    computeSizeExpression,
    isSizeExpression,
} from "./helpers.js";
import {NumberUtility} from "@protorians/core";
import {RuleType} from "../enums.js";

addRule

    /**
     * Display
     */
    ({
        alias: 'ratio',
        callable: ({value}) => ({
            aspectRatio: `${value || 'initial'}`,
        })
    })

    /**
     * Flex
     */
    ({
        alias: 'flex',
        callable: ({value, type}) => {
            value = String(value).trim()

            if (value === 'none') return {flex: 'none'}
            else if (value === 'auto') return {flex: '1 1 auto'}
            else if (value === 'initial') return {flex: '0 1 auto'}
            else if (NumberUtility.isNumber(value) && type === RuleType.Synthetic) return {flex: `${value}`}
            else if (NumberUtility.isNumber(value)) return {flex: `calc(${value} * 100%)`}
            else if (['row', 'col'].includes(value))
                return {
                    display: `flex`,
                    flexDirection: `${String(value).toLowerCase() === 'col' ? 'column' : 'row'}`,
                }
            else if (['wrap', 'no-wrap'].includes(value)) return {flexWrap: `${value}`}


            return {display: `flex`,}
        }
    })

    /**
     * Display
     */
    ({
        alias: 'display',
        callable: ({value}) => ({
            display: `${value || 'block'}`,
        })
    })

    /**
     * Justify
     */
    ({
        alias: 'justify',
        callable: ({value}) => ({
            justifyContent: `${value || 'flex-start'}`,
        })
    })

    /**
     * Align-items
     */
    ({
        alias: 'items',
        callable: ({value}) => ({
            alignItems: `${value || 'flex-start'}`,
        })
    })

    /**
     * Grids
     */
    ({
        alias: 'grid-rows',
        callable: (payload) => {
            return {gridTemplateRows: computeGrids(payload)}
        }
    })
    ({
        alias: 'grid-cols',
        callable: (payload) => {
            return {gridTemplateColumns: computeGrids(payload)}
        }
    })

    ({
        alias: 'row',
        callable: (payload) => {
            return {gridRow: computeGrid(payload),}
        }
    })
    ({
        alias: '-row',
        callable: ({value}) => {
            return {gridRow: `calc(${value} * -1)`,}
        }
    })
    ({
        alias: 'row-span',
        callable: (payload) => {
            return {gridRow: computeGridSpan(payload),}
        }
    })
    ({
        alias: 'row-start',
        callable: (payload) => {
            return {gridRowStart: computeGridSpan(payload),}
        }
    })
    ({
        alias: '-row-start',
        callable: ({value}) => {
            return {gridRowStart: `calc(${value} * -1)`,}
        }
    })
    ({
        alias: '-row-end',
        callable: ({value}) => {
            return {gridRowEnd: `calc(${value} * -1)`,}
        }
    })

    ({
        alias: 'col',
        callable: (payload) => {
            return {gridColumn: computeGrid(payload),}
        }
    })
    ({
        alias: '-col',
        callable: ({value}) => {
            return {gridColumn: `calc(${value} * -1)`,}
        }
    })
    ({
        alias: 'col-span',
        callable: (payload) => {
            return {gridColumn: computeGridSpan(payload),}
        }
    })
    ({
        alias: 'col-start',
        callable: (payload) => {
            return {gridColumnStart: computeGridSpan(payload),}
        }
    })
    ({
        alias: '-col-start',
        callable: ({value}) => {
            return {gridColumnStart: `calc(${value} * -1)`,}
        }
    })
    ({
        alias: '-col-end',
        callable: ({value}) => {
            return {gridColumnEnd: `calc(${value} * -1)`,}
        }
    })

    /**
     * Fore color
     */
    ({
        alias: 'text',
        callable: (payload) => {
            let size: IRuleValue;
            if (isSizeExpression(payload.value)) {
                size = computeSizeExpression(payload, 'font-size', 'spacing');
                if (size) return {fontSize: `${size}`}
            }
            if (NumberUtility.isNumber(String(payload.value)))
                return {fontSize: `${computeValue(payload)}`}
            return {color: size || computeColor(payload).value,}
        }
    })
    ({
        alias: 'fore',
        callable: (payload) => {
            const value = computeColor(payload).value;
            return {color: value, stroke: value,}
        }
    })

    /**
     * Back color
     */
    ({
        alias: 'bg',
        callable: (payload) =>
            ({backgroundColor: computeColor(payload).value,})
    })
    ({
        alias: 'back',
        callable: (payload) => {
            const value = computeColor(payload).value;
            return {backgroundColor: value, fill: value,}
        }
    })

    /**
     * Overflow
     */
    ({
        alias: 'overflow',
        callable: (payload) =>
            ({overflow: computeValue(payload),})
    })
    ({
        alias: 'overflow-x',
        callable: (payload) =>
            ({overflowX: computeValue(payload),})
    })
    ({
        alias: 'overflow-y',
        callable: (payload) =>
            ({overflowY: computeValue(payload),})
    })

    /**
     * Position
     */
    ({
        alias: 'position',
        callable: (payload) =>
            ({position: `${payload.value}`,})
    })
    ({
        alias: 'top',
        callable: (payload) =>
            ({top: computeValue(payload),})
    })
    ({
        alias: 'right',
        callable: (payload) =>
            ({right: computeValue(payload),})
    })
    ({
        alias: 'bottom',
        callable: (payload) =>
            ({bottom: computeValue(payload),})
    })
    ({
        alias: 'left',
        callable: (payload) =>
            ({left: computeValue(payload),})
    })
    ({
        alias: 'inset',
        callable: (payload) =>
            ({inset: computeValue(payload),})
    })
    ({
        alias: 'z',
        callable: (payload) =>
            ({zIndex: `${payload.value}`,})
    })

    /**
     * Gap
     */
    ({
        alias: 'gap',
        callable: (payload) =>
            ({gap: computeValue(payload),})
    })
    ({
        alias: 'gap-x',
        callable: (payload) => ({
            columnGap: computeValue(payload),
        })
    })
    ({
        alias: 'gap-y',
        callable: (payload) => ({
            rowGap: computeValue(payload),
        })
    })

    /**
     * Padding
     */
    ({
        alias: 'p',
        callable: (payload) =>
            ({padding: computeValue(payload),})
    })
    ({
        alias: 'px',
        callable: (payload) => ({
            paddingLeft: computeValue(payload),
            paddingRight: computeValue(payload),
        })
    })
    ({
        alias: 'py',
        callable: (payload) => ({
            paddingTop: computeValue(payload),
            paddingBottom: computeValue(payload),
        })
    })
    ({
        alias: 'pt',
        callable: (payload) =>
            ({paddingTop: computeValue(payload),})
    })
    ({
        alias: 'pr',
        callable: (payload) =>
            ({paddingRight: computeValue(payload),})
    })

    ({
        alias: 'pb',
        callable: (payload) =>
            ({paddingBottom: computeValue(payload),})
    })
    ({
        alias: 'pl',
        callable: (payload) =>
            ({paddingLeft: computeValue(payload),})
    })

    /**
     * Margin
     */
    ({
        alias: 'm',
        callable: (payload) =>
            ({margin: computeValue(payload),})
    })
    ({
        alias: 'mx',
        callable: (payload) => ({
            marginLeft: computeValue(payload),
            marginRight: computeValue(payload),
        })
    })

    ({
        alias: 'my',
        callable: (payload) => ({
            marginTop: computeValue(payload),
            marginBottom: computeValue(payload),
        })
    })
    ({
        alias: 'mt',
        callable: (payload) =>
            ({marginTop: computeValue(payload),})
    })
    ({
        alias: 'mr',
        callable: (payload) =>
            ({marginRight: computeValue(payload),})
    })
    ({
        alias: 'mb',
        callable: (payload) =>
            ({marginBottom: computeValue(payload),})
    })
    ({
        alias: 'ml',
        callable: (payload) =>
            ({marginLeft: computeValue(payload),})
    })

    /**
     * Rounded
     */
    ({
        alias: 'rounded',
        callable: (payload) => {
            return ({borderRadius: computeSizeExpression(payload, 'border-radius', 'spacing') || computeValue(payload),})
        }
    })
    ({
        alias: 'rounded-tl',
        callable: (payload) => ({
            borderTopLeftRadius: computeSizeExpression(payload, 'border-radius', 'spacing') || computeValue(payload),
        })
    })
    ({
        alias: 'rounded-tr',
        callable: (payload) => ({
            borderTopRightRadius: computeSizeExpression(payload, 'border-radius', 'spacing') || computeValue(payload),
        })
    })
    ({
        alias: 'rounded-br',
        callable: (payload) => ({
            borderBottomRightRadius: computeSizeExpression(payload, 'border-radius', 'spacing') || computeValue(payload),
        })
    })
    ({
        alias: 'rounded-bl',
        callable: (payload) => ({
            borderBottomLeftRadius: computeSizeExpression(payload, 'border-radius', 'spacing') || computeValue(payload),
        })
    })


    /**
     * Sizing
     */
    ({
        alias: 'w',
        callable: (payload) => {
            let size: IRuleValue;
            if (isSizeExpression(payload.value))
                size = computeSizeExpression(payload, 'size', 'spacing');
            return {width: size || computeValue(payload),}
        }
    })
    ({
        alias: 'h',
        callable: (payload) => {
            let size: IRuleValue;
            if (isSizeExpression(payload.value))
                size = computeSizeExpression(payload, 'size', 'spacing');
            return {height: size || computeValue(payload),}
        }
    })
    ({
        alias: 'size',
        callable: (payload) => {
            let size: IRuleValue;
            if (isSizeExpression(payload.value))
                size = computeSizeExpression(payload, 'size', 'spacing');
            const value = size || computeValue(payload);
            return {width: value, height: value,}
        }
    })

    /**
     * Appearance
     */
    ({
        alias: 'appearance',
        callable: ({value}) => ({appearance: value,})
    })

    /**
     * Cursor
     */
    ({
        alias: 'cursor',
        callable: ({value}) => {
            return {
                cursor: value,
            }
        }
    })

    /**
     * Prefers Color Scheme
     */
    ({
        alias: 'light',
        callable: ({compilator, selector, args, value}) =>
            mediaQuery(
                '(prefers-color-scheme: light)',
                nested(
                    selector,
                    compilator.compilate<IRuleDeclaration>(`${args.join(':')}:${value}`) || {}
                )
            )
    })
    ({
        alias: 'dark',
        callable: ({compilator, selector, args, value}) =>
            mediaQuery(
                '(prefers-color-scheme: dark)',
                nested(
                    selector,
                    compilator.compilate<IRuleDeclaration>(`${args.join(':')}:${value}`) || {}
                )
            )
    })

    /**
     * Responsive
     */
    ({
        alias: 'xs',
        order: 0,
        callable: ({compilator, selector, args, value}) =>
            mediaQuery(
                '(max-width: 480px)',
                nested(
                    selector,
                    compilator.compilate<IRuleDeclaration>(`${args.join(':')}:${value}`) || {}
                )
            )
    })
    ({
        alias: 'sm',
        callable: ({compilator, selector, args, value}) =>
            mediaQuery(
                '(max-width: 640px)',
                nested(
                    selector,
                    compilator.compilate<IRuleDeclaration>(`${args.join(':')}:${value}`) || {}
                )
            )
    })
    ({
        alias: 'md',
        callable: ({compilator, selector, args, value}) =>
            mediaQuery(
                '(max-width: 768px)',
                nested(
                    selector,
                    compilator.compilate<IRuleDeclaration>(`${args.join(':')}:${value}`) || {}
                )
            )
    })
    ({
        alias: 'lg',
        callable: ({compilator, selector, args, value}) =>
            mediaQuery(
                '(max-width: 1024px)',
                nested(
                    selector,
                    compilator.compilate<IRuleDeclaration>(`${args.join(':')}:${value}`) || {}
                )
            )
    })
    ({
        alias: 'xl',
        callable: ({compilator, selector, args, value}) =>
            mediaQuery(
                '(max-width: 1280px)',
                nested(
                    selector,
                    compilator.compilate<IRuleDeclaration>(`${args.join(':')}:${value}`) || {}
                )
            )
    })
    ({
        alias: '2xl',
        callable: ({compilator, selector, args, value}) =>
            mediaQuery(
                '(max-width: 1536px)',
                nested(
                    selector,
                    compilator.compilate<IRuleDeclaration>(`${args.join(':')}:${value}`) || {}
                )
            )
    })