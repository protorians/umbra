import { Column, PopupType, PositionX, PositionY, Row, SmallText, } from "@protorians/widgets";
import { ModalKit } from "../../kits/index.js";
import { BoxStyle } from "../../styles/box.js";
import { LayerVariant } from "../../enums.js";
export function ThemeDialog(theme, declarations) {
    const variant = declarations.variant || LayerVariant.Normal;
    const coloring = theme.coloringResolves(variant);
    return ModalKit.callable((modal) => {
        return {
            locked: true,
            blurred: true,
            opened: declarations.opened,
            scoped: declarations.scoped,
            ariaTitle: declarations.ariaTitle,
            ariaDescription: declarations.ariaDescription,
            animateIn: declarations.animateIn,
            animateOut: declarations.animateOut,
            type: PopupType.Dialog,
            position: [PositionX.Center, PositionY.Center],
            trigger: declarations.trigger,
            children: Column({
                style: BoxStyle.Container(theme, coloring),
                children: [
                    Row({
                        style: BoxStyle.Content(),
                        children: [
                            declarations.icon ? Row({
                                style: BoxStyle.Icon(),
                                children: declarations.icon,
                            }) : undefined,
                            Column({
                                style: {
                                    gap: 0,
                                    flex: '1 1 auto',
                                },
                                children: [
                                    Row({
                                        style: {
                                            paddingTop: 1,
                                            paddingX: 1,
                                            opacity: '.5',
                                        },
                                        children: SmallText({
                                            children: declarations.title || 'Alert'
                                        }),
                                    }),
                                    Column({
                                        style: {
                                            paddingX: 1,
                                            paddingBottom: 1,
                                        },
                                        children: declarations.children
                                    }),
                                ]
                            }),
                        ]
                    }),
                    Row({
                        style: BoxStyle.Buttons(theme, coloring),
                        children: declarations.actions ? declarations.actions(modal) : [],
                    }),
                ]
            }),
        };
    });
}
