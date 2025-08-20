import {IThemeBreadcrumbOptions} from "./type.js";
import {AligningDirection, Row, Style} from "@protorians/widgets";
import {ITheme} from "../../types/index.js";


export function ThemeBreadcrumb(
    theme: ITheme,
    {
        items,
        separator,
        ellipsis,
        display,
        styles,
    }: IThemeBreadcrumbOptions
) {

    display = display ? display - 1 : undefined;
    const limit = items.length - 1;
    let ellipsisUsed = false;

    return theme.ScrollArea({
        direction: AligningDirection.Row,
        hideScroll: true,
        style: styles?.widget,
        children: [
            Row({
                style: Style({
                    justifyContent: "flex-start",
                    alignItems: "center",
                }).merge(styles?.wrapper),
                children: items.map(({children, icon}, index) => {

                    if(display && index >= display && index < limit) {
                        const child =  !ellipsisUsed ? [
                            separator?.(index),
                            ellipsis?.(items.slice(display, limit))
                        ] : undefined;
                        ellipsisUsed = true;
                        return child;
                    }

                    return [
                        index > 0 ? separator?.(index) : undefined,
                        Row({
                            style: styles?.item,
                            children: [
                                icon,
                                children
                            ]
                        }),
                    ];
                }),
            })
        ]
    })

}