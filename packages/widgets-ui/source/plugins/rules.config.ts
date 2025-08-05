import {addRule} from "./rules.directive.js";
import {IRuleDeclaration} from "../types/index.js";
import {mediaQuery, nested} from "./compilator.js";
import {computeColor, computeGridSpan, computeGrids, computeValue, computeGrid} from "./helpers.js";
import {NumberUtility} from "@protorians/core";
import {RuleType} from "../enums.js";

addRule
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
            else if (['row', 'column'].includes(value))
                return {
                    display: `flex`,
                    flexDirection: `${value}`
                }
            else if (['wrap', 'no-wrap'].includes(value)) return {flexWrap: `${value}`}


            return {display: `flex`,}
        }
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
            justifyContent: `${value || 'flex-start'}`,
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
        callable: (payload) =>
            ({color: computeColor(payload).value,})
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
     * Position
     */
    ({
        alias: 'position',
        callable: (payload) =>
            ({position: computeValue(payload),})
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
        callable: (payload) => {
            return ({margin: computeValue(payload),})
        }
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
     * Sizing
     */
    ({
        alias: 'w',
        callable: (payload) =>
            ({width: computeValue(payload),})
    })
    ({
        alias: 'h',
        callable: (payload) =>
            ({height: computeValue(payload),})
    })
    ({
        alias: 'size',
        callable: (payload) => {
            const value = computeValue(payload);
            return {
                width: value,
                height: value,
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